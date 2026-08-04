function waLink(mensagem) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;
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
    <article class="card-destaque">
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

  document.getElementById("destaque-container").innerHTML = criarCardDestaque(destaque);
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
  document.getElementById("whatsapp-rodape").href = waLink(mensagem);
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
  renderizarEventos();
  montarLinksLocalizacao();
  montarWhatsappFlutuante();
  montarRedesSociais();
  montarMenuMobile();
  document.getElementById("ano-atual").textContent = new Date().getFullYear();
  parseFacebookPagePlugin();
});
