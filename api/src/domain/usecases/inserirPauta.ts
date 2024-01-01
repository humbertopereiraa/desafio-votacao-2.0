import { Pauta } from "../entity/pauta"
import { PautaRepository } from "../repository/pautaRepository"

export class InserirPauta {
  constructor(private pautaRepository: PautaRepository) { }

  async execute(pauta: Pauta) {
    return this.pautaRepository.insert(pauta)
  }
}
