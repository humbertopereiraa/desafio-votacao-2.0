import { Pauta } from "../entity/pauta"

export interface PautaRepository {
  all(): Promise<Pauta[]>
  getById(id: number): Promise<Pauta>
  getDetalhe(id: number): Promise<any>
  somenteAtivas(): Promise<Pauta[]>
  insert(pauta: Pauta): Promise<void>
  delete(id: number): Promise<void>
}
