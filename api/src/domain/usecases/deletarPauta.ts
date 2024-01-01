import { PautaRepository } from "../repository/pautaRepository"

export class DeletarPauta {
  constructor(private pautaRepository: PautaRepository) { }

  async execute(id: number) {
    return this.pautaRepository.delete(id)
  }
}
