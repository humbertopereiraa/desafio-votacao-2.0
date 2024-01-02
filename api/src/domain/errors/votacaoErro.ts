export class VotacaoErro extends Error {

  constructor(mensagem: string) {
    super(mensagem)
    this.name = 'VotacaoErro'
  }
}
