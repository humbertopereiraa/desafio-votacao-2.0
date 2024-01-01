import { PautaRepository } from "../repository/pautaRepository"

export class BuscarSomentePautasAtivas {
  constructor(private pautaRepository: PautaRepository) { }

  async execute() {
    const pautas = await this.pautaRepository.somenteAtivas()
    return pautas
  }
}
