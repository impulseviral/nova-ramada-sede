// Agenda de eventos da Comunidade Nova Ramada – Sede.
// Para adicionar/editar um evento, basta adicionar um novo objeto neste array.
// Datas no formato "YYYY-MM-DD" para ordenação correta.

const WHATSAPP_NUMBER = "5551995882473"; // Andréia
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
    logo: "assets/patrocinadores/estancia-marmoreio.svg",
    link: "https://www.instagram.com/estanciamarmoreio",
  },
  stefanello: {
    nome: "Stefanello",
    logo: "assets/patrocinadores/stefanello.png",
    link: "https://www.instagram.com/rodriivann",
  },
};

const EVENTS = [
  {
    id: "festival-massas-2026-08-09",
    data: "2026-08-09",
    dataLabel: "09 de Agosto · Domingo",
    titulo: "1º Festival de Massas Artesanais da Região",
    subtitulo: "Especial de Dia dos Pais",
    destaque: true,
    intro:
      "Um almoço especial, uma tarde de música e a melhor companhia: sua família. A Comunidade Nova Ramada – Sede celebra o Dia dos Pais ao redor da mesa, com comida boa, conversa e muita alegria.",
    atracoes: ["Musical Bom de Baile (Domingueira)"],
    cardapio: [
      "Galeto",
      "Maionese",
      "Molho de galinha",
      "Strogonoff",
      "Molho branco",
      "Quatro queijos",
      "Bolonhesa",
      "Molho de legumes",
      "Bacon com calabresa",
      "Molho carbonara",
      "Molho pesto",
      "Queijo ralado",
      "Espaguete",
      "Tortei",
    ],
    valores: [
      { label: "Almoço + Domingueira", preco: "R$ 50,00" },
      { label: "Somente Domingueira", preco: "R$ 30,00" },
    ],
    observacao: "Garanta seu ingresso antecipado! Pois eles vão sumir rapidamente!",
    mensagemWhatsapp:
      "Olá Andréia! Vim pelo site da Nova Ramada e quero garantir meu ingresso para o 1º Festival de Massas Artesanais (09/08).",
    // Para adicionar um apoiador deste evento, referencie uma chave de PATROCINADORES
    // (definida no topo deste arquivo) ou crie um objeto novo no mesmo formato.
    patrocinadores: [PATROCINADORES.divisao, PATROCINADORES.tvqc, PATROCINADORES.impulseViral, PATROCINADORES.estanciaMarmoreio, PATROCINADORES.stefanello],
  },
  {
    id: "baile-do-chopp-2026-12-12",
    data: "2026-12-12",
    dataLabel: "12 de Dezembro · Sábado",
    titulo: "Tradicional Baile do Chopp",
    subtitulo: "",
    destaque: false,
    emBreve: true,
    ocultarContato: true,
    intro:
      "O Clássico da comunidade estará de volta totalmente reformulado. Haverá atrações, cardápio e competições inéditas, diferente de tudo que você já viu. Em breve traremos mais informações.",
    atracoes: [],
    cardapio: [],
    valores: [],
    observacao: "",
    mensagemWhatsapp:
      "Olá Andréia! Vim pelo site da Nova Ramada e quero saber mais sobre o Tradicional Baile do Chopp (12/12).",
    patrocinadores: [PATROCINADORES.tvqc, PATROCINADORES.impulseViral, PATROCINADORES.estanciaMarmoreio],
  },
];
