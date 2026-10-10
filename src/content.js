// shortcut: catálogo limitado ao que foi confirmado, ampliar após validação direta do salão.
export const services = {
  cabelos: {
    title: "CABELOS",
    description:
      "Um cuidado que acompanha seu estilo. Converse com a equipe sobre o que você deseja para seus fios.",
    items: ["Cortes de cabelo", "Tratamentos capilares"],
    note: "Converse com a equipe sobre técnicas, produtos, valores e disponibilidade para o seu atendimento.",
  },
  sobrancelhas: {
    title: "SOBRANCELHAS",
    description:
      "Cuidado com o olhar, respeitando a sua expressão. Conheça as opções de atendimento diretamente com o salão.",
    items: ["Atendimento para sobrancelhas"],
    note: "Converse com a equipe para conhecer as técnicas disponíveis e escolher seu atendimento.",
  },
  unhas: {
    title: "UNHAS",
    description: "Mãos e pés também fazem parte do seu momento de cuidado.",
    items: ["Manicure — cuidado com as mãos", "Pedicure — cuidado com os pés"],
    note: "Consulte as opções de atendimento para mãos e pés, valores e disponibilidade com a equipe.",
  },
};
export const results = [
  {
    image: "hair",
    title: "Cabelos & expressão",
    alt: "Cabelos ondulados em tom castanho",
  },
  {
    image: "brows",
    title: "O detalhe do olhar",
    alt: "Sobrancelhas naturalmente definidas",
  },
  {
    image: "manicure",
    title: "Manicure & delicadeza",
    alt: "Manicure em tom nude",
  },
  {
    image: "pedicure",
    title: "Pedicure & cuidado",
    alt: "Pedicure em tom nude",
  },
];
export function cycleIndex(index, direction, length) {
  return (index + direction + length) % length;
}
