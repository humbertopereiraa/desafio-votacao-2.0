import { PautaRepository } from "../repository/pautaRepository"

export class BuscarTodasPautas {
  constructor(private pautaRepository: PautaRepository) { }

  async execute() {
    const pautas = await this.pautaRepository.all()
    return pautas
  }
}
