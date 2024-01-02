import { PautaRepository } from "../repository/pautaRepository"

export class BuscarDetalhesDePauta {

  constructor(private pautaRepository: PautaRepository) { }

  async execute(id: number): Promise<any> {
    return this.pautaRepository.getDetalhe(id)
  }
}
