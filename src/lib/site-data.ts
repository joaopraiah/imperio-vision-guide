export type Store = {
  id: string;
  nome: string;
  cidade: string;
  bairro: string;
  endereco: string;
  detalhes: string;
  whatsapp: string;
  telefoneLabel: string;
  maps: string;
};

export const STORES: Store[] = [
  {
    id: "sumare",
    nome: "Unidade Sumaré",
    cidade: "Sumaré",
    bairro: "Matão",
    endereco: "Av. Emili Bosco, 586 — Matão, Sumaré/SP",
    detalhes:
      "Estacionamento em frente à loja. Ambiente amplo e familiar, acolhedor e seguro para todas as pessoas.",
    whatsapp: "https://wa.me/5519984475265",
    telefoneLabel: "(19) 98447-5265",
    maps: "https://www.google.com/maps/search/?api=1&query=Av.+Emili+Bosco,+586,+Mat%C3%A3o,+Sumar%C3%A9+SP",
  },
  {
    id: "hortolandia",
    nome: "Unidade Hortolândia",
    cidade: "Hortolândia",
    bairro: "Centro",
    endereco: "Dentro do Supermercado São Vicente — Centro, Hortolândia/SP",
    detalhes: "Ao lado da lotérica. Loja ampla e climatizada, fácil de encontrar no centro da cidade.",
    whatsapp: "https://wa.me/5519981131761",
    telefoneLabel: "(19) 98113-1761",
    maps: "https://www.google.com/maps/search/?api=1&query=Supermercado+S%C3%A3o+Vicente+Centro+Hortol%C3%A2ndia+SP",
  },
];

export const WHATSAPP_PRINCIPAL = STORES[0].whatsapp;

export const SOCIAL = {
  instagram: "https://instagram.com/oticaimperiopaulinia",
  instagramLabel: "@oticaimperiopaulinia",
  facebook: "https://facebook.com/oticaimperiopaulinia",
  facebookLabel: "/oticaimperiopaulinia",
};

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/a-otica", label: "A Ótica" },
  { to: "/experiencia", label: "Experiência" },
  { to: "/marcas", label: "Marcas" },
  { to: "/servicos", label: "Serviços" },
  { to: "/teste-de-visao", label: "Teste de visão" },
  { to: "/lojas", label: "Lojas" },
  { to: "/contato", label: "Contato" },
] as const;

export const DIFERENCIAIS = [
  {
    titulo: "Atendimento humanizado",
    texto:
      "Antes de indicar qualquer modelo, a equipe conversa sobre a sua rotina, a sua profissão, o seu estilo de vida e a sua necessidade visual. A recomendação vem depois de entender você.",
  },
  {
    titulo: "Visagismo",
    texto:
      "Orientação sobre o formato de armação que valoriza o seu rosto, as cores que conversam com o seu tom de pele e os modelos que acompanham o seu dia a dia.",
  },
  {
    titulo: "Manutenção de armações",
    texto: "Precisou reparar sua armação? Podemos ajudar. Traga a sua na loja e a equipe avalia pessoalmente.",
  },
  {
    titulo: "Responsabilidade ambiental",
    texto:
      "Estamos substituindo nossas sacolas por versões recicláveis e estudando uma iniciativa de descarte consciente de óculos antigos.",
  },
];

export const SERVICOS = [
  {
    titulo: "Manutenção de armações",
    texto:
      "Precisou reparar sua armação? Podemos ajudar. Leve a sua até uma das unidades e a equipe avalia o que é possível fazer.",
    destaque: true,
  },
  {
    titulo: "Consultoria de visagismo",
    texto:
      "Uma conversa presencial sobre formato de rosto, tom de pele, estilo pessoal e rotina, para escolher a armação certa com segurança.",
  },
  {
    titulo: "Exame de vista com hora marcada",
    texto:
      "Realizado com equipamentos modernos e profissionais capacitados. O agendamento garante atendimento sem espera.",
  },
  {
    titulo: "Orientação sobre lentes",
    texto:
      "Explicamos com clareza as opções de lentes e tratamentos disponíveis para a sua necessidade — sem jargão técnico.",
  },
  {
    titulo: "Ajustes e acompanhamento",
    texto:
      "Depois da entrega, seguimos disponíveis por WhatsApp e presencialmente para pequenos ajustes e para acompanhar a adaptação.",
  },
  {
    titulo: "Garantia de adaptação",
    texto: "Se você não se adaptar ao seu óculos, a gente resolve junto com você.",
  },
];

export const DEPOIMENTOS = [
  {
    texto:
      "Atendimento diferente do que eu estava acostumada, muita variedade de modelos e o óculos ficou pronto antes do prazo. Já é o segundo que compro aqui.",
    autor: "Cliente da unidade Sumaré",
  },
  {
    texto:
      "Depois da compra a equipe entrou em contato para saber como estava a adaptação. Sempre que precisei de um ajuste, fui atendida no WhatsApp e também na loja.",
    autor: "Cliente da unidade Hortolândia",
  },
  {
    texto:
      "Precisei com urgência: fiz o exame no mesmo dia e em dois dias o óculos estava pronto, com um preço justo.",
    autor: "Cliente da unidade Sumaré",
  },
];

export const FAQ = [
  {
    q: "Preciso agendar meu atendimento?",
    a: "Sim, recomendamos o agendamento. É assim que garantimos um atendimento rápido, com tempo dedicado a você e sem espera.",
  },
  {
    q: "O exame de vista é confiável?",
    a: "É realizado com equipamentos modernos e por profissionais capacitados. Toda a orientação sobre lentes e armações parte desse resultado.",
  },
  {
    q: "E se eu não me adaptar ao óculos?",
    a: "Existe garantia de adaptação. Se você não se adaptar, a loja resolve junto com você — esse acompanhamento faz parte do nosso atendimento.",
  },
  {
    q: "Quais são as formas de pagamento?",
    a: "Cartão de crédito em até 10x sem juros, débito, Pix, parcelamento em até 24x pela conta de luz e financiamento Brasil Card.",
  },
  {
    q: "Quais cidades vocês atendem?",
    a: "Temos lojas físicas em Sumaré e Hortolândia, e atendemos clientes de toda a região.",
  },
  {
    q: "O teste de visão online substitui o exame?",
    a: "Não. O teste online é uma ferramenta educativa e orientativa. Ele não é diagnóstico e não substitui a avaliação de um profissional na loja.",
  },
];
