import lojaSumare from "@/assets/loja-sumare.jpg";
import lojaHortolandia from "@/assets/loja-hortolandia.jpg";

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
  foto: string;
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
    foto: lojaSumare,
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
    foto: lojaHortolandia,
  },
];

export const WHATSAPP_PRINCIPAL = "https://wa.me/5519984475265";

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

export const GOOGLE_RATING = {
  nota: 5.0,
  total: 119,
};

export const DEPOIMENTOS = [
  {
    texto: "Ótimo preço, fui muito bem atendido. Nota 10!",
    autor: "Claudinei Santos",
    nota: 5,
  },
  {
    texto: "Ótimo atendimento, preço excelente e produto de qualidade.",
    autor: "Juscelino Soares",
    nota: 5,
  },
  {
    texto: "Muito boa, fui muito bem atendida e foram super educados.",
    autor: "Andressa Costa",
    nota: 5,
  },
  {
    texto: "Atendente um amor, produto de qualidade e fácil acessibilidade de compra. Amei!!",
    autor: "Juliane Paixão",
    nota: 5,
  },
  {
    texto: "Amei o atendimento, a Fabiana foi muito atenciosa e educada!",
    autor: "Leonardo Tiago",
    nota: 5,
  },
  {
    texto: "Ótimo atendimento, melhor da região. Super indico!",
    autor: "Orlando Pinto Silva",
    nota: 5,
  },
  {
    texto: "Ótimo atendimento, eu super recomendo.",
    autor: "Antonio Vanderli Silva",
    nota: 5,
  },
  {
    texto: "Excelente atendimento e agilidade na entrega! Super recomendo, nota 10.",
    autor: "Lara Carl",
    nota: 5,
  },
  {
    texto:
      "Pessoal muito prestativo, preço justo, várias opções de pagamento e muita qualidade no material oferecido. Recomendo e parabéns pela ótica!",
    autor: "Rogério Borges",
    nota: 5,
  },
];

export type MarcaExclusiva = {
  id: string;
  nome: string;
  genero: "Masculina" | "Feminina";
  assinatura: string;
  texto: string;
  tone: "dark" | "light";
};

export const MARCAS_EXCLUSIVAS: MarcaExclusiva[] = [
  {
    id: "volpes",
    nome: "Volpes",
    genero: "Masculina",
    assinatura: "V",
    texto:
      "O nome carrega uma sonoridade europeia, densa e inteligente. Não é um nome que tenta impressionar, é um nome que resiste ao tempo, como um homem que construiu algo de verdade. Volpes existe para um homem que já provou seu valor no trabalho, na família e na comunidade.",
    tone: "dark",
  },
  {
    id: "celinne",
    nome: "Celinne",
    genero: "Feminina",
    assinatura: "C",
    // TODO: texto provisório — substituir quando o material completo da Celinne chegar.
    texto:
      "Um nome que não precisa se explicar. Celinne é para a mulher segura da própria presença — discreta, precisa, atemporal. A força não está em chamar atenção, está em ficar.",
    tone: "light",
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
