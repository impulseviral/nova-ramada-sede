// Agenda de eventos da Comunidade Nova Ramada – Sede.
// Para adicionar/editar um evento, basta adicionar um novo objeto neste array.
// Datas no formato "YYYY-MM-DD" para ordenação correta.

// Únicos contatos oficiais da organização. Os mesmos números aparecem
// escritos na seção "Evite golpes" do index.html — mudar nos dois lugares.
const CONTATOS_OFICIAIS = [
  { nome: "Andréia", whatsapp: "5551995882473" },
  { nome: "Raquel", whatsapp: "5551995006210" },
];

const WHATSAPP_NUMBER = CONTATOS_OFICIAIS[0].whatsapp; // Andréia: contato padrão dos botões
const LOCAL = {
  nome: "Comunidade Nova Ramada – Sede",
  cidade: "Júlio de Castilhos – RS",
  lat: -29.2512088,
  lng: -53.4981206,
};

// Redes sociais oficiais da comunidade.
const REDES_SOCIAIS = {
  facebook: "https://www.facebook.com/novaramadasede",
  instagram: "https://www.instagram.com/comunidadenovaramadasede",
};

// Cadastro central dos apoiadores/patrocinadores — edite aqui e o link/logo
// atualiza em todos os eventos que usam esse apoiador.
// "link" é opcional: pode ser o site, o Instagram ou o Facebook do apoiador.
const PATROCINADORES = {
  divisao: {
    nome: "Divisão Supermercado",
    logo: "assets/patrocinadores/PHOTO-2026-07-21-13-54-40.jpg",
    link: "https://www.facebook.com/p/Supermercado-Divis%C3%A3o-100054930985772/?locale=pt_BR",
  },
  tvqc: {
    nome: "TVQC",
    logo: "assets/patrocinadores/tv4-qc.png",
    link: "https://www.instagram.com/tvquartacolonia",
  },
  impulseViral: {
    nome: "Impulse Viral",
    logo: "assets/patrocinadores/impulse-viral.png",
    link: "https://www.instagram.com/impulseviral",
  },
  estanciaMarmoreio: {
    nome: "Estância Marmoreio",
    logo: "assets/patrocinadores/estancia-marmoreio.png",
    link: "https://www.instagram.com/estanciamarmoreio",
  },
  stefanello: {
    nome: "Stefanello",
    logo: "assets/patrocinadores/stefanello.png",
    link: "https://www.instagram.com/rodriivann",
  },
};

// Lançamento oficial dos lotes de ingressos e combos com barril de chopp.
// A venda é pelo WhatsApp dos contatos oficiais; quando a contagem zera,
// o site troca sozinho para "Lotes à venda!" com os botões de compra.
const LANCAMENTO_LOTES = {
  // A mesma data está em netlify/functions/reservas/logica.mjs (LANCAMENTO): mude nos dois.
  dataIso: "2026-11-10T08:00:00-03:00",
  label: "10 de novembro às 8h",
  mensagemCompra: "Vim pelo site da Nova Ramada e quero garantir meu ingresso para o Tradicional Baile do Chopp (12/12).",
};

const EVENTS = [
  {
    id: "baile-do-chopp-2026-12-12",
    data: "2026-12-12",
    dataLabel: "12 de Dezembro · Sábado",
    titulo: "Tradicional Baile do Chopp",
    subtitulo: "Uma noite de festa alemã, chopp gelado e música até o amanhecer",
    destaque: true,
    tema: "chopp",
    logo: "assets/eventos/logo-baile-do-chopp.png",
    emBreve: false,
    ocultarContato: false,
    intro:
      "Separe o colete e o bom humor: a Comunidade Nova Ramada – Sede organiza uma noite inteira de festa, com happy hour, duas bandas ao vivo, chopp gelado, petiscos gourmet e a tradicional hospitalidade alemã que atravessa gerações na nossa colônia.",
    programacao: [
      {
        horario: "18h",
        titulo: "Credenciamento & Happy Hour",
        descricao: "Abertura dos portões, retirada de ingressos e primeiras rodadas de chopp e petiscos.",
      },
      {
        horario: "20h às 00h",
        titulo: "Banda Os 5 Fritz",
        descricao: "A pista esquenta com o repertório animado da banda Os 5 Fritz.",
      },
      {
        horario: "00h às 4h",
        titulo: "Banda Flor da Serra",
        descricao: "Madrugada adentro com a Flor da Serra fechando a noite com chave de ouro.",
      },
    ],
    destaquesEvento: [
      {
        icone: "chopp",
        titulo: "Chopp & Bar de Drinks",
        descricao: "Chopp e cerveja gelados a noite toda, bar com drinks especiais e todas as bebidas tradicionais.",
        imagem: "assets/eventos/chopp-baile.jpg",
      },
      {
        icone: "petiscos",
        titulo: "Petiscos Gourmet",
        descricao: "Grande variedade de petiscos gourmet desde o happy hour e durante todo o baile.",
        imagem: "assets/eventos/petiscos-baile.jpg",
      },
      {
        icone: "copo",
        titulo: "Copo de Brinde",
        descricao: "Os primeiros a garantir o ingresso ganham o copo personalizado do Baile do Chopp, com alça.",
        imagem: "assets/eventos/copo-brinde.jpg",
        imagemAlt: "Copo preto do Baile do Chopp com a logo da Comunidade Ramada Sede e alça de cordão preto, vermelho e amarelo",
        posicaoImagem: "center 14%",
      },
    ],
    chopps: {
      intro: "Qualidade, sabor e toda a tradição da Imigração Express Santa Maria para deixar essa noite ainda mais especial.",
      cartaz: "assets/eventos/cartaz-chopps.jpg",
      cartazAlt: "Cartaz oficial dos chopps do Baile do Chopp: Imigração Pilsen e Roleta Russa Pilsen Extrema, Easy IPA e IPA",
      opcoes: [
        { marca: "Imigração", estilo: "Pilsen", cor: "#f2b632" },
        { marca: "Roleta Russa", estilo: "Pilsen Extrema", cor: "#d9732a" },
        { marca: "Roleta Russa", estilo: "Easy IPA", cor: "#eba12a" },
        { marca: "Roleta Russa", estilo: "IPA", cor: "#9e2f25" },
      ],
      barril: "Você pode escolher o tipo de chopp e comprar um barril exclusivo para o seu grupo, de 50 ou 30 litros — ideal para amigos, família e empresas. Garanta o seu e brinde essa noite especial!",
      tamanhosBarril: ["50 litros", "30 litros"],
    },
    // Tabela de preços enviada pela organização em 09/11/2026. Fica escondida e
    // aparece sozinha na abertura das vendas (LANCAMENTO_LOTES), junto com os
    // botões de compra. Situação do lote: "a-venda" ou "em-breve".
    tabelaPrecos: {
      lotesTitulo: "Ingressos liberados por lote",
      lotes: [
        { nome: "Lote 1", detalhe: "Promocional antecipado · poucas unidades", valor: "R$ 55,00", situacao: "a-venda" },
        { nome: "Lote 2", detalhe: "Antecipado · ainda não liberado", valor: "R$ 65,00", situacao: "em-breve" },
        { nome: "Lote 3", detalhe: "Na hora você vai pagar mais caro.", chamada: "Faça sua reserva agora mesmo.", situacao: "em-breve" },
      ],
      barrisTitulo: "Barris de chopp",
      barrilInclui: ["Mesa com chopeira", "4 cadeiras", "1 ingresso", "Copo temático do baile"],
      barris: [
        {
          marca: "Imigração Pilsen",
          itens: [
            { nome: "30 litros", valor: "R$ 1.000,00", cor: "#f2b632" },
            { nome: "50 litros", valor: "R$ 1.500,00", cor: "#f2b632" },
          ],
        },
        {
          marca: "Roleta Russa",
          itens: [
            { nome: "Pilsen Extrema · 50 litros", valor: "R$ 1.500,00", cor: "#d9732a" },
            { nome: "Easy IPA · 50 litros", valor: "R$ 1.700,00", cor: "#eba12a" },
            { nome: "IPA · 50 litros", valor: "R$ 1.900,00", cor: "#9e2f25" },
          ],
        },
      ],
      nota: "Os primeiros a realizarem sua reserva vão receber um copo temático do Baile do Chopp com tira.",
    },
    // Layout do ginásio enviado pela organização em 05/11/2026: chopeiras 1 a 13
    // na parede da esquerda, 14 a 18 na da direita e mesas 1 a 20 no centro.
    // Posições vendidas ganham a inscrição "VENDIDA" e não podem mais ser marcadas.
    layoutGinasio: {
      imagem: "assets/eventos/layout-ginasio.png",
      // Planilha do Google em que a organização marca as vendidas (1ª aba,
      // coluna Situação = VENDIDA). O site lê ao abrir e a cada 45 segundos.
      // Ela precisa estar compartilhada como "Qualquer pessoa com o link: Leitor";
      // se não estiver ou cair, o site usa só as listas abaixo.
      // O mesmo ID está em netlify/functions/reservas/reservas.mjs (PLANILHA): mude nos dois.
      planilhaVendidas: "1vVGZm6JphK1Rw7S7OWOKkM9AJ9gxXFhMwGCIyHpaqXE",
      // Reserva: vendidas escritas direto aqui (somam com a planilha),
      // ex.: chopeirasVendidas: [13], mesasVendidas: [5, 6].
      chopeirasVendidas: [],
      mesasVendidas: [],
    },
    lancamentoLotes: LANCAMENTO_LOTES,
    valores: [],
    observacao: "",
    mensagemWhatsapp:
      "Olá Andréia! Vim pelo site da Nova Ramada e quero saber mais sobre o Tradicional Baile do Chopp (12/12).",
    patrocinadores: [PATROCINADORES.tvqc, PATROCINADORES.impulseViral, PATROCINADORES.estanciaMarmoreio],
  },
];
