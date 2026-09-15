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

// Lançamento oficial dos lotes de ingressos e combos com barril de chopp.
const LANCAMENTO_LOTES = {
  dataIso: "2026-10-10T08:00:00-03:00",
  label: "10 de outubro às 8h",
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
    emBreve: false,
    ocultarContato: false,
    intro:
      "Prepare o colete e o bom humor: a Comunidade Nova Ramada – Sede abre o pátio para uma noite inteira de credenciamento com happy hour, duas bandas ao vivo, chopp gelado, petiscos gourmet e a tradicional hospitalidade alemã que atravessa gerações na nossa colônia.",
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
        descricao: "Madrugada adentro com a Flor da Serra fechando a noite com chave de oro.",
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
        descricao: "Grande variedade de petiscos gourmet liberados desde o happy hour até o fim da festa.",
        imagem: "assets/eventos/petiscos-baile.jpg",
      },
      {
        icone: "acampamento",
        titulo: "Pátio para Acampar",
        descricao: "Depois do baile, monte sua barraca no pátio da comunidade e descanse tranquilo até o amanhecer.",
        imagem: "assets/eventos/acampamento-baile.jpg",
      },
      {
        icone: "estacionamento",
        titulo: "Estacionamento no Local",
        descricao: "Vaga garantida no pátio da comunidade por R$ 10,00 por carro.",
      },
      {
        icone: "copo",
        titulo: "Copo Personalizado",
        descricao: "Os primeiros ingressos antecipados garantem um copo de chopp personalizado do evento, com alça.",
      },
    ],
    lancamentoLotes: LANCAMENTO_LOTES,
    valores: [],
    observacao: "",
    mensagemWhatsapp:
      "Olá Andréia! Vim pelo site da Nova Ramada e quero saber mais sobre o Tradicional Baile do Chopp (12/12).",
    patrocinadores: [PATROCINADORES.tvqc, PATROCINADORES.impulseViral, PATROCINADORES.estanciaMarmoreio],
  },
];
