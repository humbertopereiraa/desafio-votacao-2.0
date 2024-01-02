import { Votacao } from "../entity/votacao";
import { VotacaoRepository } from "../repository/votacaoRepository"

export class InserirVotacao {

  constructor(private votacaoRepository: VotacaoRepository) { }

  execute(votacao: Votacao): any {
    return this.votacaoRepository.insert(votacao)
  }
}
