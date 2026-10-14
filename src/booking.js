export function createBookingMessage({
  name,
  area,
  procedure,
  date,
  period,
  observations,
}) {
  const [year, month, day] = date.split("-");
  return [
    "Olá! Quero consultar a disponibilidade para um atendimento no Gap Studio Hair.",
    "",
    `Nome: ${name.trim()}`,
    `Área: ${area}`,
    `Procedimento: ${procedure.trim()}`,
    `Dia de preferência: ${day}/${month}/${year}`,
    `Período de preferência: ${period}`,
    ...(observations.trim() ? [`Observações: ${observations.trim()}`] : []),
    "",
    "Se houver disponibilidade, gostaria de agendar. Aguardo a confirmação da equipe.",
  ].join("\n");
}
