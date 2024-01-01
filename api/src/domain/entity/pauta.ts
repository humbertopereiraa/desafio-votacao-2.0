export class Pauta {
  id: number | null
  descricao: string
  tempoSessao: number
  data: Date

  constructor(descricao: string, tempoSessao: number) {
    this.id = null
    this.descricao = descricao
    this.tempoSessao = tempoSessao
    this.data = new Date()
  }
}
