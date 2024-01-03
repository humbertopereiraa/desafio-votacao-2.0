export class CpfErro extends Error {

  constructor(mensagem: string) {
    super(mensagem)
    this.name = 'CpfErro'
  }
}
