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
        ? `<img src="${p.logo}" alt="${p.nome}" title="${p.nome}" />`
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
// nas mesmas posições. O visitante toca nas chopeiras e mesas para marcar a
// posição que quer; a escolha fica salva no aparelho e, quando as vendas
// abrem, vai junto na mensagem de WhatsApp para a Andréia ou a Raquel.
const LAYOUT_ARMAZENAMENTO = "baile-chopp-2026-layout";
const layoutEstado = {
  escolhas: [], // ex.: ["chopeira-5", "mesa-12"]
  vendidas: [],
  vendasAbertas: false,
  salvaNoAparelho: false,
  timerToque: null,
};

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

// Mensagem dos botões de compra; leva a escolha do layout, se houver.
function mensagemCompra(contato) {
  let texto = `Olá ${contato.nome}! ${LANCAMENTO_LOTES.mensagemCompra}`;
  if (layoutEstado.escolhas.length) {
    texto += ` No layout do ginásio, escolhi: ${juntarComE(layoutOrdenar(layoutEstado.escolhas).map(layoutNome))}.`;
  }
  return texto;
}

function atualizarLinksCompra() {
  document.querySelectorAll("a[data-contato]").forEach((a) => {
    const contato = CONTATOS_OFICIAIS[Number(a.dataset.contato)];
    if (contato) a.href = waLink(mensagemCompra(contato), contato.whatsapp);
  });
}

function layoutAtributos(nome, vendida) {
  return vendida
    ? `role="img" aria-label="${nome}, vendida"`
    : `role="button" tabindex="0" aria-pressed="false" aria-label="${nome}"`;
}

function svgChopeira(item, vendida) {
  const { num, x, y } = item;
  if (vendida) {
    // Vendida: número à esquerda e a inscrição VENDIDA em vermelho.
    return `
    <g class="lg-item lg-chopeira lg-vendida" data-chave="chopeira-${num}" ${layoutAtributos(`Chopeira ${num}`, true)}>
      <rect class="lg-alvo" x="${x - 6}" y="${y - 6}" width="212" height="71" rx="12"/>
      <rect x="${x}" y="${y}" width="200" height="59" rx="8" fill="#ebe6de" stroke="#9b958b" stroke-width="2.4"/>
      <text class="lg-num-vendida" x="${x + 34}" y="${y + 41}" font-size="32" text-anchor="middle" fill="#6f6a62">${num}</text>
      <rect x="${x + 66}" y="${y + 12}" width="126" height="35" rx="8" fill="#c62828"/>
      <text x="${x + 129}" y="${y + 37}" font-size="22" text-anchor="middle" fill="#fff" letter-spacing="1">VENDIDA</text>
    </g>`;
  }
  return `
    <g class="lg-item lg-chopeira" data-chave="chopeira-${num}" ${layoutAtributos(`Chopeira ${num}`, false)}>
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
      <text class="lg-texto lg-texto-curto" x="${x + 131}" y="${y + 44}" font-size="40" text-anchor="middle" fill="#111322">${num}</text>
    </g>`;
}

function svgMesa(item, vendida) {
  const { num, x: cx, y: cy } = item;
  const cadeiras = `
        <rect x="${cx - 11}" y="${cy - 43}" width="22" height="15" rx="4"/>
        <rect x="${cx - 11}" y="${cy + 28}" width="22" height="15" rx="4"/>
        <rect x="${cx - 43}" y="${cy - 11}" width="16" height="22" rx="4"/>
        <rect x="${cx + 27}" y="${cy - 11}" width="16" height="22" rx="4"/>`;
  if (vendida) {
    // Vendida: mesa em cinza, número em cima e a faixa VENDIDA em vermelho.
    return `
    <g class="lg-item lg-mesa lg-vendida" data-chave="mesa-${num}" ${layoutAtributos(`Mesa ${num}`, true)}>
      <rect class="lg-alvo" x="${cx - 50}" y="${cy - 58}" width="100" height="116" rx="14"/>
      <g fill="#e2ddd5" stroke="#9b958b" stroke-width="2.5">${cadeiras}</g>
      <circle cx="${cx}" cy="${cy}" r="32" fill="#ebe6de" stroke="#9b958b" stroke-width="2.5"/>
      <text class="lg-num-vendida" x="${cx}" y="${cy - 6}" font-size="26" text-anchor="middle" fill="#6f6a62">${num}</text>
      <rect x="${cx - 47}" y="${cy + 4}" width="94" height="26" rx="6" fill="#c62828"/>
      <text x="${cx}" y="${cy + 23}" font-size="17" text-anchor="middle" fill="#fff" letter-spacing=".5">VENDIDA</text>
    </g>`;
  }
  return `
    <g class="lg-item lg-mesa" data-chave="mesa-${num}" ${layoutAtributos(`Mesa ${num}`, false)}>
      <rect class="lg-alvo" x="${cx - 50}" y="${cy - 58}" width="100" height="116" rx="14"/>
      <g class="lg-cadeiras" fill="#f7dca7" stroke="#171d2c" stroke-width="2.5">${cadeiras}</g>
      <circle class="lg-forma" cx="${cx}" cy="${cy}" r="32" fill="#ffe3ad" stroke="#171d2c" stroke-width="2.5"/>
      <text class="lg-texto lg-texto-longo" x="${cx}" y="${cy - 1}" font-size="15" text-anchor="middle" fill="#171924">Mesa</text>
      <text class="lg-texto lg-texto-longo" x="${cx}" y="${cy + 20}" font-size="21" text-anchor="middle" fill="#171924">${num}</text>
      <text class="lg-texto lg-texto-curto" x="${cx}" y="${cy + 13}" font-size="36" text-anchor="middle" fill="#171924">${num}</text>
    </g>`;
}

// Partes fixas do desenho: paredes, palco, saídas, banheiros, bar, caixa e entradas.
function svgGinasioFixo() {
  const paredes = "M30 160H276M369 160H670M763 160H994V1432H726M625 1432H390M288 1432H30V160";
  const saida = (x) => `
      <path d="M${x + 17} 160V215M${x + 110} 160V215" stroke="#10152a" stroke-width="3" fill="none"/>
      <path d="M${x + 17} 215A46.5 46.5 0 0 1 ${x + 63.5} 168A46.5 46.5 0 0 1 ${x + 110} 215" stroke="#10152a" stroke-width="3" fill="none"/>
      <rect x="${x}" y="226" width="129" height="54" rx="10" fill="#bbf2b7" stroke="#1b4c36" stroke-width="2.5"/>
      <text x="${x + 64.5}" y="245" text-anchor="middle" fill="#163921" font-size="15">SAÍDA DE</text>
      <text x="${x + 64.5}" y="263" text-anchor="middle" fill="#163921" font-size="15">EMERGÊNCIA</text>`;
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

function criarSvgGinasio(vendidas) {
  const itens = layoutItens();
  const chopeiras = itens.filter((i) => i.tipo === "chopeira").map((i) => svgChopeira(i, vendidas.includes(`chopeira-${i.num}`))).join("");
  const mesas = itens.filter((i) => i.tipo === "mesa").map((i) => svgMesa(i, vendidas.includes(`mesa-${i.num}`))).join("");
  return `
    <svg viewBox="12 140 1000 1366" width="1000" height="1366" role="group" aria-label="Layout do ginásio: palco no fundo, chopeiras nas paredes e mesas no centro" font-family="Mulish, Arial, sans-serif" font-weight="800">
      <defs>
        <linearGradient id="lg-papel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffefe"/><stop offset="1" stop-color="#f6f5fa"/></linearGradient>
        <linearGradient id="lg-palco" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4d3fc"/><stop offset="1" stop-color="#b778d8"/></linearGradient>
        <linearGradient id="lg-barraca" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff8e7"/><stop offset="1" stop-color="#fff1d1"/></linearGradient>
        <filter id="lg-sombra"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#172036" flood-opacity=".14"/></filter>
      </defs>
      ${svgGinasioFixo()}
      ${chopeiras}
      ${mesas}
    </svg>`;
}

function criarBlocoLayout(layout) {
  if (!layout) return "";
  const vendidas = (layout.chopeirasVendidas || [])
    .map((n) => `chopeira-${n}`)
    .concat((layout.mesasVendidas || []).map((n) => `mesa-${n}`))
    .filter(layoutChaveValida);
  const botoesEnviar = CONTATOS_OFICIAIS.map(
    (c, i) => `
          <a class="botao botao-whatsapp" data-contato="${i}" href="${waLink(mensagemCompra(c), c.whatsapp)}" target="_blank" rel="noopener">
            ${iconeWhatsapp()} Enviar para a ${c.nome}
          </a>`
  ).join("");

  return `
    <div class="chopp-bloco-titulo" id="layout-ginasio">
      <span class="chopp-etiqueta">Layout do ginásio</span>
      <h4>Onde fica cada chopeira e cada mesa</h4>
    </div>
    <p class="lg-intro">Veja onde vão ficar as chopeiras e as mesas e já escolha a posição que você quer para a hora da compra. <strong>Toque no layout para marcar.</strong></p>
    <div class="lg-grade">
      <div class="lg-mapa" id="lg-mapa" data-vendidas="${vendidas.join(",")}">
        ${criarSvgGinasio(vendidas)}
      </div>
      <div class="lg-lateral">
        <div class="lg-painel">
          <h5>Sua escolha</h5>
          <p class="lg-vazio" id="lg-vazio">Nenhuma posição marcada ainda. Toque numa chopeira ou numa mesa no layout.</p>
          <p class="lg-perdidas" id="lg-perdidas" hidden></p>
          <ul class="lg-escolhas" id="lg-escolhas"></ul>
          <div class="lg-enviar" id="lg-enviar" hidden>${botoesEnviar}</div>
          <button type="button" class="lg-limpar" id="lg-limpar" hidden>Limpar escolha</button>
          <p class="lg-aviso" id="lg-aviso"></p>
        </div>
        <div class="lg-legenda">
          <ul>
            <li><strong>Chopeiras 1 a 13:</strong> parede da esquerda, entre os dois banheiros.</li>
            <li><strong>Chopeiras 14 a 18:</strong> parede da direita, entre o palco e o bar.</li>
            <li><strong>Mesas 1 a 20:</strong> no centro, em 4 fileiras de 5. A fileira das mesas 1 a 5 é a mais perto do palco.</li>
            ${vendidas.length ? `<li><strong class="lg-legenda-vendida">VENDIDA</strong> posição que já foi vendida.</li>` : ""}
          </ul>
          <p>Esquerda e direita de quem entra no ginásio, olhando para o palco.</p>
        </div>
        ${layout.imagem ? `<a class="botao botao-secundario lg-ampliar" href="${layout.imagem}" target="_blank" rel="noopener">🔍 Ver o layout ampliado</a>` : ""}
      </div>
    </div>
    <p class="lg-status" id="lg-status" aria-live="polite"></p>
  `;
}

function layoutLer() {
  try {
    const salvo = JSON.parse(window.localStorage.getItem(LAYOUT_ARMAZENAMENTO) || "[]");
    return Array.isArray(salvo) ? salvo.filter((c) => typeof c === "string" && layoutChaveValida(c)) : [];
  } catch (erro) {
    return [];
  }
}

function layoutSalvar() {
  try {
    window.localStorage.setItem(LAYOUT_ARMAZENAMENTO, JSON.stringify(layoutEstado.escolhas));
    layoutEstado.salvaNoAparelho = true;
  } catch (erro) {
    layoutEstado.salvaNoAparelho = false;
  }
}

function layoutAtualizarPainel(chaveNova) {
  const lista = document.getElementById("lg-escolhas");
  if (!lista) return;

  const escolhas = layoutOrdenar(layoutEstado.escolhas);
  const vazio = escolhas.length === 0;
  lista.innerHTML = escolhas
    .map(
      (chave) => `
      <li class="lg-escolha${chave === chaveNova ? " lg-nova" : ""}">
        <div><strong>${layoutNome(chave)}</strong><span>${layoutPosicao(chave)}</span></div>
        <button type="button" class="lg-remover" data-chave="${chave}" aria-label="Desmarcar ${layoutNome(chave)}">×</button>
      </li>`
    )
    .join("");

  document.getElementById("lg-vazio").hidden = !vazio;
  document.getElementById("lg-limpar").hidden = vazio;
  document.getElementById("lg-enviar").hidden = vazio || !layoutEstado.vendasAbertas;

  let aviso;
  if (!layoutEstado.vendasAbertas) {
    aviso = `Marcar no layout não reserva o lugar. Na abertura das vendas, em ${LANCAMENTO_LOTES.label}, aparecem aqui os botões para enviar sua escolha pelo WhatsApp da Andréia ou da Raquel.`;
  } else if (vazio) {
    aviso = "Marque as posições que você quer para enviar sua escolha pelo WhatsApp da Andréia ou da Raquel.";
  } else {
    aviso = "Marcar no layout não reserva o lugar: envie sua escolha e combine a compra com a Andréia ou a Raquel.";
  }
  if (!vazio && layoutEstado.salvaNoAparelho) aviso += " Sua escolha fica salva neste aparelho.";
  document.getElementById("lg-aviso").textContent = aviso;

  document.querySelectorAll('.lg-item[role="button"]').forEach((g) => {
    g.setAttribute("aria-pressed", String(layoutEstado.escolhas.indexOf(g.dataset.chave) !== -1));
  });
  atualizarLinksCompra();
}

// Aviso rápido no pé da tela: no celular o painel "Sua escolha" fica abaixo do mapa.
function layoutMostrarToque(chave, marcado) {
  let toque = document.getElementById("lg-toque");
  if (!toque) {
    toque = document.createElement("div");
    toque.id = "lg-toque";
    toque.className = "lg-toque";
    toque.setAttribute("aria-hidden", "true");
    document.body.appendChild(toque);
  }
  if (marcado === "vendida") {
    toque.innerHTML = `<strong>${layoutNome(chave)}</strong> já foi vendida<span>Escolha outra posição no layout.</span>`;
  } else {
    toque.innerHTML = marcado
      ? `<strong>${layoutNome(chave)}</strong> marcada ✓<span>${layoutPosicao(chave)}</span>`
      : `<strong>${layoutNome(chave)}</strong> desmarcada`;
  }
  toque.classList.add("visivel");
  clearTimeout(layoutEstado.timerToque);
  layoutEstado.timerToque = setTimeout(() => toque.classList.remove("visivel"), 2600);
}

function layoutAlternar(chave) {
  if (!layoutChaveValida(chave) || layoutEstado.vendidas.indexOf(chave) !== -1) return;
  const posicao = layoutEstado.escolhas.indexOf(chave);
  const marcado = posicao === -1;
  if (marcado) {
    layoutEstado.escolhas.push(chave);
  } else {
    layoutEstado.escolhas.splice(posicao, 1);
  }
  layoutSalvar();
  layoutAtualizarPainel(marcado ? chave : null);
  layoutMostrarToque(chave, marcado);
  document.getElementById("lg-status").textContent = marcado
    ? `${layoutNome(chave)} marcada. ${layoutPosicao(chave)}.`
    : `${layoutNome(chave)} desmarcada.`;
}

function iniciarLayoutGinasio() {
  const mapa = document.getElementById("lg-mapa");
  if (!mapa) return;

  layoutEstado.vendidas = (mapa.dataset.vendidas || "").split(",").filter(Boolean);
  const salvas = layoutLer();
  const perdidas = salvas.filter((c) => layoutEstado.vendidas.indexOf(c) !== -1);
  layoutEstado.escolhas = salvas.filter((c) => layoutEstado.vendidas.indexOf(c) === -1);
  layoutEstado.salvaNoAparelho = salvas.length > 0;
  if (perdidas.length) {
    // A pessoa tinha marcado uma posição que, enquanto isso, foi vendida.
    layoutSalvar();
    const nomes = juntarComE(layoutOrdenar(perdidas).map(layoutNome));
    const avisoPerdidas = document.getElementById("lg-perdidas");
    avisoPerdidas.textContent =
      perdidas.length === 1
        ? `${nomes}, que você tinha marcado, já foi vendida.`
        : `${nomes}, que você tinha marcado, já foram vendidas.`;
    avisoPerdidas.hidden = false;
  }

  mapa.addEventListener("click", (e) => {
    const item = e.target.closest(".lg-item");
    if (!item) return;
    if (item.classList.contains("lg-vendida")) {
      layoutMostrarToque(item.dataset.chave, "vendida");
      document.getElementById("lg-status").textContent = `${layoutNome(item.dataset.chave)} já foi vendida.`;
      return;
    }
    layoutAlternar(item.dataset.chave);
  });
  mapa.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " " && e.key !== "Spacebar") return;
    const item = e.target.closest('.lg-item[role="button"]');
    if (!item) return;
    e.preventDefault();
    layoutAlternar(item.dataset.chave);
  });

  document.getElementById("lg-escolhas").addEventListener("click", (e) => {
    const botao = e.target.closest(".lg-remover");
    if (botao) layoutAlternar(botao.dataset.chave);
  });
  document.getElementById("lg-limpar").addEventListener("click", () => {
    layoutEstado.escolhas = [];
    layoutSalvar();
    layoutAtualizarPainel();
    document.getElementById("lg-status").textContent = "Escolha limpa.";
  });

  // Mapa estreito (celular): mostra só os números, em letra maior.
  const ajustarTamanho = () => mapa.classList.toggle("lg-compacto", mapa.clientWidth < 500);
  ajustarTamanho();
  window.addEventListener("resize", ajustarTamanho);

  layoutAtualizarPainel();
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
    const diff = alvo - Date.now();
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
  // O painel do layout passa a mostrar os botões para enviar a escolha.
  layoutEstado.vendasAbertas = true;
  layoutAtualizarPainel();
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
        ${criarBlocoLayout(evento.layoutGinasio)}
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
