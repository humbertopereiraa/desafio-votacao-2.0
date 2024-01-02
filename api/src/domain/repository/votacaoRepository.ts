import { Votacao } from "../entity/votacao"

export interface VotacaoRepository {
  getByPauta(id_pauta: number): Promise<any>
  insert(votacao: Votacao): Promise<void>
}
