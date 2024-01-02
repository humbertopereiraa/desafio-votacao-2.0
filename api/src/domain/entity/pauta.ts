import { sessaoExpirou } from "../../utils/verificarSessaoExpirada"

export class Pauta {
  id: number | null
  descricao: string
  categoria: string
  tempoSessao: number
  data: Date

  constructor(id: number | null, descricao: string, categoria: string, tempoSessao: number, data?: Date) {
    this.id = id ?? null
    this.descricao = descricao
    this.categoria = categoria
    this.tempoSessao = tempoSessao
    this.data = data ?? new Date()
  }

  public sessaoExpirou(): boolean {
    return sessaoExpirou(this.data, this.tempoSessao)
  }
}
