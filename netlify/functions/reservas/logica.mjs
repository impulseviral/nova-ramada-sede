// Regras das reservas do mapa do ginásio (Tradicional Baile do Chopp 2026).
// Tudo aqui é lógica pura (sem rede nem armazenamento) para poder ser testado.

// Abertura das vendas. ATENÇÃO: a mesma data está em js/events.js
// (LANCAMENTO_LOTES.dataIso); se mudar, mude nos dois lugares.
export const LANCAMENTO = Date.parse("2026-11-10T07:30:00-03:00");
export const DURACAO_MS = 60 * 60 * 1000; // a reserva segura as posições por 1 hora
export const MAX_POSICOES = 6; // posições por reserva
// Soma das reservas vivas de uma mesma conexão. Folgado de propósito: num
// interior, muita gente usa a mesma operadora e sai pelo mesmo IP (CGNAT).
export const MAX_POSICOES_POR_IP = 20;
const ALFABETO = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // sem 0/O, 1/I/L

export const POSICOES = (() => {
  const chaves = [];
  for (let n = 1; n <= 18; n++) chaves.push(`chopeira-${n}`);
  for (let n = 1; n <= 20; n++) chaves.push(`mesa-${n}`);
  return chaves;
})();
const VALIDAS = new Set(POSICOES);

export function posicaoValida(chave) {
  return typeof chave === "string" && VALIDAS.has(chave);
}

// Lista de posições pedida pelo site: só chaves válidas, sem repetição, em ordem.
export function normalizarPosicoes(lista) {
  if (!Array.isArray(lista) || lista.length > 50) return null;
  const unicas = [];
  for (const chave of lista) {
    if (!posicaoValida(chave)) return null;
    if (unicas.indexOf(chave) === -1) unicas.push(chave);
  }
  return unicas.sort((a, b) => POSICOES.indexOf(a) - POSICOES.indexOf(b));
}

export function gerarCodigo(aleatorio = Math.random) {
  let codigo = "";
  for (let i = 0; i < 4; i++) codigo += ALFABETO.charAt(Math.floor(aleatorio() * ALFABETO.length));
  return codigo;
}

export function lerCsv(texto) {
  const linhas = [];
  let linha = [];
  let campo = "";
  let aspas = false;
  for (let i = 0; i < texto.length; i++) {
    const c = texto.charAt(i);
    if (aspas) {
      if (c === '"' && texto.charAt(i + 1) === '"') {
        campo += '"';
        i++;
      } else if (c === '"') {
        aspas = false;
      } else {
        campo += c;
      }
    } else if (c === '"') {
      aspas = true;
    } else if (c === ",") {
      linha.push(campo);
      campo = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && texto.charAt(i + 1) === "\n") i++;
      linha.push(campo);
      linhas.push(linha);
      linha = [];
      campo = "";
    } else {
      campo += c;
    }
  }
  if (campo !== "" || linha.length) {
    linha.push(campo);
    linhas.push(linha);
  }
  return linhas;
}

// Planilha da organização (1ª aba): Situação = Livre / RESERVADA / VENDIDA e a
// linha "Reservas pelo site" = LIGADAS / DESLIGADAS. Devolve null se o conteúdo
// não for a planilha (página de login, erro ou formato quebrado).
export function interpretarPlanilha(texto) {
  const limpo = String(texto || "").replace(/^﻿/, "");
  if (/<html|<!doctype/i.test(limpo.slice(0, 600))) return null;
  const vendidas = [];
  const reservadas = [];
  let reservasLigadas = true;
  let comSituacao = 0;
  for (const colunas of lerCsv(limpo)) {
    const rotulo = (colunas[0] || "").trim();
    const valor = (colunas[1] || "").trim().toLowerCase();
    if (/^reservas pelo site$/i.test(rotulo)) {
      reservasLigadas = !/^deslig/.test(valor);
      continue;
    }
    const posicao = /^(chopeira|mesa)\s*(\d{1,2})$/i.exec(rotulo);
    if (!posicao) continue;
    const chave = `${posicao[1].toLowerCase()}-${Number(posicao[2])}`;
    if (!posicaoValida(chave)) continue;
    if (valor) comSituacao++;
    if (/^vend/.test(valor)) {
      if (vendidas.indexOf(chave) === -1) vendidas.push(chave);
    } else if (/^reserv/.test(valor)) {
      if (reservadas.indexOf(chave) === -1) reservadas.push(chave);
    }
  }
  return comSituacao ? { vendidas, reservadas, reservasLigadas } : null;
}

function vigentes(doc, agora) {
  return (doc && Array.isArray(doc.reservas) ? doc.reservas : []).filter((r) => r && r.ate > agora);
}

// O que o site mostra para todo mundo (sem código nem dados do aparelho).
export function estadoPublico({ doc, agora, planilha, aberto }) {
  const reservas = [];
  for (const r of vigentes(doc, agora)) {
    for (const posicao of r.posicoes) reservas.push({ posicao, ate: new Date(r.ate).toISOString() });
  }
  return {
    agora: new Date(agora).toISOString(),
    abertura: new Date(LANCAMENTO).toISOString(),
    vendasAbertas: aberto,
    planilhaOk: Boolean(planilha),
    reservasLigadas: planilha ? planilha.reservasLigadas : true,
    vendidas: planilha ? planilha.vendidas : [],
    reservadasPlanilha: planilha ? planilha.reservadas : [],
    reservas,
  };
}

// Pedido de reserva de um aparelho. Cada aparelho tem no máximo uma reserva
// viva; um novo pedido troca as posições dela e mantém o código e o horário.
export function decidirReserva({ doc, agora, posicoes, disp, ip, planilha, duracao = DURACAO_MS, codigo = gerarCodigo }) {
  if (!posicoes || posicoes.length === 0) return { tipo: "invalido" };
  if (posicoes.length > MAX_POSICOES) return { tipo: "muitas", maximo: MAX_POSICOES };

  const vivas = vigentes(doc, agora);
  const minha = vivas.find((r) => r.disp === disp) || null;
  const outras = vivas.filter((r) => r !== minha);

  const ocupadas = [];
  for (const posicao of posicoes) {
    if (planilha && planilha.vendidas.indexOf(posicao) !== -1) {
      ocupadas.push({ posicao, situacao: "vendida" });
      continue;
    }
    if (planilha && planilha.reservadas.indexOf(posicao) !== -1) {
      ocupadas.push({ posicao, situacao: "reservada" });
      continue;
    }
    const dona = outras.find((r) => r.posicoes.indexOf(posicao) !== -1);
    if (dona) ocupadas.push({ posicao, situacao: "reservada", ate: new Date(dona.ate).toISOString() });
  }
  if (ocupadas.length) return { tipo: "ocupadas", ocupadas };

  const daConexao = outras.filter((r) => r.ip === ip).reduce((soma, r) => soma + r.posicoes.length, 0);
  if (daConexao + posicoes.length > MAX_POSICOES_POR_IP) return { tipo: "limite", maximo: MAX_POSICOES_POR_IP };

  let reserva;
  if (minha) {
    reserva = Object.assign({}, minha, { posicoes: posicoes.slice() });
  } else {
    const usados = vivas.map((r) => r.codigo);
    let novo = codigo();
    for (let i = 0; i < 20 && usados.indexOf(novo) !== -1; i++) novo = codigo();
    reserva = { codigo: novo, posicoes: posicoes.slice(), criada: agora, ate: agora + duracao, disp, ip };
  }
  return { tipo: "ok", doc: { reservas: outras.concat([reserva]) }, reserva };
}

export function decidirCancelamento({ doc, agora, disp }) {
  const vivas = vigentes(doc, agora);
  const restantes = vivas.filter((r) => r.disp !== disp);
  return { havia: restantes.length !== vivas.length, doc: { reservas: restantes } };
}

export function reservaPublica(reserva) {
  return { codigo: reserva.codigo, posicoes: reserva.posicoes, ate: new Date(reserva.ate).toISOString() };
}
