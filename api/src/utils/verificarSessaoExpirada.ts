/**Função para verificar se um sessão de Pauta expirou
 * @description Se a Data da criação da Pauta mais(+) Tempo da Sessão for menor(<) que a Data atual, a sessão expirou
 */
export function sessaoExpirou(dataDaPauta: Date | number, tempoSessao: number) {
  const dataDaCriacao = new Date(dataDaPauta)
  const novaData = new Date(dataDaCriacao.getTime() + tempoSessao * 60000)
  const dataAtual = new Date()
  return novaData.valueOf() < dataAtual.valueOf()
} 