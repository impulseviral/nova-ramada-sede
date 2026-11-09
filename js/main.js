function waLink(mensagem, numero = WHATSAPP_NUMBER) {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
}

function formatarDataCurta(iso) {
  const [ano, mes, dia] = iso.split("-");
  const meses = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  return { dia, mes: meses[parseInt(mes, 10) - 1] };
}

function criarCardDestaque(evento) {
  const { dia, mes } = formatarDataCurta(evento.data);

  const atracoesHtml = evento.atracoes.length
    ? `<div class="bloco">
        <h4>Atrações</h4>
        <p class="atracoes">${evento.atracoes.join(", ")}</p>
      </div>`
    : "";

  const cardapioHtml = evento.cardapio.length
    ? `<div class="bloco">
        <h4>Cardápio</h4>
        <ul class="cardapio-lista">
          ${evento.cardapio.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </div>`
    : "";

  const valoresHtml = evento.valores.length
    ? `<div class="bloco">
        <h4>Valores</h4>
        <div class="valores">
          ${evento.valores
            .map((v) => `<div class="valor-item"><span>${v.label}</span><strong>${v.preco}</strong></div>`)
            .join("")}
        </div>
      </div>`
    : "";

  const observacaoHtml = evento.observacao
    ? `<p class="observacao">🎟️ ${evento.observacao}</p>`
    : "";

  const patrocinadoresHtml = criarBlocoPatrocinadores(evento.patrocinadores);

  return `
    <article class="card-destaque" id="reservar-evento">
      <div class="data-selo">
        <span class="data-dia">${dia}</span>
        <span class="data-mes">${mes}</span>
      </div>
      <div class="card-conteudo">
        <span class="etiqueta">Próximo evento</span>
        <h3>${evento.titulo}</h3>
        ${evento.subtitulo ? `<p class="subtitulo">${evento.subtitulo}</p>` : ""}
        <p class="intro">${evento.intro}</p>
        <div class="blocos-grid">
          ${atracoesHtml}
          ${cardapioHtml}
          ${valoresHtml}
        </div>
        ${observacaoHtml}
        <div class="card-acoes">
          <a class="botao botao-whatsapp" href="${waLink(evento.mensagemWhatsapp)}" target="_blank" rel="noopener">
            ${iconeWhatsapp()} Reservar pelo Whatsapp
          </a>
          <a class="botao botao-secundario" href="#localizacao">${iconePin()} Como chegar</a>
        </div>
        ${patrocinadoresHtml}
      </div>
    </article>
  `;
}

function criarBlocoPatrocinadores(patrocinadores) {
  if (!patrocinadores || !patrocinadores.length) return "";

  const itens = patrocinadores
    .map((p) => {
      const conteudo = p.logo
        ? `<img src="${p.logo}" alt="${p.nome}" title="${p.nome}" loading="lazy" decoding="async" />`
        : `<span>${p.nome}</span>`;
      return p.link
        ? `<a class="patrocinador-item" href="${p.link}" target="_blank" rel="noopener">${conteudo}</a>`
        : `<div class="patrocinador-item">${conteudo}</div>`;
    })
    .join("");

  return `
    <div class="bloco-patrocinadores">
      <h4>Apoio deste evento</h4>
      <div class="patrocinadores-lista">${itens}</div>
    </div>
  `;
}

function criarCardAgenda(evento) {
  const { dia, mes } = formatarDataCurta(evento.data);
  const linkContatoHtml = evento.ocultarContato
    ? ""
    : `<a class="link-whatsapp" href="${waLink(evento.mensagemWhatsapp)}" target="_blank" rel="noopener">
        Falar com a Andréia →
      </a>`;

  return `
    <article class="card-agenda ${evento.emBreve ? "em-breve" : ""}">
      <div class="data-selo pequeno">
        <span class="data-dia">${dia}</span>
        <span class="data-mes">${mes}</span>
      </div>
      <div class="card-agenda-conteudo">
        <h4>${evento.titulo}</h4>
        <p>${evento.intro}</p>
        ${linkContatoHtml}
        ${criarBlocoPatrocinadores(evento.patrocinadores)}
      </div>
    </article>
  `;
}

function iconesChopp(chave) {
  const icones = {
    chopp: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 8h9v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8Z"/><path d="M15 10h2.5a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H15"/><path d="M6 8c0-2 1-4 1-4M9 8c0-2.2 1.3-3.5 1.3-3.5M12 8c0-2 .8-3 .8-3" stroke-linecap="round"/></svg>`,
    petiscos: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M8 10c1-1.5 2-1.5 2 0s1 1.5 2 0 2-1.5 2 0 2 1.5 2 0" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 15h8" stroke-linecap="round"/></svg>`,
    copo: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 4h8l-1 15a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2L7 4Z"/><path d="M15.5 7H18a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-3" /><path d="M7.5 8h7" /></svg>`,
    barril: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 3h10c1.2 2.6 1.8 5.6 1.8 9s-.6 6.4-1.8 9H7c-1.2-2.6-1.8-5.6-1.8-9S5.8 5.6 7 3Z" stroke-linejoin="round"/><path d="M5.5 8h13M5.5 16h13" /></svg>`,
  };
  return icones[chave] || "";
}

function criarBlocoTimeline(programacao) {
  if (!programacao || !programacao.length) return "";
  const itens = programacao
    .map(
      (item) => `
      <div class="chopp-timeline-item">
        <div class="chopp-timeline-hora">${item.horario}</div>
        <div class="chopp-timeline-texto">
          <h5>${item.titulo}</h5>
          <p>${item.descricao}</p>
        </div>
      </div>`
    )
    .join("");

  return `
    <div class="chopp-bloco-titulo">
      <span class="chopp-etiqueta">Programação da noite</span>
      <h4>Do credenciamento à madrugada</h4>
    </div>
    <div class="chopp-timeline">${itens}</div>
  `;
}

function criarGradeDestaques(destaques) {
  if (!destaques || !destaques.length) return "";
  const cards = destaques
    .map((d) => {
      const imagemHtml = d.imagem
        ? `<img class="chopp-destaque-imagem" src="${d.imagem}" alt="${d.imagemAlt || d.titulo}" loading="lazy"${d.posicaoImagem ? ` style="object-position: ${d.posicaoImagem};"` : ""} />`
        : "";
      return `
      <div class="chopp-destaque-card">
        ${imagemHtml}
        <div class="chopp-destaque-corpo">
          <div class="chopp-destaque-icone">${iconesChopp(d.icone)}</div>
          <h5>${d.titulo}</h5>
          <p>${d.descricao}</p>
        </div>
      </div>`;
    })
    .join("");

  return `
    <div class="chopp-bloco-titulo">
      <span class="chopp-etiqueta">O que vai ter</span>
      <h4>Tudo pra noite ser inesquecível</h4>
    </div>
    <div class="chopp-destaques-grid">${cards}</div>
  `;
}

function criarBlocoChopps(chopps) {
  if (!chopps) return "";

  // width/height reservam o espaço do cartaz antes de ele carregar; sem isso a
  // página "pula" e os links do menu param no lugar errado.
  const cartazHtml = chopps.cartaz
    ? `<figure class="chopp-chopps-cartaz"><img src="${chopps.cartaz}" alt="${chopps.cartazAlt}" width="900" height="1125" loading="lazy" /></figure>`
    : "";
  const tamanhosHtml = chopps.tamanhosBarril && chopps.tamanhosBarril.length
    ? `<ul class="chopp-barril-tamanhos">${chopps.tamanhosBarril.map((t) => `<li>${t}</li>`).join("")}</ul>`
    : "";
  const torneiras = chopps.opcoes
    .map(
      (o) => `
        <li class="chopp-torneira" style="--cor-chopp: ${o.cor};">
          <span class="chopp-copo-cor" aria-hidden="true"></span>
          <span class="chopp-torneira-texto"><strong>${o.marca}</strong><span>${o.estilo}</span></span>
        </li>`
    )
    .join("");

  return `
    <div class="chopp-bloco-titulo">
      <span class="chopp-etiqueta">Chopp definido</span>
      <h4>Os chopps do Baile</h4>
    </div>
    <div class="chopp-chopps${chopps.cartaz ? "" : " sem-cartaz"}">
      ${cartazHtml}
      <div class="chopp-chopps-conteudo">
        <p class="chopp-chopps-intro">${chopps.intro}</p>
        <ul class="chopp-torneiras">${torneiras}</ul>
        <div class="chopp-barril">
          <div class="chopp-barril-icone">${iconesChopp("barril")}</div>
          <div>
            <h5>Barril exclusivo para o seu grupo</h5>
            ${tamanhosHtml}
            <p>${chopps.barril}</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ---------- Layout do ginásio ----------
// Mapa redesenhado a partir do layout enviado pela organização (1024 x 1536),
// nas mesmas posições. O visitante marca as chopeiras e mesas que quer; depois
// da abertura das vendas ele reserva as posições por 1 hora (função
// /api/reservas no Netlify) e envia a reserva pelo WhatsApp da Andréia ou da
// Raquel. As vendidas vêm da planilha da organização.
const LAYOUT_ARMAZENAMENTO = "baile-chopp-2026-layout"; // posições marcadas
const LAYOUT_RESERVA = "baile-chopp-2026-reserva"; // reserva viva deste aparelho
const LAYOUT_DISPOSITIVO = "baile-chopp-2026-dispositivo"; // identificador aleatório do aparelho
const LAYOUT_API = "/api/reservas";
const LAYOUT_MAX_POSICOES = 6; // igual ao limite do servidor
// Quando o site não consegue reservar, a escolha segue pelo WhatsApp do mesmo jeito.
const LAYOUT_SEM_RESERVA = "Sua escolha vai pelo WhatsApp mesmo assim, e a Andréia ou a Raquel confere se as posições estão livres.";
const layoutEstado = {
  escolhas: [], // ex.: ["chopeira-5", "mesa-12"]
  vendidasBase: [], // escritas no events.js
  vendidas: [], // events.js + planilha
  reservadas: {}, // posição -> horário-limite (ISO) ou "" (reservada pela organização); sem as minhas
  minhaReserva: null, // { codigo, posicoes, ate, desde, contato (índice de quem recebeu) }
  perdidas: [],
  planilha: "",
  dispositivo: "",
  apiOk: null, // null: ainda não sabe; false: serviço de reservas fora do ar
  falhasApi: 0,
  reservasLigadas: true,
  desvio: 0, // relógio do servidor menos o relógio do aparelho
  buscando: false,
  ultimaBusca: 0,
  timerBusca: null,
  reservando: false,
  enviandoPara: null, // índice do contato cujo botão está reservando
  erroReserva: "",
  vendasAbertas: false,
  salvaNoAparelho: false,
  timerToque: null,
  timerContagem: null,
  assinaturaMapa: "",
  zoomAberto: false,
  planilhaOk: true, // a função consegue ler a planilha da organização
  reservaBloqueada: false, // limite por conexão atingido: oferece o WhatsApp
  mapaVisivel: false,
  ultimaInteracao: Date.now(),
};
// Depois do baile o site para de consultar o servidor.
const LAYOUT_FIM = Date.parse("2026-12-13T06:00:00-03:00");

function layoutItens() {
  const itens = [];
  for (let n = 1; n <= 18; n++) {
    const esquerda = n <= 13; // 1 a 13 na parede da esquerda, 14 a 18 na da direita
    itens.push({ tipo: "chopeira", num: n, x: esquerda ? 43 : 781, y: 322 + 71 * (esquerda ? n - 1 : n - 14) });
  }
  for (let n = 1; n <= 20; n++) {
    // 4 fileiras de 5; a fileira das mesas 1 a 5 é a mais perto do palco
    itens.push({ tipo: "mesa", num: n, x: 321 + 102 * ((n - 1) % 5), y: 774 + 124 * Math.floor((n - 1) / 5) });
  }
  return itens;
}

function layoutChaveValida(chave) {
  return layoutItens().some((i) => `${i.tipo}-${i.num}` === chave);
}

function layoutNome(chave) {
  const partes = chave.split("-");
  return (partes[0] === "mesa" ? "Mesa " : "Chopeira ") + partes[1];
}

function layoutPosicao(chave) {
  const partes = chave.split("-");
  const num = Number(partes[1]);
  if (partes[0] === "chopeira") {
    return num <= 13 ? "Parede da esquerda, entre os banheiros" : "Parede da direita, entre o palco e o bar";
  }
  const fileira = Math.ceil(num / 5);
  const coluna = ((num - 1) % 5) + 1;
  const textoFileira = [
    "1ª fileira, a mais perto do palco",
    "2ª fileira a partir do palco",
    "3ª fileira a partir do palco",
    "4ª fileira, a mais perto das entradas",
  ][fileira - 1];
  const textoColuna = [
    "na ponta esquerda",
    "a 2ª da esquerda",
    "no meio",
    "a 2ª da direita",
    fileira <= 3 ? "na ponta direita, ao lado do bar" : "na ponta direita, ao lado do caixa",
  ][coluna - 1];
  return `${textoFileira} · ${textoColuna}`;
}

function layoutOrdenar(chaves) {
  return chaves.slice().sort((a, b) => {
    const pa = a.split("-");
    const pb = b.split("-");
    if (pa[0] !== pb[0]) return pa[0] === "chopeira" ? -1 : 1;
    return Number(pa[1]) - Number(pb[1]);
  });
}

function juntarComE(lista) {
  if (lista.length <= 1) return lista.join("");
  return `${lista.slice(0, -1).join(", ")} e ${lista[lista.length - 1]}`;
}

function layoutMesmaLista(a, b) {
  return a.slice().sort().join(",") === b.slice().sort().join(",");
}

// ----- Relógio e horários (sempre no horário de Brasília) -----
function agoraServidor() {
  return Date.now() + layoutEstado.desvio;
}

// idade: segundos que a resposta passou guardada no CDN (cabeçalho Age).
function layoutAjustarRelogio(iso, idade) {
  const servidor = Date.parse(iso);
  if (!isNaN(servidor)) layoutEstado.desvio = servidor + (idade || 0) * 1000 - Date.now();
}

function partesHorario(ms) {
  try {
    const partes = new Intl.DateTimeFormat("pt-BR", {
      timeZone: "America/Sao_Paulo",
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).formatToParts(new Date(ms));
    const valor = (tipo) => (partes.find((p) => p.type === tipo) || {}).value || "";
    return { dia: valor("day"), mes: valor("month"), hora: String(Number(valor("hour")) % 24), minuto: valor("minute") };
  } catch (erro) {
    const d = new Date(ms);
    return { dia: String(d.getDate()).padStart(2, "0"), mes: String(d.getMonth() + 1).padStart(2, "0"), hora: String(d.getHours()), minuto: String(d.getMinutes()).padStart(2, "0") };
  }
}

function horaCurta(ms) {
  const p = partesHorario(ms);
  return `${p.hora}h${p.minuto}`;
}

function dataCurta(ms) {
  const p = partesHorario(ms);
  return `${p.dia}/${p.mes}`;
}

function textoFaltam(ms) {
  const minutos = Math.max(0, Math.ceil((ms - agoraServidor()) / 60000));
  if (minutos <= 1) return "falta menos de 1 minuto";
  return `faltam ${minutos} minutos`;
}

// ----- Mensagens de WhatsApp -----
// Uma posição por linha, com o lugar dela no ginásio.
// Ex.: "• Mesa 3: 1ª fileira, a mais perto do palco, no meio".
function layoutLinhasMensagem(chaves) {
  return layoutOrdenar(chaves)
    .map((chave) => {
      const lugar = layoutPosicao(chave).replace(" · ", ", ");
      return `• ${layoutNome(chave)}: ${lugar.charAt(0).toLowerCase()}${lugar.slice(1)}`;
    })
    .join("\n");
}

// Leva a reserva (posições, código e horário-limite) ou, sem reserva, as posições marcadas.
function mensagemCompra(contato) {
  let texto = `Olá ${contato.nome}! ${LANCAMENTO_LOTES.mensagemCompra}`;
  const reserva = layoutEstado.minhaReserva;
  if (reserva) {
    const ate = Date.parse(reserva.ate);
    texto += `\n\nReservei pelo site:\n${layoutLinhasMensagem(reserva.posicoes)}\n\nCódigo da reserva: ${reserva.codigo}\nVálida até ${horaCurta(ate)} de ${dataCurta(ate)}.`;
    // Marcadas depois da reserva e que o site não conseguiu reservar.
    const extras = layoutEstado.escolhas.filter((c) => reserva.posicoes.indexOf(c) === -1);
    if (extras.length) texto += `\n\nTambém escolhi no layout (sem reserva):\n${layoutLinhasMensagem(extras)}`;
  } else if (layoutEstado.escolhas.length) {
    texto += `\n\nNo layout do ginásio, escolhi:\n${layoutLinhasMensagem(layoutEstado.escolhas)}`;
  }
  return texto;
}

function atualizarLinksCompra() {
  document.querySelectorAll("a[data-contato]").forEach((a) => {
    const contato = CONTATOS_OFICIAIS[Number(a.getAttribute("data-contato"))];
    if (contato) a.href = waLink(mensagemCompra(contato), contato.whatsapp);
  });
}

// Abre a conversa depois que a reserva volta do servidor. No computador, tenta
// outra aba, como os links; no celular (ou se o navegador bloquear a aba), abre
// na mesma página, e o celular passa para o app do WhatsApp.
function abrirWhatsapp(link) {
  const computador = Boolean(window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  if (computador) {
    const janela = window.open(link, "_blank");
    if (janela) {
      try {
        janela.opener = null;
      } catch (erro) {
        // sem acesso à outra aba: tudo bem
      }
      return;
    }
  }
  window.location.href = link;
}

// ----- Desenho do mapa -----
// Vendida em vermelho e reservada em amarelo (as mesmas cores da planilha da organização).
const LAYOUT_OCUPADA = {
  vendida: { rotulo: "VENDIDA", corpo: "#ebe6de", borda: "#9b958b", cadeira: "#e2ddd5", numero: "#6f6a62", faixa: "#c62828", letraFaixa: "#fff", letraChopeira: 22, letraMesa: 17 },
  reservada: { rotulo: "RESERVADA", corpo: "#fff7dc", borda: "#7a5a00", cadeira: "#fbe7a6", numero: "#6b4e00", faixa: "#f6c344", letraFaixa: "#3d2a00", letraChopeira: 18, letraMesa: 13 },
};

function layoutAtributos(nome, situacao) {
  // tabindex="-1": fica fora do Tab, mas o celular trata como alvo de toque (sem isso,
  // o Chrome do Android desvia o toque numa vendida para a posição livre ao lado).
  if (situacao === "vendida") return `role="img" tabindex="-1" aria-label="${nome}, vendida"`;
  if (situacao === "reservada") return `role="img" tabindex="-1" aria-label="${nome}, reservada"`;
  return `role="button" tabindex="0" aria-pressed="false" aria-label="${nome}"`;
}

function svgChopeira(item, situacao) {
  const { num, x, y } = item;
  const ocupada = LAYOUT_OCUPADA[situacao];
  if (ocupada) {
    // Ocupada: número à esquerda e a inscrição VENDIDA ou RESERVADA.
    return `
    <g class="lg-item lg-chopeira lg-${situacao}" data-chave="chopeira-${num}" ${layoutAtributos(`Chopeira ${num}`, situacao)}>
      <rect class="lg-alvo" x="${x - 6}" y="${y - 6}" width="212" height="71" rx="12"/>
      <rect x="${x}" y="${y}" width="200" height="59" rx="8" fill="${ocupada.corpo}" stroke="${ocupada.borda}" stroke-width="2.4"/>
      <g class="lg-ocupada-palavra">
        <text class="lg-num-ocupada" x="${x + 34}" y="${y + 41}" font-size="32" text-anchor="middle" fill="${ocupada.numero}">${num}</text>
        <rect x="${x + 66}" y="${y + 12}" width="126" height="35" rx="8" fill="${ocupada.faixa}"/>
        <text x="${x + 129}" y="${y + 37 - (22 - ocupada.letraChopeira) / 2}" font-size="${ocupada.letraChopeira}" text-anchor="middle" fill="${ocupada.letraFaixa}" letter-spacing="1">${ocupada.rotulo}</text>
      </g>
      <g class="lg-ocupada-cor">
        <rect x="${x}" y="${y}" width="200" height="59" rx="8" fill="${ocupada.faixa}" stroke="${ocupada.borda}" stroke-width="3"/>
        ${situacao === "reservada" ? `<rect x="${x}" y="${y}" width="200" height="59" rx="8" fill="url(#lg-listras)"/>` : ""}
        <text x="${x + 100}" y="${y + 48}" font-size="52" text-anchor="middle" fill="${ocupada.letraFaixa}">${num}</text>
      </g>
    </g>`;
  }
  return `
    <g class="lg-item lg-chopeira" data-chave="chopeira-${num}" ${layoutAtributos(`Chopeira ${num}`, "livre")}>
      <rect class="lg-alvo" x="${x - 6}" y="${y - 6}" width="212" height="71" rx="12"/>
      <rect class="lg-forma" x="${x}" y="${y}" width="200" height="59" rx="8" fill="url(#lg-barraca)" stroke="#1a1b29" stroke-width="2.4"/>
      <g class="lg-icone">
        <rect x="${x + 12}" y="${y + 18}" width="41" height="32" rx="2" fill="#b67a3e" stroke="#182032" stroke-width="1.5"/>
        <path d="M${x + 10} ${y + 20}l5-13h36l6 13z" fill="#fbfbf9" stroke="#152037" stroke-width="1.5"/>
        <path d="M${x + 17} ${y + 8}l-3 12h9l2-12zM${x + 33} ${y + 8}l1 12h9l-3-12zM${x + 47} ${y + 8}l7 12h-9l-4-12z" fill="#e44649"/>
        <rect x="${x + 27}" y="${y + 29}" width="12" height="15" rx="2" fill="#ffcc31" stroke="#2e2816" stroke-width="1.3"/>
        <path d="M${x + 39} ${y + 32}q8-1 6 5q-1 5-6 3" stroke="#36291a" stroke-width="1.7" fill="none"/>
        <ellipse cx="${x + 33}" cy="${y + 28}" rx="8" ry="4" fill="#fff"/>
      </g>
      <text class="lg-texto lg-texto-longo" x="${x + 65}" y="${y + 38}" font-size="20" fill="#111322">Chopeira ${num}</text>
      <text class="lg-texto lg-texto-curto" x="${x + 131}" y="${y + 48}" font-size="52" text-anchor="middle" fill="#111322">${num}</text>
    </g>`;
}

function svgMesa(item, situacao) {
  const { num, x: cx, y: cy } = item;
  const cadeiras = `
        <rect x="${cx - 11}" y="${cy - 43}" width="22" height="15" rx="4"/>
        <rect x="${cx - 11}" y="${cy + 28}" width="22" height="15" rx="4"/>
        <rect x="${cx - 43}" y="${cy - 11}" width="16" height="22" rx="4"/>
        <rect x="${cx + 27}" y="${cy - 11}" width="16" height="22" rx="4"/>`;
  const ocupada = LAYOUT_OCUPADA[situacao];
  if (ocupada) {
    // Ocupada: mesa apagada, número em cima e a faixa VENDIDA ou RESERVADA.
    return `
    <g class="lg-item lg-mesa lg-${situacao}" data-chave="mesa-${num}" ${layoutAtributos(`Mesa ${num}`, situacao)}>
      <rect class="lg-alvo" x="${cx - 50}" y="${cy - 58}" width="100" height="116" rx="14"/>
      <g fill="${ocupada.cadeira}" stroke="${ocupada.borda}" stroke-width="2.5">${cadeiras}</g>
      <circle cx="${cx}" cy="${cy}" r="32" fill="${ocupada.corpo}" stroke="${ocupada.borda}" stroke-width="2.5"/>
      <g class="lg-ocupada-palavra">
        <text class="lg-num-ocupada" x="${cx}" y="${cy - 6}" font-size="26" text-anchor="middle" fill="${ocupada.numero}">${num}</text>
        <rect x="${cx - 47}" y="${cy + 4}" width="94" height="26" rx="6" fill="${ocupada.faixa}"/>
        <text x="${cx}" y="${cy + 23 - (17 - ocupada.letraMesa) / 2}" font-size="${ocupada.letraMesa}" text-anchor="middle" fill="${ocupada.letraFaixa}" letter-spacing=".5">${ocupada.rotulo}</text>
      </g>
      <g class="lg-ocupada-cor">
        <circle cx="${cx}" cy="${cy}" r="32" fill="${ocupada.faixa}" stroke="${ocupada.borda}" stroke-width="3"/>
        ${situacao === "reservada" ? `<circle cx="${cx}" cy="${cy}" r="32" fill="url(#lg-listras)"/>` : ""}
        <text x="${cx}" y="${cy + 15}" font-size="42" text-anchor="middle" fill="${ocupada.letraFaixa}">${num}</text>
      </g>
    </g>`;
  }
  return `
    <g class="lg-item lg-mesa" data-chave="mesa-${num}" ${layoutAtributos(`Mesa ${num}`, "livre")}>
      <rect class="lg-alvo" x="${cx - 50}" y="${cy - 58}" width="100" height="116" rx="14"/>
      <g class="lg-cadeiras" fill="#f7dca7" stroke="#171d2c" stroke-width="2.5">${cadeiras}</g>
      <circle class="lg-forma" cx="${cx}" cy="${cy}" r="32" fill="#ffe3ad" stroke="#171d2c" stroke-width="2.5"/>
      <text class="lg-texto lg-texto-longo" x="${cx}" y="${cy - 1}" font-size="15" text-anchor="middle" fill="#171924">Mesa</text>
      <text class="lg-texto lg-texto-longo" x="${cx}" y="${cy + 20}" font-size="21" text-anchor="middle" fill="#171924">${num}</text>
      <text class="lg-texto lg-texto-curto" x="${cx}" y="${cy + 15}" font-size="42" text-anchor="middle" fill="#171924">${num}</text>
    </g>`;
}

// Partes fixas do desenho: paredes, palco, saídas, banheiros, bar, caixa e entradas.
function svgGinasioFixo() {
  const paredes = "M30 160H276M369 160H670M763 160H994V1432H726M625 1432H390M288 1432H30V160";
  const saida = (x) => `
      <path d="M${x + 17} 160V215M${x + 110} 160V215" stroke="#10152a" stroke-width="3" fill="none"/>
      <path d="M${x + 17} 215A46.5 46.5 0 0 1 ${x + 63.5} 168A46.5 46.5 0 0 1 ${x + 110} 215" stroke="#10152a" stroke-width="3" fill="none"/>
      <rect x="${x}" y="226" width="129" height="54" rx="10" fill="#bbf2b7" stroke="#1b4c36" stroke-width="2.5"/>
      <text class="lg-texto-longo" x="${x + 64.5}" y="245" text-anchor="middle" fill="#163921" font-size="15">SAÍDA DE</text>
      <text class="lg-texto-longo" x="${x + 64.5}" y="263" text-anchor="middle" fill="#163921" font-size="15">EMERGÊNCIA</text>
      <text class="lg-texto-curto" x="${x + 64.5}" y="262" text-anchor="middle" fill="#163921" font-size="26">SAÍDA</text>`;
  const banheiro = (y) => `
      <rect x="46" y="${y}" width="194" height="104" rx="10" fill="#e8cefb" stroke="#14182c" stroke-width="3" filter="url(#lg-sombra)"/>
      <g fill="#191c2a">
        <circle cx="117" cy="${y + 23}" r="6"/><rect x="112" y="${y + 30}" width="10" height="21" rx="4"/>
        <path d="M114 ${y + 50}v9m7-9v9" stroke="#191c2a" stroke-width="4" stroke-linecap="round"/>
        <circle cx="158" cy="${y + 23}" r="6"/><path d="M158 ${y + 30}l-11 25h22z"/>
        <path d="M153 ${y + 50}v9m10-9v9" stroke="#191c2a" stroke-width="4" stroke-linecap="round"/>
      </g>
      <text class="lg-rotulo-banheiro" x="143" y="${y + 88}" text-anchor="middle" font-size="24" fill="#11152b">BANHEIRO</text>`;
  const entrada = (x) => `
      <path d="M${x} 1432V1380M${x + 102} 1432V1380" fill="none" stroke="#10152a" stroke-width="3"/>
      <path d="M${x} 1380A51 51 0 0 1 ${x + 51} 1431A51 51 0 0 1 ${x + 102} 1380" fill="none" stroke="#10152a" stroke-width="3"/>
      <rect x="${x - 14}" y="1443" width="130" height="49" rx="12" fill="#a9ecae" stroke="#20542d" stroke-width="2.4"/>
      <text class="lg-rotulo-entrada" x="${x + 51}" y="1476" text-anchor="middle" font-size="23" fill="#121f18">ENTRADA</text>`;

  return `
    <g aria-hidden="true">
      <rect x="12" y="140" width="1000" height="1366" fill="url(#lg-papel)"/>
      <path d="${paredes}" fill="none" stroke="#10152a" stroke-width="13" stroke-linejoin="round"/>
      <path d="${paredes}" fill="none" stroke="#46415d" stroke-width="6" stroke-linejoin="round"/>
      <path d="M401 161H650V282L635 298H415L401 282Z" fill="url(#lg-palco)" stroke="#1b1831" stroke-width="4" filter="url(#lg-sombra)"/>
      <g fill="#fff" opacity=".42"><path d="M439 163L415 241H461Z"/><path d="M527 163L505 241H550Z"/><path d="M614 163L592 241H638Z"/></g>
      <text class="lg-rotulo-palco" x="525" y="251" text-anchor="middle" font-size="39" fill="#0a1022">PALCO</text>
      <g fill="#4d5365" stroke="#141824" stroke-width="3"><rect x="418" y="240" width="31" height="51" rx="5"/><rect x="603" y="240" width="31" height="51" rx="5"/></g>
      <g fill="#c6cad7" stroke="#1b2434" stroke-width="2"><circle cx="433.5" cy="252" r="5"/><circle cx="433.5" cy="273" r="8"/><circle cx="618.5" cy="252" r="5"/><circle cx="618.5" cy="273" r="8"/></g>
      <path d="M480 298H570V343H480Z" fill="#e7eaf1" stroke="#1a2332" stroke-width="3"/>
      <path d="M480 312H570M480 327H570" stroke="#1a2332" stroke-width="3"/>
      ${saida(259)}
      ${saida(655)}
      ${banheiro(174)}
      ${banheiro(1258)}
      <rect x="852" y="720" width="130" height="381" rx="15" fill="#d99a50" stroke="#171728" stroke-width="3"/>
      <rect x="869" y="738" width="111" height="345" rx="12" fill="#951d42" stroke="#f7cc76" stroke-width="4"/>
      <g fill="#d9a35e" stroke="#171728" stroke-width="2"><circle cx="838" cy="794" r="15"/><circle cx="838" cy="865" r="15"/><circle cx="838" cy="936" r="15"/><circle cx="838" cy="1007" r="15"/></g>
      <path d="M822 780V1027" stroke="#382618" stroke-width="3"/>
      <path d="M909 869h22v36h-22z" stroke="#281d16" stroke-width="2" fill="#e8a82b"/>
      <path d="M931 878h11v17h-11" stroke="#edc36e" stroke-width="4" fill="none"/>
      <path d="M908 869q-8-8 0-12q6-14 14-4q11-6 15 9q0 10-11 8" fill="#fff" stroke="#f3ece4" stroke-width="1.5"/>
      <text x="927" y="953" text-anchor="middle" fill="#fff" font-size="37">BAR</text>
      <rect x="826" y="1120" width="155" height="176" rx="11" fill="#fff6df" stroke="#131826" stroke-width="3"/>
      <g fill="#8d2140"><rect x="891" y="1161" width="42" height="20" rx="3"/><path d="M889 1189h46l11 39h-68z"/><rect x="891" y="1232" width="43" height="7" rx="2"/></g>
      <g fill="#fff5e1"><rect x="900" y="1199" width="8" height="6"/><rect x="913" y="1199" width="8" height="6"/><rect x="926" y="1199" width="8" height="6"/></g>
      <text class="lg-rotulo-caixa" x="903" y="1270" text-anchor="middle" fill="#10131d" font-size="29">CAIXA</text>
      ${entrada(288)}
      ${entrada(625)}
    </g>`;
}

// situacoes: { "chopeira-1": "livre" | "vendida" | "reservada", ... }
function criarSvgGinasio(situacoes) {
  const itens = layoutItens();
  const desenhar = (i) => {
    const situacao = situacoes[`${i.tipo}-${i.num}`] || "livre";
    return i.tipo === "chopeira" ? svgChopeira(i, situacao) : svgMesa(i, situacao);
  };
  return `
    <svg viewBox="12 140 1000 1366" width="1000" height="1366" role="group" aria-label="Layout do ginásio: palco no fundo, chopeiras nas paredes e mesas no centro" font-family="Mulish, Arial, sans-serif" font-weight="800">
      <defs>
        <linearGradient id="lg-papel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffefe"/><stop offset="1" stop-color="#f6f5fa"/></linearGradient>
        <linearGradient id="lg-palco" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4d3fc"/><stop offset="1" stop-color="#b778d8"/></linearGradient>
        <linearGradient id="lg-barraca" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff8e7"/><stop offset="1" stop-color="#fff1d1"/></linearGradient>
        <filter id="lg-sombra"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#172036" flood-opacity=".14"/></filter>
        <pattern id="lg-listras" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="14" fill="#3d2a00" fill-opacity=".22"/></pattern>
      </defs>
      ${svgGinasioFixo()}
      ${itens.filter((i) => i.tipo === "chopeira").map(desenhar).join("")}
      ${itens.filter((i) => i.tipo === "mesa").map(desenhar).join("")}
    </svg>`;
}

// Aceita [13, 14], 13, "13" ou "13, 14" (a lista é editada à mão no events.js).
function listaDeNumeros(valor) {
  const itens = Array.isArray(valor) ? valor : String(valor == null ? "" : valor).split(",");
  return itens.map((n) => Number(String(n).trim())).filter((n) => Number.isInteger(n) && n > 0);
}

function criarBlocoLayout(layout) {
  if (!layout) return "";
  const vendidas = listaDeNumeros(layout.chopeirasVendidas)
    .map((n) => `chopeira-${n}`)
    .concat(listaDeNumeros(layout.mesasVendidas).map((n) => `mesa-${n}`))
    .filter(layoutChaveValida);
  const situacoes = {};
  vendidas.forEach((c) => {
    situacoes[c] = "vendida";
  });
  const botoesEnviar = CONTATOS_OFICIAIS.map(
    (c, i) => `
            <a class="botao botao-whatsapp" data-contato="${i}" href="${waLink(mensagemCompra(c), c.whatsapp)}" target="_blank" rel="noopener">
              ${iconeWhatsapp()} <span class="lg-enviar-texto">Enviar para a ${c.nome}</span>
            </a>`
  ).join("");

  return `
    <div class="chopp-bloco-titulo" id="layout-ginasio">
      <span class="chopp-etiqueta">Layout do ginásio</span>
      <h4>Onde fica cada chopeira e cada mesa</h4>
    </div>
    <p class="lg-intro">Veja onde vão ficar as chopeiras e as mesas e já escolha a posição que você quer para a hora da compra. <strong>Toque no layout para marcar.</strong></p>
    <div class="lg-grade">
      <div class="lg-mapa-caixa">
        <div class="lg-mapa" id="lg-mapa" data-vendidas="${vendidas.join(",")}" data-planilha="${layout.planilhaVendidas || ""}">
          ${criarSvgGinasio(situacoes)}
        </div>
        <button type="button" class="botao botao-secundario lg-ampliar" id="lg-ampliar">🔍 Ampliar o mapa</button>
      </div>
      <div class="lg-lateral">
        <div class="lg-painel">
          <h5 id="lg-painel-titulo" tabindex="-1">Sua escolha</h5>
          <p class="lg-vazio" id="lg-vazio">Nenhuma posição marcada ainda. Toque numa chopeira ou numa mesa no layout.</p>
          <p class="lg-perdidas" id="lg-perdidas" hidden></p>
          <div class="lg-reserva" id="lg-reserva" hidden>
            <p class="lg-reserva-titulo" id="lg-reserva-titulo" tabindex="-1">Reservado para você</p>
            <p class="lg-reserva-prazo" id="lg-reserva-prazo"></p>
            <p class="lg-reserva-codigo" id="lg-reserva-codigo"></p>
          </div>
          <ul class="lg-escolhas" id="lg-escolhas"></ul>
          <div class="lg-enviar" id="lg-enviar" hidden>
            <p class="lg-enviar-titulo">Envie para apenas uma delas:</p>${botoesEnviar}
          </div>
          <div class="lg-acoes">
            <button type="button" class="lg-limpar" id="lg-limpar" hidden>Limpar escolha</button>
            <button type="button" class="lg-limpar" id="lg-cancelar" hidden>Cancelar reserva</button>
          </div>
          <p class="lg-aviso" id="lg-aviso"></p>
        </div>
        <div class="lg-legenda">
          <ul>
            <li><strong>Chopeiras 1 a 13:</strong> parede da esquerda, entre os dois banheiros.</li>
            <li><strong>Chopeiras 14 a 18:</strong> parede da direita, entre o palco e o bar.</li>
            <li><strong>Mesas 1 a 20:</strong> no centro, em 4 fileiras de 5. A fileira das mesas 1 a 5 é a mais perto do palco.</li>
            <li id="lg-legenda-reservada" hidden><strong class="lg-legenda-selo lg-legenda-reservada">RESERVADA</strong> posição segura para alguém. A reserva feita pelo site vale por 1 hora; se a compra não for confirmada com a Andréia ou a Raquel, a posição volta a ficar livre.</li>
            <li id="lg-legenda-vendida"${vendidas.length ? "" : " hidden"}><strong class="lg-legenda-selo lg-legenda-vendida">VENDIDA</strong> posição que já foi vendida.</li>
          </ul>
          <p>Esquerda e direita de quem entra no ginásio, olhando para o palco.</p>
        </div>
      </div>
    </div>
    <p class="lg-status" id="lg-status" aria-live="polite"></p>
  `;
}

// ----- Guardar no aparelho -----
function lerDoAparelho(chave) {
  try {
    return window.localStorage.getItem(chave);
  } catch (erro) {
    return null;
  }
}

function gravarNoAparelho(chave, valor) {
  try {
    if (valor === null) window.localStorage.removeItem(chave);
    else window.localStorage.setItem(chave, valor);
    return true;
  } catch (erro) {
    return false;
  }
}

function layoutLer() {
  try {
    const salvo = JSON.parse(lerDoAparelho(LAYOUT_ARMAZENAMENTO) || "[]");
    return Array.isArray(salvo) ? salvo.filter((c) => typeof c === "string" && layoutChaveValida(c)) : [];
  } catch (erro) {
    return [];
  }
}

function layoutSalvar() {
  layoutEstado.salvaNoAparelho = gravarNoAparelho(LAYOUT_ARMAZENAMENTO, JSON.stringify(layoutEstado.escolhas));
}

function layoutLerReserva() {
  try {
    const r = JSON.parse(lerDoAparelho(LAYOUT_RESERVA) || "null");
    if (!r || typeof r.codigo !== "string" || !Array.isArray(r.posicoes) || isNaN(Date.parse(r.ate))) return null;
    if (!r.posicoes.every(layoutChaveValida)) return null;
    return r;
  } catch (erro) {
    return null;
  }
}

function layoutSalvarReserva() {
  gravarNoAparelho(LAYOUT_RESERVA, layoutEstado.minhaReserva ? JSON.stringify(layoutEstado.minhaReserva) : null);
}

function layoutDispositivo() {
  if (layoutEstado.dispositivo) return layoutEstado.dispositivo;
  let id = lerDoAparelho(LAYOUT_DISPOSITIVO);
  if (!/^[a-f0-9]{32}$/.test(id || "")) {
    const bytes = new Uint8Array(16);
    if (window.crypto && window.crypto.getRandomValues) {
      window.crypto.getRandomValues(bytes);
    } else {
      for (let i = 0; i < 16; i++) bytes[i] = Math.floor(Math.random() * 256);
    }
    id = Array.prototype.map.call(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
    gravarNoAparelho(LAYOUT_DISPOSITIVO, id);
  }
  layoutEstado.dispositivo = id;
  return id;
}

// ----- Situação de cada posição -----
// Reserva de outra pessoa ainda valendo? (sem horário = reservada pela organização)
function layoutReservadaPorOutro(chave) {
  if (!Object.prototype.hasOwnProperty.call(layoutEstado.reservadas, chave)) return false;
  const ate = layoutEstado.reservadas[chave];
  return !ate || Date.parse(ate) > agoraServidor();
}

function layoutSituacoes() {
  const minhas = layoutEstado.minhaReserva ? layoutEstado.minhaReserva.posicoes : [];
  const situacoes = {};
  layoutItens().forEach((i) => {
    const chave = `${i.tipo}-${i.num}`;
    if (layoutEstado.vendidas.indexOf(chave) !== -1) situacoes[chave] = "vendida";
    else if (minhas.indexOf(chave) === -1 && layoutReservadaPorOutro(chave)) situacoes[chave] = "reservada";
    else situacoes[chave] = "livre";
  });
  return situacoes;
}

function layoutRedesenharMapa() {
  const mapa = document.getElementById("lg-mapa");
  if (!mapa) return;
  const situacoes = layoutSituacoes();
  const assinatura = JSON.stringify(situacoes);
  const mudou = assinatura !== layoutEstado.assinaturaMapa;
  layoutEstado.assinaturaMapa = assinatura;
  const valores = Object.keys(situacoes).map((c) => situacoes[c]);
  const legendaVendida = document.getElementById("lg-legenda-vendida");
  const legendaReservada = document.getElementById("lg-legenda-reservada");
  if (legendaVendida) legendaVendida.hidden = valores.indexOf("vendida") === -1;
  if (legendaReservada) legendaReservada.hidden = valores.indexOf("reservada") === -1;
  layoutAvisarTudoVendido(valores.every((v) => v === "vendida"));
  if (!mudou) return;

  const ativo = document.activeElement;
  const chaveFocada = ativo && mapa.contains(ativo) && ativo.getAttribute ? ativo.getAttribute("data-chave") : null;
  mapa.innerHTML = criarSvgGinasio(situacoes);
  layoutMarcarEscolhas(mapa);
  if (chaveFocada) {
    const item = mapa.querySelector(`.lg-item[data-chave="${chaveFocada}"][role="button"]`);
    if (item) item.focus();
  }
  layoutDesenharZoom();
}

function layoutMarcarEscolhas(area) {
  area.querySelectorAll('.lg-item[role="button"]').forEach((g) => {
    g.setAttribute("aria-pressed", String(layoutEstado.escolhas.indexOf(g.getAttribute("data-chave")) !== -1));
  });
}

// Todas as posições vendidas: troca os convites para escolher por um aviso neutro.
function layoutAvisarTudoVendido(tudo) {
  const intro = document.querySelector(".lg-intro");
  const vazio = document.getElementById("lg-vazio");
  if (!intro || !vazio) return;
  if (!intro.getAttribute("data-original")) {
    intro.setAttribute("data-original", intro.innerHTML);
    vazio.setAttribute("data-original", vazio.textContent);
  }
  intro.innerHTML = tudo ? "Todas as chopeiras e mesas do layout já foram vendidas." : intro.getAttribute("data-original");
  vazio.textContent = tudo ? "Todas as chopeiras e mesas do layout já foram vendidas." : vazio.getAttribute("data-original");
}

// ----- Mapa ampliado (tela cheia, com toque) -----
function layoutAbrirZoom() {
  let camada = document.getElementById("lg-zoom");
  if (!camada) {
    camada = document.createElement("div");
    camada.id = "lg-zoom";
    camada.className = "lg-zoom";
    camada.setAttribute("role", "dialog");
    camada.setAttribute("aria-modal", "true");
    camada.setAttribute("aria-label", "Layout do ginásio ampliado");
    camada.innerHTML = `
      <div class="lg-zoom-barra">
        <p>Toque nas posições para marcar e arraste para ver o resto. Depois toque em Fechar.</p>
        <button type="button" class="lg-zoom-fechar" id="lg-zoom-fechar">Fechar ✕</button>
      </div>
      <div class="lg-zoom-area" id="lg-zoom-area"></div>`;
    document.body.appendChild(camada);
    document.getElementById("lg-zoom-fechar").addEventListener("click", layoutFecharZoom);
    camada.addEventListener("keydown", (e) => {
      if (e.key === "Escape") layoutFecharZoom();
    });
    layoutLigarCliques(document.getElementById("lg-zoom-area"));
  }
  layoutEstado.zoomAberto = true;
  camada.hidden = false;
  document.documentElement.classList.add("lg-zoom-aberto");
  Array.prototype.forEach.call(document.body.children, (el) => {
    if (el !== camada && el.id !== "lg-toque" && !el.hasAttribute("inert")) {
      el.setAttribute("inert", "");
      el.setAttribute("data-lg-inerte", "");
    }
  });
  if (!layoutEstado.escZoomLigado) {
    layoutEstado.escZoomLigado = true;
    document.addEventListener("keydown", (e) => {
      if (layoutEstado.zoomAberto && (e.key === "Escape" || e.key === "Esc")) layoutFecharZoom();
    });
  }
  layoutDesenharZoom();
  document.getElementById("lg-zoom-fechar").focus();
}

function layoutDesenharZoom() {
  const area = document.getElementById("lg-zoom-area");
  if (!area || !layoutEstado.zoomAberto) return;
  const ativo = document.activeElement;
  const chaveFocada = ativo && area.contains(ativo) && ativo.getAttribute ? ativo.getAttribute("data-chave") : null;
  // IDs próprios para os degradês, porque o mapa da página continua existindo.
  area.innerHTML = criarSvgGinasio(layoutSituacoes()).replace(/lg-(papel|palco|barraca|sombra|listras)/g, "lgz-$1");
  layoutMarcarEscolhas(area);
  if (chaveFocada) {
    const item = area.querySelector(`.lg-item[data-chave="${chaveFocada}"]`);
    if (item) item.focus();
    else document.getElementById("lg-zoom-fechar").focus();
  }
}

function layoutFecharZoom() {
  const camada = document.getElementById("lg-zoom");
  if (!camada) return;
  layoutEstado.zoomAberto = false;
  camada.hidden = true;
  document.documentElement.classList.remove("lg-zoom-aberto");
  document.querySelectorAll("[data-lg-inerte]").forEach((el) => {
    el.removeAttribute("inert");
    el.removeAttribute("data-lg-inerte");
  });
  const botao = document.getElementById("lg-ampliar");
  if (botao) botao.focus();
}

// Mensagem no topo do painel: "alerta" (vermelho) ou "info" (neutra).
function layoutAvisoPainel(texto, tipo) {
  const aviso = document.getElementById("lg-perdidas");
  aviso.textContent = texto;
  aviso.classList.toggle("lg-info", tipo === "info");
  aviso.hidden = false;
  document.getElementById("lg-status").textContent = texto;
}

// Escolhas do visitante que ficaram indisponíveis. Só a reserva feita pelo site
// (que tem horário) é "de outra pessoa"; a RESERVADA da planilha é da organização
// e pode ser justamente para quem está vendo.
function layoutMostrarPerdidas(lista) {
  const grupo = (situacao) => lista.filter((p) => p.situacao === situacao).map((p) => p.chave);
  const nomes = (chaves) => juntarComE(layoutOrdenar(chaves).map(layoutNome));
  const vendidas = grupo("vendida");
  const doSite = grupo("reservada");
  const daOrganizacao = grupo("reservada-org");
  const frases = [];
  if (vendidas.length) {
    frases.push(vendidas.length === 1 ? `${nomes(vendidas)}, marcada neste aparelho, agora aparece como vendida.` : `${nomes(vendidas)}, marcadas neste aparelho, agora aparecem como vendidas.`);
  }
  if (daOrganizacao.length) {
    frases.push(`A organização segurou ${nomes(daOrganizacao)}. Se foi para você, está tudo certo; em caso de dúvida, fale com a Andréia ou a Raquel.`);
  }
  if (doSite.length) {
    frases.push(doSite.length === 1 ? `${nomes(doSite)} acabou de ser reservada por outra pessoa.` : `${nomes(doSite)} acabaram de ser reservadas por outra pessoa.`);
    frases.push("Escolha outra posição no layout.");
  }
  if (!frases.length) return;
  layoutAvisoPainel(frases.join(" "), doSite.length ? "alerta" : "info");
}

// Aplica a situação vinda do servidor (ou da planilha, se o servidor estiver fora do ar).
function layoutAplicarSituacao(vendidasPlanilha, reservadas) {
  const vendidas = layoutEstado.vendidasBase.slice();
  vendidasPlanilha.forEach((c) => {
    if (vendidas.indexOf(c) === -1) vendidas.push(c);
  });
  layoutEstado.vendidas = vendidas;
  layoutEstado.reservadas = reservadas;

  // Posições da reserva deste aparelho que viraram VENDIDA na planilha. Pode ser a
  // compra desta pessoa ou uma venda por fora: o site não sabe, então não afirma.
  const minha = layoutEstado.minhaReserva;
  if (minha) {
    const vendidasMinhas = minha.posicoes.filter((p) => vendidas.indexOf(p) !== -1);
    if (vendidasMinhas.length) {
      const restantes = minha.posicoes.filter((p) => vendidasMinhas.indexOf(p) === -1);
      layoutEstado.escolhas = layoutEstado.escolhas.filter((c) => vendidasMinhas.indexOf(c) === -1);
      layoutSalvar();
      const nomes = juntarComE(layoutOrdenar(vendidasMinhas).map(layoutNome));
      let texto = vendidasMinhas.length === 1 ? `${nomes} agora aparece como VENDIDA.` : `${nomes} agora aparecem como VENDIDAS.`;
      texto += " Se você já combinou a compra com a Andréia ou a Raquel, está tudo certo. Se não, fale com elas.";
      if (restantes.length) {
        layoutEstado.minhaReserva = Object.assign({}, minha, { posicoes: restantes });
        texto += ` Sua reserva continua com ${juntarComE(layoutOrdenar(restantes).map(layoutNome))}.`;
      } else {
        layoutEstado.minhaReserva = null;
      }
      layoutSalvarReserva();
      layoutAvisoPainel(texto, "info");
    }
  }

  const minhas = layoutEstado.minhaReserva ? layoutEstado.minhaReserva.posicoes : [];
  const perdidas = [];
  layoutEstado.escolhas.forEach((c) => {
    if (minhas.indexOf(c) !== -1) return;
    if (vendidas.indexOf(c) !== -1) perdidas.push({ chave: c, situacao: "vendida" });
    else if (layoutReservadaPorOutro(c)) perdidas.push({ chave: c, situacao: reservadas[c] ? "reservada" : "reservada-org" });
  });
  if (perdidas.length) {
    const fora = perdidas.map((p) => p.chave);
    layoutEstado.escolhas = layoutEstado.escolhas.filter((c) => fora.indexOf(c) === -1);
    layoutSalvar();
    layoutMostrarPerdidas(perdidas);
    const primeira = perdidas[0];
    layoutMostrarToque(primeira.chave, primeira.situacao === "reservada" ? "reservada-agora" : primeira.situacao);
  }
  layoutRedesenharMapa();
  layoutAtualizarPainel();
}

function layoutAplicarServidor(dados, idade) {
  if (dados.agora) layoutAjustarRelogio(dados.agora, idade);
  layoutEstado.reservasLigadas = dados.reservasLigadas !== false;
  layoutEstado.planilhaOk = dados.planilhaOk !== false;
  const reservadas = {};
  (dados.reservadasPlanilha || []).forEach((c) => {
    if (layoutChaveValida(c)) reservadas[c] = "";
  });
  (dados.reservas || []).forEach((r) => {
    if (r && layoutChaveValida(r.posicao)) reservadas[r.posicao] = r.ate;
  });

  const minha = layoutEstado.minhaReserva;
  if (minha) {
    const noServidor = minha.posicoes.every((p) => reservadas[p] === minha.ate);
    const recente = Date.now() - (minha.desde || 0) < 30000; // o servidor pode demorar alguns segundos para mostrar
    if (noServidor || recente) {
      minha.posicoes.forEach((p) => {
        if (reservadas[p] === minha.ate || recente) delete reservadas[p];
      });
    } else if (Date.parse(minha.ate) > agoraServidor()) {
      // Sumiu do servidor antes da hora (cancelada em outra aba ou aparelho).
      layoutEstado.minhaReserva = null;
      layoutSalvarReserva();
    }
  }
  layoutAplicarSituacao((dados.vendidas || []).filter(layoutChaveValida), reservadas);
}

// ----- Planilha do Google (plano B quando o serviço de reservas não responde) -----
function layoutUrlPlanilha(planilha) {
  // Aceita o ID da planilha ou um endereço de CSV (usado nos testes).
  const base =
    planilha.indexOf("/") === -1
      ? `https://docs.google.com/spreadsheets/d/${encodeURIComponent(planilha)}/gviz/tq?tqx=out:csv&headers=1`
      : planilha;
  return `${base}${base.indexOf("?") === -1 ? "?" : "&"}_=${Date.now()}`;
}

function lerCsv(texto) {
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

// Mesma regra do servidor: Situação = Livre / RESERVADA / VENDIDA; linha
// "Reservas pelo site" = LIGADAS / DESLIGADAS. Devolve null se não for a planilha.
function planilhaDoCsv(texto) {
  const limpo = String(texto || "").replace(/^﻿/, "");
  if (/<html|<!doctype/i.test(limpo.slice(0, 600))) return null; // página de login ou de erro
  const vendidas = [];
  const reservadas = [];
  let reservasLigadas = true;
  let comSituacao = 0;
  lerCsv(limpo).forEach((colunas) => {
    const rotulo = (colunas[0] || "").trim();
    const valor = (colunas[1] || "").trim().toLowerCase();
    if (/^reservas pelo site$/i.test(rotulo)) {
      reservasLigadas = !/^deslig/.test(valor);
      return;
    }
    const posicao = /^(chopeira|mesa)\s*(\d{1,2})$/i.exec(rotulo);
    if (!posicao) return;
    const chave = `${posicao[1].toLowerCase()}-${Number(posicao[2])}`;
    if (!layoutChaveValida(chave)) return;
    if (valor) comSituacao++;
    if (/^vend/.test(valor) && vendidas.indexOf(chave) === -1) vendidas.push(chave);
    else if (/^reserv/.test(valor) && reservadas.indexOf(chave) === -1) reservadas.push(chave);
  });
  // Sem nenhuma Situação preenchida a planilha está fora do formato: mantém o mapa como está.
  return comSituacao ? { vendidas, reservadas, reservasLigadas } : null;
}

function buscarComLimite(url, opcoes, ms) {
  let limite = null;
  const extras = Object.assign({ cache: "no-store" }, opcoes || {});
  if (window.AbortController) {
    const controle = new AbortController();
    extras.signal = controle.signal;
    limite = setTimeout(() => controle.abort(), ms);
  }
  return fetch(url, extras).then(
    (resposta) => {
      clearTimeout(limite);
      return resposta;
    },
    (erro) => {
      clearTimeout(limite);
      throw erro;
    }
  );
}

function layoutBuscarPlanilhaDireto() {
  if (!layoutEstado.planilha) return Promise.resolve();
  return buscarComLimite(layoutUrlPlanilha(layoutEstado.planilha), {}, 10000)
    .then((resposta) => (resposta.ok ? resposta.text() : Promise.reject(new Error(`HTTP ${resposta.status}`))))
    .then((texto) => {
      const dados = planilhaDoCsv(texto);
      if (!dados) return;
      layoutEstado.reservasLigadas = dados.reservasLigadas;
      const reservadas = {};
      dados.reservadas.forEach((c) => {
        reservadas[c] = "";
      });
      layoutAplicarSituacao(dados.vendidas, reservadas);
    })
    .catch(() => {
      // Planilha fechada, fora do ar ou sem internet: o mapa segue como está.
    });
}

// Lê a situação das posições: primeiro o serviço de reservas; se ele não
// responder, a planilha direto.
function layoutBuscarEstado(forcar) {
  if (!window.fetch || layoutEstado.buscando) return;
  if (!forcar && Date.now() - layoutEstado.ultimaBusca < 8000) return;
  layoutEstado.buscando = true;
  layoutEstado.ultimaBusca = Date.now();
  let idade = 0;
  buscarComLimite(LAYOUT_API, {}, 8000)
    .then((resposta) => {
      idade = Number(resposta.headers.get("age")) || 0;
      return resposta.ok ? resposta.json() : Promise.reject(new Error(`HTTP ${resposta.status}`));
    })
    .then((dados) => {
      if (!dados || !Array.isArray(dados.reservas)) throw new Error("resposta inesperada");
      if (layoutEstado.apiOk === false) layoutEstado.erroReserva = ""; // o serviço voltou
      layoutEstado.apiOk = true;
      layoutEstado.falhasApi = 0;
      layoutAplicarServidor(dados, idade);
    })
    .catch(() => {
      layoutEstado.falhasApi++;
      // Uma falha solta não troca a tela; duas seguidas, sim.
      if (layoutEstado.falhasApi >= 2 || layoutEstado.apiOk === null) layoutEstado.apiOk = false;
      layoutAtualizarPainel();
      return layoutBuscarPlanilhaDireto();
    })
    .then(() => {
      layoutEstado.buscando = false;
    });
}

// Consulta o servidor só com a aba na frente, o mapa na tela (ou uma reserva viva),
// alguém mexendo na página nos últimos 10 min e antes do fim do baile. Cada
// consulta gasta créditos do Netlify.
function layoutDeveBuscar() {
  if (document.hidden || Date.now() > LAYOUT_FIM) return false;
  if (Date.now() - layoutEstado.ultimaInteracao > 10 * 60 * 1000) return false;
  return layoutEstado.mapaVisivel || Boolean(layoutEstado.minhaReserva);
}

function layoutAgendarBusca() {
  clearTimeout(layoutEstado.timerBusca);
  // Depois da abertura das vendas a situação muda rápido: lê a cada 20 s.
  const intervalo = layoutEstado.vendasAbertas ? 20000 : 45000;
  layoutEstado.timerBusca = setTimeout(() => {
    if (layoutDeveBuscar()) layoutBuscarEstado();
    layoutAgendarBusca();
  }, intervalo);
}

function layoutVigiarUso(grade) {
  const marcarUso = () => {
    const parada = Date.now() - layoutEstado.ultimaInteracao > 10 * 60 * 1000;
    layoutEstado.ultimaInteracao = Date.now();
    if (parada && layoutDeveBuscar()) layoutBuscarEstado(); // voltou depois de um tempo parado
  };
  ["pointerdown", "keydown", "scroll", "touchstart"].forEach((evento) => {
    window.addEventListener(evento, marcarUso, { passive: true });
  });
  if (window.IntersectionObserver) {
    new IntersectionObserver((entradas) => {
      const visivel = entradas.some((e) => e.isIntersecting);
      const apareceu = visivel && !layoutEstado.mapaVisivel;
      layoutEstado.mapaVisivel = visivel;
      if (apareceu && layoutDeveBuscar()) layoutBuscarEstado();
    }).observe(grade);
  } else {
    layoutEstado.mapaVisivel = true;
  }
}

// Libera no mapa, na hora certa, as reservas de outras pessoas que venceram.
function layoutVigiarVencimentos() {
  setInterval(() => {
    if (!document.hidden && (layoutEstado.mapaVisivel || layoutEstado.zoomAberto) && Object.keys(layoutEstado.reservadas).length) layoutRedesenharMapa();
  }, 5000);
}

// ----- Reserva -----
function layoutReservasPossiveis() {
  return (
    layoutEstado.vendasAbertas &&
    layoutEstado.apiOk !== false &&
    layoutEstado.reservasLigadas &&
    layoutEstado.planilhaOk &&
    !layoutEstado.reservaBloqueada
  );
}

function layoutPedirAoServidor(corpo) {
  return buscarComLimite(
    LAYOUT_API,
    { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(corpo) },
    15000
  ).then((resposta) =>
    resposta
      .json()
      .catch(() => ({}))
      .then((dados) => ({ status: resposta.status, dados: dados || {} }))
  );
}

// Toque num botão do WhatsApp do painel com posições ainda não reservadas:
// reserva por 1 hora e abre a conversa já com a reserva na mensagem. Se o site
// não conseguir reservar (fora do ar, pausado, limite), a conversa abre com a
// escolha mesmo assim; só não abre quando alguém já pegou a posição.
function layoutReservarEEnviar(indice) {
  const contato = CONTATOS_OFICIAIS[indice];
  if (layoutEstado.reservando || !contato) return;
  const posicoes = layoutOrdenar(layoutEstado.escolhas);
  if (!posicoes.length) return;
  if (posicoes.length > LAYOUT_MAX_POSICOES) {
    layoutEstado.erroReserva = `Reserve até ${LAYOUT_MAX_POSICOES} posições de cada vez. Desmarque algumas e tente de novo.`;
    layoutAtualizarPainel();
    return;
  }
  layoutEstado.reservando = true;
  layoutEstado.enviandoPara = indice;
  layoutEstado.erroReserva = "";
  layoutAtualizarPainel();

  const terminar = () => {
    layoutEstado.reservando = false;
    layoutEstado.enviandoPara = null;
  };
  const enviarMesmoAssim = (motivo) => {
    if (motivo) layoutEstado.erroReserva = `${motivo} ${LAYOUT_SEM_RESERVA}`;
    layoutAtualizarPainel();
    abrirWhatsapp(waLink(mensagemCompra(contato), contato.whatsapp));
  };
  const tratarResposta = (r) => {
    terminar();
    if (r.dados.agora) layoutAjustarRelogio(r.dados.agora);
    if (r.status === 200 && r.dados.ok && r.dados.reserva) {
      layoutEstado.apiOk = true;
      layoutEstado.falhasApi = 0;
      layoutEstado.minhaReserva = Object.assign({}, r.dados.reserva, { desde: Date.now(), contato: indice });
      layoutSalvarReserva();
      layoutEstado.escolhas = r.dados.reserva.posicoes.slice();
      layoutSalvar();
      layoutEstado.minhaReserva.posicoes.forEach((p) => delete layoutEstado.reservadas[p]);
      document.getElementById("lg-perdidas").hidden = true;
      layoutRedesenharMapa();
      layoutAtualizarPainel();
      layoutIniciarContagemReserva();
      const ate = Date.parse(r.dados.reserva.ate);
      layoutMostrarAviso(`Reservado até ${horaCurta(ate)} ✓`, `Abrindo o WhatsApp da ${contato.nome}...`);
      // O foco vai para a caixa da reserva, que é o que a pessoa vê ao voltar do WhatsApp.
      document.getElementById("lg-reserva-titulo").focus();
      document.getElementById("lg-status").textContent = `Reserva feita: ${juntarComE(layoutOrdenar(posicoes).map(layoutNome))}, até ${horaCurta(ate)}. Código ${r.dados.reserva.codigo}. Abrindo o WhatsApp da ${contato.nome}.`;
      abrirWhatsapp(waLink(mensagemCompra(contato), contato.whatsapp));
      return;
    }
    if (r.status === 409 && Array.isArray(r.dados.ocupadas)) {
      // Alguém pegou antes: o WhatsApp não abre e a pessoa escolhe outra posição.
      const perdidas = [];
      r.dados.ocupadas.forEach((o) => {
        if (!o || !layoutChaveValida(o.posicao)) return;
        if (o.situacao === "vendida") {
          if (layoutEstado.vendidas.indexOf(o.posicao) === -1) layoutEstado.vendidas.push(o.posicao);
        } else {
          layoutEstado.reservadas[o.posicao] = o.ate || "";
        }
        perdidas.push({ chave: o.posicao, situacao: o.situacao });
      });
      const fora = perdidas.map((p) => p.chave);
      layoutEstado.escolhas = layoutEstado.escolhas.filter((c) => fora.indexOf(c) === -1);
      layoutSalvar();
      layoutMostrarPerdidas(perdidas);
      if (perdidas.length) layoutMostrarToque(perdidas[0].chave, perdidas[0].situacao === "vendida" ? "vendida" : "reservada-agora");
      layoutRedesenharMapa();
      layoutAtualizarPainel();
      layoutBuscarEstado(true);
      return;
    }
    if (r.status === 403 && r.dados.motivo === "fechado") {
      layoutEstado.erroReserva = `As reservas abrem em ${LANCAMENTO_LOTES.label}.`;
      layoutAtualizarPainel();
      return;
    }
    if (r.status === 400 && r.dados.motivo === "muitas") {
      layoutEstado.erroReserva = `Reserve até ${LAYOUT_MAX_POSICOES} posições de cada vez. Desmarque algumas e tente de novo.`;
      layoutAtualizarPainel();
      return;
    }
    // A reserva pelo site não deu, mas a conversa abre com a escolha.
    if (r.status === 403 && r.dados.motivo === "pausadas") {
      layoutEstado.reservasLigadas = false;
      enviarMesmoAssim();
    } else if (r.status === 503 && r.dados.motivo === "planilha") {
      layoutEstado.planilhaOk = false;
      enviarMesmoAssim();
    } else if (r.status === 429) {
      layoutEstado.reservaBloqueada = true;
      enviarMesmoAssim("Muitas posições já foram reservadas a partir desta mesma internet (Wi-Fi ou operadora).");
    } else {
      layoutEstado.apiOk = false;
      enviarMesmoAssim("A reserva pelo site não funcionou agora.");
    }
  };

  const pedido = { acao: "reservar", posicoes, dispositivo: layoutDispositivo() };
  // Se o servidor estiver muito disputado (503), tenta mais uma vez depois de 1,5 s.
  layoutPedirAoServidor(pedido)
    .then((r) =>
      r.status === 503 && r.dados.motivo !== "planilha"
        ? new Promise((ok) => setTimeout(ok, 1500)).then(() => layoutPedirAoServidor(pedido))
        : r
    )
    .then(tratarResposta, () => {
      // Sem resposta (internet ou serviço fora do ar).
      terminar();
      layoutEstado.apiOk = false;
      enviarMesmoAssim("A reserva pelo site não funcionou agora.");
    });
}

function layoutCancelarReserva() {
  const reserva = layoutEstado.minhaReserva;
  if (!reserva) return;
  layoutPedirAoServidor({ acao: "cancelar", dispositivo: layoutDispositivo() }).catch(() => {});
  layoutEstado.minhaReserva = null;
  layoutSalvarReserva();
  layoutEstado.escolhas = [];
  layoutSalvar();
  layoutRedesenharMapa();
  layoutAtualizarPainel();
  layoutMostrarAviso("Reserva cancelada", "As posições voltaram a ficar livres.");
  document.getElementById("lg-status").textContent = "Reserva cancelada. As posições voltaram a ficar livres.";
  setTimeout(() => layoutBuscarEstado(true), 1500);
}

// Atualiza o "faltam X minutos" e solta a reserva quando o horário passa.
function layoutIniciarContagemReserva() {
  clearInterval(layoutEstado.timerContagem);
  const passo = () => {
    const reserva = layoutEstado.minhaReserva;
    if (!reserva) {
      clearInterval(layoutEstado.timerContagem);
      return;
    }
    const ate = Date.parse(reserva.ate);
    if (agoraServidor() >= ate) {
      clearInterval(layoutEstado.timerContagem);
      layoutEstado.minhaReserva = null;
      layoutSalvarReserva();
      layoutAvisoPainel(`Sua reserva pelo site expirou às ${horaCurta(ate)}. Se as posições continuarem livres no mapa, toque de novo no botão do WhatsApp para reservar outra vez.`, "info");
      layoutMostrarAviso("Sua reserva expirou", "Confira o mapa antes de reservar de novo.");
      layoutRedesenharMapa();
      layoutBuscarEstado(true);
    }
    layoutAtualizarPainel();
  };
  passo();
  layoutEstado.timerContagem = setInterval(passo, 15000);
}

// ----- Painel "Sua escolha" -----
function layoutAtualizarPainel(chaveNova) {
  const lista = document.getElementById("lg-escolhas");
  if (!lista) return;

  const reserva = layoutEstado.minhaReserva;
  const minhas = reserva ? reserva.posicoes : [];
  const escolhas = layoutOrdenar(layoutEstado.escolhas);
  const vazio = escolhas.length === 0;
  const possiveis = layoutReservasPossiveis();
  const mudouEscolha = Boolean(reserva) && !layoutMesmaLista(escolhas, minhas);

  lista.innerHTML = escolhas
    .map(
      (chave) => `
      <li class="lg-escolha${chave === chaveNova ? " lg-nova" : ""}${minhas.indexOf(chave) !== -1 ? " lg-escolha-reservada" : ""}">
        <div><strong>${layoutNome(chave)}</strong>${
          reserva ? (minhas.indexOf(chave) !== -1 ? '<em class="lg-selo">Reservada</em>' : '<em class="lg-selo lg-selo-nova">Nova</em>') : ""
        }<span>${layoutPosicao(chave)}</span></div>
        <button type="button" class="lg-remover" data-chave="${chave}" aria-label="Desmarcar ${layoutNome(chave)}">×</button>
      </li>`
    )
    .join("");

  document.getElementById("lg-vazio").hidden = !vazio || Boolean(reserva);
  const caixa = document.getElementById("lg-reserva");
  caixa.hidden = !reserva;
  if (reserva) {
    const ate = Date.parse(reserva.ate);
    document.getElementById("lg-reserva-prazo").textContent = `Até ${horaCurta(ate)} de ${dataCurta(ate)} · ${textoFaltam(ate)}`;
    document.getElementById("lg-reserva-codigo").textContent = `Código da reserva: ${reserva.codigo}`;
  }

  // Depois da abertura, os botões do WhatsApp aparecem assim que há posição marcada.
  // O toque reserva por 1 hora (se ainda não estiver reservado) e abre a conversa.
  const enviar = document.getElementById("lg-enviar");
  enviar.hidden = !layoutEstado.vendasAbertas || vazio;
  enviar.classList.toggle("lg-ocupado", layoutEstado.reservando);
  enviar.querySelectorAll("a[data-contato]").forEach((a) => {
    const indice = Number(a.getAttribute("data-contato"));
    const contato = CONTATOS_OFICIAIS[indice];
    const rotulo = a.querySelector(".lg-enviar-texto");
    if (layoutEstado.reservando) a.setAttribute("aria-disabled", "true");
    else a.removeAttribute("aria-disabled");
    if (rotulo && contato) {
      rotulo.textContent = layoutEstado.reservando && layoutEstado.enviandoPara === indice ? "Reservando..." : `Enviar para a ${contato.nome}`;
    }
  });
  document.getElementById("lg-limpar").hidden = vazio || Boolean(reserva);
  document.getElementById("lg-cancelar").hidden = !reserva;

  let aviso;
  if (!layoutEstado.vendasAbertas) {
    aviso = `Marcar no layout ainda não reserva o lugar. Na abertura das vendas, em ${LANCAMENTO_LOTES.label}, aparecem aqui os botões para enviar sua escolha pelo WhatsApp da Andréia ou da Raquel. Ao tocar, o site segura as posições por 1 hora.`;
  } else if (layoutEstado.erroReserva) {
    aviso = layoutEstado.erroReserva;
  } else if (reserva && vazio) {
    aviso = "Você desmarcou todas as posições. Para liberar a reserva, toque em Cancelar reserva. Se foi sem querer, toque de novo nas posições no layout.";
  } else if (reserva && mudouEscolha && possiveis) {
    aviso = "Você mudou a escolha. Toque no botão do WhatsApp para atualizar a reserva (o horário não muda) e enviar a nova escolha.";
  } else if (reserva) {
    const ate = Date.parse(reserva.ate);
    const escolhida = CONTATOS_OFICIAIS[reserva.contato];
    const prazo = "Depois desse horário, a reserva pelo site cai e as posições voltam a ficar livres.";
    if (escolhida) {
      const outras = CONTATOS_OFICIAIS.filter((c) => c !== escolhida).map((c) => `a ${c.nome}`);
      aviso = `Você escolheu a ${escolhida.nome}: envie a mensagem por lá e confirme a compra com ela até ${horaCurta(ate)}. ${prazo} Não precisa mandar também para ${juntarComE(outras)}; se o WhatsApp não abriu, toque de novo no botão.`;
    } else {
      aviso = `Envie agora para a Andréia ou a Raquel e confirme a compra até ${horaCurta(ate)}. ${prazo}`;
    }
  } else if (!layoutEstado.reservasLigadas) {
    aviso = `As reservas pelo site estão pausadas pela organização. ${LAYOUT_SEM_RESERVA}`;
  } else if (!layoutEstado.planilhaOk) {
    aviso = `A reserva pelo site está indisponível agora. ${LAYOUT_SEM_RESERVA}`;
  } else if (layoutEstado.apiOk === false) {
    aviso = `A reserva pelo site está fora do ar agora. ${LAYOUT_SEM_RESERVA}`;
  } else if (vazio) {
    aviso = "Toque nas posições que você quer no layout. Depois, envie pelo WhatsApp para a Andréia ou a Raquel: o site segura as posições por 1 hora para você confirmar a compra.";
  } else {
    aviso = `Ao tocar, o site segura ${escolhas.length === 1 ? "a posição marcada" : "as posições marcadas"} por 1 hora e abre o WhatsApp com a sua escolha. Até ${LAYOUT_MAX_POSICOES} posições por reserva.`;
  }
  if (!vazio && !reserva && layoutEstado.salvaNoAparelho && !layoutEstado.vendasAbertas) aviso += " Sua escolha fica salva neste aparelho.";
  document.getElementById("lg-aviso").textContent = aviso;

  document.querySelectorAll('.lg-item[role="button"]').forEach((g) => {
    g.setAttribute("aria-pressed", String(layoutEstado.escolhas.indexOf(g.getAttribute("data-chave")) !== -1));
  });
  atualizarLinksCompra();
}

// ----- Avisos rápidos no pé da tela (no celular o painel fica abaixo do mapa) -----
function layoutMostrarAviso(titulo, detalhe) {
  let toque = document.getElementById("lg-toque");
  if (!toque) {
    toque = document.createElement("div");
    toque.id = "lg-toque";
    toque.className = "lg-toque";
    toque.setAttribute("aria-hidden", "true");
    document.body.appendChild(toque);
  }
  toque.innerHTML = `<strong>${titulo}</strong>${detalhe ? `<span>${detalhe}</span>` : ""}`;
  toque.classList.add("visivel");
  clearTimeout(layoutEstado.timerToque);
  layoutEstado.timerToque = setTimeout(() => toque.classList.remove("visivel"), 2800);
}

function layoutMostrarToque(chave, estado) {
  const nome = layoutNome(chave);
  if (estado === "vendida") {
    layoutMostrarAviso(`${nome} já foi vendida`, "");
  } else if (estado === "reservada-agora") {
    layoutMostrarAviso(`${nome} acabou de ser reservada`, "Escolha outra posição no layout.");
  } else if (estado === "reservada-org") {
    layoutMostrarAviso(`${nome} está reservada`, "Reservada pela organização.");
  } else if (estado === "reservada") {
    const ate = layoutEstado.reservadas[chave];
    if (ate) layoutMostrarAviso(`${nome} está reservada até ${horaCurta(Date.parse(ate))}`, "Se a compra não for confirmada até lá, ela volta a ficar livre.");
    else layoutMostrarAviso(`${nome} está reservada`, "Reservada pela organização.");
  } else if (estado) {
    layoutMostrarAviso(`${nome} marcada ✓`, layoutPosicao(chave));
  } else {
    layoutMostrarAviso(`${nome} desmarcada`, "");
  }
}

function layoutAlternar(chave) {
  if (!layoutChaveValida(chave)) return;
  const situacao = layoutSituacoes()[chave];
  if (situacao !== "livre") return;
  const posicao = layoutEstado.escolhas.indexOf(chave);
  const marcado = posicao === -1;
  if (marcado) {
    layoutEstado.escolhas.push(chave);
  } else {
    layoutEstado.escolhas.splice(posicao, 1);
  }
  layoutEstado.erroReserva = "";
  layoutEstado.reservaBloqueada = false;
  layoutSalvar();
  layoutAtualizarPainel(marcado ? chave : null);
  layoutMostrarToque(chave, marcado);
  document.getElementById("lg-status").textContent = marcado
    ? `${layoutNome(chave)} marcada. ${layoutPosicao(chave)}.`
    : `${layoutNome(chave)} desmarcada.`;
}

// Toque/clique e teclado num mapa (o da página ou o ampliado).
function layoutLigarCliques(area) {
  area.addEventListener("click", (e) => {
    const item = e.target.closest(".lg-item");
    if (!item) return;
    const chave = item.getAttribute("data-chave");
    if (item.classList.contains("lg-vendida")) {
      layoutMostrarToque(chave, "vendida");
      document.getElementById("lg-status").textContent = `${layoutNome(chave)} já foi vendida.`;
      return;
    }
    if (item.classList.contains("lg-reservada")) {
      layoutMostrarToque(chave, "reservada");
      document.getElementById("lg-status").textContent = `${layoutNome(chave)} está reservada.`;
      return;
    }
    layoutAlternar(chave);
  });
  area.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " " && e.key !== "Spacebar") return;
    const item = e.target.closest('.lg-item[role="button"]');
    if (!item) return;
    e.preventDefault();
    layoutAlternar(item.getAttribute("data-chave"));
  });
}

function iniciarLayoutGinasio() {
  const mapa = document.getElementById("lg-mapa");
  if (!mapa) return;

  layoutEstado.vendidasBase = (mapa.getAttribute("data-vendidas") || "").split(",").filter(Boolean);
  layoutEstado.vendidas = layoutEstado.vendidasBase.slice();
  layoutEstado.planilha = mapa.getAttribute("data-planilha") || "";
  layoutEstado.assinaturaMapa = JSON.stringify(layoutSituacoes());

  const reserva = layoutLerReserva();
  if (reserva && Date.parse(reserva.ate) > Date.now()) layoutEstado.minhaReserva = reserva;
  else gravarNoAparelho(LAYOUT_RESERVA, null);

  const salvas = layoutLer();
  const perdidas = salvas.filter((c) => layoutEstado.vendidas.indexOf(c) !== -1);
  layoutEstado.escolhas = salvas.filter((c) => layoutEstado.vendidas.indexOf(c) === -1);
  layoutEstado.salvaNoAparelho = salvas.length > 0;
  if (perdidas.length) {
    // A pessoa tinha marcado uma posição que, enquanto isso, foi vendida.
    layoutMostrarPerdidas(perdidas.map((c) => ({ chave: c, situacao: "vendida" })));
  }

  layoutLigarCliques(mapa);
  // Duplo toque/duplo clique: o 2º toque é ignorado (senão desmarca na hora ou
  // cai no botão que subiu para o lugar do dedo). Teclado tem detail 0.
  mapa.closest(".lg-grade").addEventListener(
    "click",
    (e) => {
      if (e.detail > 1) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    true
  );

  const titulo = document.getElementById("lg-painel-titulo");
  document.getElementById("lg-escolhas").addEventListener("click", (e) => {
    const botao = e.target.closest(".lg-remover");
    if (!botao) return;
    const botoes = Array.prototype.slice.call(document.querySelectorAll("#lg-escolhas .lg-remover"));
    const indice = botoes.indexOf(botao);
    layoutAlternar(botao.getAttribute("data-chave"));
    if (e.detail === 0) {
      // Pelo teclado: o foco vai para o próximo X (ou para o título, se a lista acabou).
      const restantes = document.querySelectorAll("#lg-escolhas .lg-remover");
      if (restantes.length) restantes[Math.min(indice, restantes.length - 1)].focus();
      else titulo.focus();
    }
  });
  document.getElementById("lg-limpar").addEventListener("click", (e) => {
    layoutEstado.escolhas = [];
    layoutEstado.erroReserva = "";
    layoutSalvar();
    layoutAtualizarPainel();
    document.getElementById("lg-status").textContent = "Escolha limpa.";
    if (e.detail === 0) titulo.focus();
  });
  document.getElementById("lg-enviar").addEventListener("click", (e) => {
    const link = e.target.closest("a[data-contato]");
    if (!link) return;
    const indice = Number(link.getAttribute("data-contato"));
    if (!CONTATOS_OFICIAIS[indice]) return;
    if (layoutEstado.reservando) {
      e.preventDefault();
      return;
    }
    const reserva = layoutEstado.minhaReserva;
    const escolhas = layoutEstado.escolhas;
    if (layoutReservasPossiveis() && escolhas.length && (!reserva || !layoutMesmaLista(escolhas, reserva.posicoes))) {
      e.preventDefault();
      layoutReservarEEnviar(indice);
      return;
    }
    // Já reservado (ou sem reserva possível): o próprio link abre o WhatsApp.
    if (reserva && reserva.contato !== indice) {
      reserva.contato = indice;
      layoutSalvarReserva();
      setTimeout(() => layoutAtualizarPainel(), 0);
    }
  });
  document.getElementById("lg-cancelar").addEventListener("click", (e) => {
    layoutCancelarReserva();
    if (e.detail === 0) titulo.focus();
  });
  document.getElementById("lg-ampliar").addEventListener("click", layoutAbrirZoom);

  // Mapa menor que 700 px: só os números, em letra maior. Menor que 460 px (celular):
  // posição vendida ou reservada pintada inteira, porque a palavra ficaria ilegível.
  const ajustarTamanho = () => {
    mapa.classList.toggle("lg-compacto", mapa.clientWidth < 700);
    mapa.classList.toggle("lg-estreito", mapa.clientWidth < 460);
  };
  ajustarTamanho();
  window.addEventListener("resize", ajustarTamanho);

  layoutAtualizarPainel();
  if (layoutEstado.minhaReserva) layoutIniciarContagemReserva();

  // A 1ª leitura acontece quando o mapa aparece na tela (ou já, se houver reserva viva).
  layoutVigiarUso(mapa.closest(".lg-grade"));
  if (layoutEstado.minhaReserva || !window.IntersectionObserver) layoutBuscarEstado(true);
  layoutAgendarBusca();
  layoutVigiarVencimentos();
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) layoutBuscarEstado();
  });
}

function criarBlocoLancamento(lancamento) {
  if (!lancamento) return "";

  const botoesCompra = CONTATOS_OFICIAIS.map(
    (c, i) => `
        <a class="botao botao-whatsapp" data-contato="${i}" href="${waLink(mensagemCompra(c), c.whatsapp)}" target="_blank" rel="noopener">
          ${iconeWhatsapp()} Comprar com a ${c.nome}
        </a>`
  ).join("");

  return `
    <div class="chopp-lancamento">
      <h4 id="chopp-lancamento-titulo">🎟️ Lançamento dos Lotes</h4>
      <p id="chopp-lancamento-texto">Fique de olho! Os lotes de ingressos e os combos com barril de chopp serão lançados aqui no site em <strong>${lancamento.label}</strong>, com venda pelo WhatsApp da Andréia e da Raquel.</p>
      <div class="chopp-countdown" id="chopp-countdown" data-lancamento="${lancamento.dataIso}">
        <div><span id="cd-dias">00</span><label>dias</label></div>
        <div><span id="cd-horas">00</span><label>horas</label></div>
        <div><span id="cd-min">00</span><label>min</label></div>
        <div><span id="cd-seg">00</span><label>seg</label></div>
      </div>
      <div class="chopp-lancamento-compra" id="chopp-lancamento-compra" hidden>${botoesCompra}</div>
      <p class="chopp-lancamento-uma" id="chopp-lancamento-uma" hidden>Fale com apenas uma delas.</p>
      <p class="chopp-alerta-golpe">⚠️ Cuidado com golpes! <a href="#evite-golpes">Confira os únicos números oficiais da organização</a>.</p>
    </div>
  `;
}

function iniciarContagemRegressiva() {
  const container = document.getElementById("chopp-countdown");
  if (!container) return;

  const alvo = new Date(container.dataset.lancamento).getTime();
  const elDias = document.getElementById("cd-dias");
  const elHoras = document.getElementById("cd-horas");
  const elMin = document.getElementById("cd-min");
  const elSeg = document.getElementById("cd-seg");

  let intervalo;

  function atualizar() {
    const diff = alvo - agoraServidor();
    if (diff <= 0) {
      clearInterval(intervalo);
      abrirVendas(container);
      return false;
    }
    const dias = Math.floor(diff / 86400000);
    const horas = Math.floor((diff % 86400000) / 3600000);
    const min = Math.floor((diff % 3600000) / 60000);
    const seg = Math.floor((diff % 60000) / 1000);

    elDias.textContent = String(dias).padStart(2, "0");
    elHoras.textContent = String(horas).padStart(2, "0");
    elMin.textContent = String(min).padStart(2, "0");
    elSeg.textContent = String(seg).padStart(2, "0");
    return true;
  }

  if (atualizar()) {
    intervalo = setInterval(atualizar, 1000);
  }
}

function abrirVendas(contador) {
  contador.hidden = true;
  document.getElementById("chopp-lancamento-titulo").textContent = "🎟️ Lotes à venda!";
  document.getElementById("chopp-lancamento-texto").textContent =
    "Os lotes de ingressos e os combos com barril de chopp já estão à venda pelo WhatsApp da Andréia e da Raquel.";
  document.getElementById("chopp-lancamento-compra").hidden = false;
  document.getElementById("chopp-lancamento-uma").hidden = false;
  // O painel do layout passa a mostrar os botões do WhatsApp e o mapa é lido mais vezes.
  layoutEstado.vendasAbertas = true;
  layoutAtualizarPainel();
  if (document.getElementById("lg-mapa")) {
    layoutBuscarEstado(true);
    layoutAgendarBusca();
  }
}

// Monta um pedaço da seção sem deixar um erro nele apagar o resto da página.
function blocoSeguro(montar) {
  try {
    return montar();
  } catch (erro) {
    console.error(erro);
    return "";
  }
}

function criarSecaoChopp(evento) {
  const { dia, mes } = formatarDataCurta(evento.data);

  return `
    <article class="baile-chopp">
      <div class="chopp-hero" id="reservar-evento" style="background-image: url('assets/eventos/hero-baile-chopp.jpg');">
        <div class="chopp-hero-conteudo">
          ${evento.logo ? `<img class="chopp-logo" src="${evento.logo}" alt="Logo do Baile do Chopp" width="386" height="308" />` : ""}
          <span class="chopp-selo-data">${dia} de ${mes.charAt(0).toUpperCase() + mes.slice(1)} · ${evento.dataLabel.split("·")[1] ? evento.dataLabel.split("·")[1].trim() : ""}</span>
          <h3 class="chopp-titulo">${evento.titulo}</h3>
          <p class="chopp-subtitulo">${evento.subtitulo}</p>
          <div class="card-acoes">
            <a class="botao botao-whatsapp" href="${waLink(evento.mensagemWhatsapp)}" target="_blank" rel="noopener">
              ${iconeWhatsapp()} Reservar pelo Whatsapp
            </a>
            <a class="botao botao-secundario" href="#localizacao">${iconePin()} Como chegar</a>
          </div>
        </div>
      </div>
      <div class="chopp-corpo">
        <p class="chopp-intro">${evento.intro}</p>
        ${criarBlocoTimeline(evento.programacao)}
        ${criarGradeDestaques(evento.destaquesEvento)}
        ${criarBlocoChopps(evento.chopps)}
        ${blocoSeguro(() => criarBlocoLayout(evento.layoutGinasio))}
        ${criarBlocoLancamento(evento.lancamentoLotes)}
        ${criarBlocoPatrocinadores(evento.patrocinadores)}
      </div>
    </article>
  `;
}

function iconeWhatsapp() {
  return `<svg viewBox="0 0 24 24" class="icone" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.82L2 22l5.42-1.36a9.9 9.9 0 0 0 4.62 1.14h.01c5.46 0 9.9-4.45 9.9-9.9C21.95 6.45 17.5 2 12.04 2zm5.8 14.06c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.11.11-1.79-.11-.41-.13-.95-.31-1.63-.6-2.87-1.24-4.74-4.15-4.88-4.34-.14-.19-1.17-1.56-1.17-2.98 0-1.42.74-2.11 1-2.4.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.58.81 2 .88 2.14.07.14.12.31.02.5-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.02 1.12.99 2.06 1.3 2.36 1.45.29.14.46.12.63-.07.18-.19.75-.87.95-1.17.2-.29.4-.24.66-.14.27.1 1.7.8 1.99.95.29.14.48.22.55.34.07.12.07.7-.17 1.37z"/></svg>`;
}

function iconePin() {
  return `<svg viewBox="0 0 24 24" class="icone" fill="currentColor"><path d="M12 2C7.86 2 4.5 5.36 4.5 9.5c0 5.25 6.19 11.6 6.46 11.87a1.5 1.5 0 0 0 2.08 0c.27-.27 6.46-6.62 6.46-11.87C19.5 5.36 16.14 2 12 2zm0 10.5A3 3 0 1 1 12 6.5a3 3 0 0 1 0 6z"/></svg>`;
}

function renderizarEventos() {
  const ordenados = [...EVENTS].sort((a, b) => a.data.localeCompare(b.data));
  const destaque = ordenados.find((e) => e.destaque) || ordenados[0];
  const restantes = ordenados.filter((e) => e.id !== destaque.id);

  document.getElementById("destaque-container").innerHTML =
    destaque.tema === "chopp" ? criarSecaoChopp(destaque) : criarCardDestaque(destaque);

  document.getElementById("agenda-container").innerHTML = restantes.length
    ? restantes.map(criarCardAgenda).join("")
    : `<p class="agenda-vazia">Novos eventos em breve. Fale com a Andréia pelo WhatsApp para saber mais!</p>`;
}

function montarLinksLocalizacao() {
  const { lat, lng, nome } = LOCAL;
  const google = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  const waze = `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;
  const embed = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

  document.getElementById("link-google-maps").href = google;
  document.getElementById("link-waze").href = waze;
  document.getElementById("mapa-embed").src = embed;
  document.getElementById("local-nome").textContent = nome;
}

function montarRedesSociais() {
  const { facebook, instagram } = REDES_SOCIAIS;

  ["social-facebook-topo", "social-facebook-rodape"].forEach((id) => {
    document.getElementById(id).href = facebook;
  });
  ["social-instagram-topo", "social-instagram-rodape", "social-instagram-card"].forEach((id) => {
    document.getElementById(id).href = instagram;
  });

  document.getElementById("fb-page-embed").setAttribute("data-href", facebook);
}

function montarWhatsappFlutuante() {
  const mensagem = "Olá Andréia! Vim pelo site da Nova Ramada e gostaria de mais informações.";
  document.getElementById("whatsapp-flutuante").href = waLink(mensagem);
}

function montarMenuMobile() {
  const botao = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-principal");

  botao.addEventListener("click", () => {
    const aberto = nav.classList.toggle("aberto");
    botao.setAttribute("aria-expanded", String(aberto));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("aberto");
      botao.setAttribute("aria-expanded", "false");
    });
  });
}

function parseFacebookPagePlugin() {
  // Só chama o parse depois que a página estiver totalmente carregada, para o
  // Facebook conseguir ler a largura real do contêiner (evita o bug de ele
  // renderizar o feed com largura fixa em telas de celular).
  const tentar = () => {
    if (window.FB && window.FB.XFBML) {
      window.FB.XFBML.parse();
    } else {
      setTimeout(tentar, 200);
    }
  };

  if (document.readyState === "complete") {
    tentar();
  } else {
    window.addEventListener("load", tentar);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const passos = [
    renderizarEventos,
    iniciarLayoutGinasio,
    iniciarContagemRegressiva,
    montarLinksLocalizacao,
    montarWhatsappFlutuante,
    montarRedesSociais,
    montarMenuMobile,
    () => { document.getElementById("ano-atual").textContent = new Date().getFullYear(); },
    parseFacebookPagePlugin,
  ];
  // Cada passo roda isolado: um erro num deles não pode deixar os botões do site sem destino.
  passos.forEach((passo) => {
    try {
      passo();
    } catch (erro) {
      console.error(erro);
    }
  });
});
