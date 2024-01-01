import { Pauta } from "../entity/pauta"

export interface PautaRepository {
  all(): Promise<Pauta[]>
  somenteAtivas(): Promise<Pauta[]> 
  insert(pauta: Pauta): Promise<void>
  delete(id: number): Promise<void>
}
