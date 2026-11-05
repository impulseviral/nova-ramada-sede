// Reservas de chopeiras e mesas do Baile do Chopp (função do Netlify).
// GET  /api/reservas  -> situação de todas as posições (vendidas, reservadas)
// POST /api/reservas  -> { acao: "reservar", posicoes: [...], dispositivo } ou
//                        { acao: "cancelar", dispositivo }
// As reservas ficam no Netlify Blobs; as vendidas vêm da planilha da organização.
import { getStore } from "@netlify/blobs";
import {
  DURACAO_MS,
  LANCAMENTO,
  decidirCancelamento,
  decidirReserva,
  estadoPublico,
  interpretarPlanilha,
  normalizarPosicoes,
  reservaPublica,
} from "./logica.mjs";

export const config = { path: "/api/reservas" };

const PLANILHA = "1vVGZm6JphK1Rw7S7OWOKkM9AJ9gxXFhMwGCIyHpaqXE";
const CHAVE_ESTADO = "estado";
const SAL = "nova-ramada-baile-do-chopp-2026";
let planilhaEmCache = { em: 0, dados: null };

function responder(corpo, status = 200, extras = {}) {
  return new Response(JSON.stringify(corpo), {
    status,
    headers: Object.assign({ "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }, extras),
  });
}

async function resumo(texto) {
  const bytes = new TextEncoder().encode(SAL + texto);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("").slice(0, 32);
}

async function lerPlanilhaPadrao() {
  const agora = Date.now();
  if (planilhaEmCache.dados && agora - planilhaEmCache.em < 15000) return planilhaEmCache.dados;
  try {
    const url = `https://docs.google.com/spreadsheets/d/${PLANILHA}/gviz/tq?tqx=out:csv&headers=1&_=${agora}`;
    const resposta = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!resposta.ok) throw new Error(`planilha ${resposta.status}`);
    const dados = interpretarPlanilha(await resposta.text());
    if (!dados) throw new Error("planilha fora do formato ou fechada");
    planilhaEmCache = { em: agora, dados };
    return dados;
  } catch (erro) {
    // Sem planilha (fechada, fora do ar): usa a última leitura boa, se houver.
    return planilhaEmCache.dados;
  }
}

async function lerEstado(loja) {
  const atual = await loja.getWithMetadata(CHAVE_ESTADO, { type: "json" });
  if (!atual) return { doc: { reservas: [] }, etag: null };
  const doc = atual.data && Array.isArray(atual.data.reservas) ? atual.data : { reservas: [] };
  return { doc, etag: atual.etag };
}

async function gravarSeNinguemMudou(loja, doc, etag) {
  const resultado = etag
    ? await loja.setJSON(CHAVE_ESTADO, doc, { onlyIfMatch: etag })
    : await loja.setJSON(CHAVE_ESTADO, doc, { onlyIfNew: true });
  return Boolean(resultado && resultado.modified);
}

// Espera um pouco mais a cada tentativa (com sorteio) quando muita gente grava junto.
const esperar = (tentativa) =>
  new Promise((ok) => setTimeout(ok, Math.min(400, 25 * 2 ** Math.min(tentativa, 4)) * (0.5 + Math.random())));

// Monta o tratador com as dependências injetáveis (os testes usam versões falsas).
export function criarTratador({ obterLoja, lerPlanilha = lerPlanilhaPadrao, relogio = Date.now, tentativas = 25 }) {
  return async function tratar(req, context = {}) {
    const url = new URL(req.url);
    const host = url.hostname;
    // Prévias do Netlify (deploy-preview-12--site...) e testes locais: vendas sempre
    // abertas e reservas guardadas à parte, para não misturar com as de verdade.
    const teste = host.indexOf("--") !== -1 || host === "localhost" || host === "127.0.0.1";
    const loja = obterLoja(teste ? "reservas-teste" : "reservas-producao");

    try {
      if (req.method === "GET") {
        const [{ doc }, planilha] = await Promise.all([lerEstado(loja), lerPlanilha()]);
        const agora = relogio();
        return responder(estadoPublico({ doc, agora, planilha, aberto: teste || agora >= LANCAMENTO }), 200, {
          "cache-control": "public, max-age=0, must-revalidate",
          "netlify-cdn-cache-control": "public, s-maxage=5",
        });
      }

      if (req.method !== "POST") return responder({ ok: false, motivo: "metodo" }, 405);

      const texto = await req.text();
      if (texto.length > 4000) return responder({ ok: false, motivo: "invalido" }, 400);
      let corpo;
      try {
        corpo = JSON.parse(texto);
      } catch (erro) {
        return responder({ ok: false, motivo: "invalido" }, 400);
      }
      if (!corpo || typeof corpo !== "object") return responder({ ok: false, motivo: "invalido" }, 400);
      if (typeof corpo.dispositivo !== "string" || !/^[a-f0-9]{32}$/.test(corpo.dispositivo)) {
        return responder({ ok: false, motivo: "invalido" }, 400);
      }
      const disp = await resumo(`d:${corpo.dispositivo}`);
      const ip = await resumo(`i:${context.ip || req.headers.get("x-nf-client-connection-ip") || "sem-ip"}`);

      if (corpo.acao === "cancelar") {
        for (let i = 0; i < tentativas; i++) {
          const { doc, etag } = await lerEstado(loja);
          const agora = relogio();
          const decisao = decidirCancelamento({ doc, agora, disp });
          if (!decisao.havia) return responder({ ok: true, agora: new Date(agora).toISOString() });
          if (await gravarSeNinguemMudou(loja, decisao.doc, etag)) {
            return responder({ ok: true, agora: new Date(agora).toISOString() });
          }
          await esperar(i);
        }
        return responder({ ok: false, motivo: "ocupado" }, 503);
      }

      if (corpo.acao !== "reservar") return responder({ ok: false, motivo: "invalido" }, 400);

      const inicio = relogio();
      if (!teste && inicio < LANCAMENTO) {
        return responder({ ok: false, motivo: "fechado", abertura: new Date(LANCAMENTO).toISOString() }, 403);
      }
      const posicoes = normalizarPosicoes(corpo.posicoes);
      if (!posicoes || posicoes.length === 0) return responder({ ok: false, motivo: "invalido" }, 400);

      const planilha = await lerPlanilha();
      if (planilha && !planilha.reservasLigadas) return responder({ ok: false, motivo: "pausadas" }, 403);

      // Nas prévias dá para testar com reserva curta (ttlSegundos).
      let duracao = DURACAO_MS;
      if (teste && Number.isFinite(corpo.ttlSegundos)) duracao = Math.min(3600, Math.max(20, corpo.ttlSegundos)) * 1000;

      for (let i = 0; i < tentativas; i++) {
        const { doc, etag } = await lerEstado(loja);
        const agora = relogio();
        const decisao = decidirReserva({ doc, agora, posicoes, disp, ip, planilha, duracao });
        const quando = new Date(agora).toISOString();
        if (decisao.tipo === "ocupadas") return responder({ ok: false, motivo: "ocupadas", ocupadas: decisao.ocupadas, agora: quando }, 409);
        if (decisao.tipo === "muitas") return responder({ ok: false, motivo: "muitas", maximo: decisao.maximo, agora: quando }, 400);
        if (decisao.tipo === "limite") return responder({ ok: false, motivo: "limite", maximo: decisao.maximo, agora: quando }, 429);
        if (decisao.tipo !== "ok") return responder({ ok: false, motivo: "invalido", agora: quando }, 400);
        if (await gravarSeNinguemMudou(loja, decisao.doc, etag)) {
          return responder({ ok: true, reserva: reservaPublica(decisao.reserva), agora: quando });
        }
        // Outra pessoa gravou no mesmo instante: lê de novo e decide outra vez.
        await esperar(i);
      }
      return responder({ ok: false, motivo: "ocupado" }, 503);
    } catch (erro) {
      console.error(erro);
      return responder({ ok: false, motivo: "erro" }, 500);
    }
  };
}

export default criarTratador({
  obterLoja: (nome) => getStore({ name: nome, consistency: "strong" }),
});
