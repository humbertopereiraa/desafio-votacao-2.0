import { InserirVotacao } from "../../domain/usecases/inserirVotacao"
import { Conexao } from "../../infra/database/conexao"
import { PautaRepositoryImp } from "../../infra/repository/pautaRepositoryImp"
import { VotacaoRepositoryImp } from "../../infra/repository/votacaoRepositoryImp"
import { VotacaoController } from "../controller/votacaoController"


export class VotacaoControllerFactory {

  constructor(private conexao: Conexao) { }

  criarController(): VotacaoController {
    const votacaoRepository = new VotacaoRepositoryImp(this.conexao)
    const pautaRepository = new PautaRepositoryImp(this.conexao)
    const inserirVotacao = new InserirVotacao(votacaoRepository)
    return new VotacaoController(inserirVotacao, pautaRepository)
  }
}
