import { Pauta } from "../../domain/entity/pauta"
import { Votacao } from "../../domain/entity/votacao"
import { PautaRepository } from "../../domain/repository/pautaRepository"
import { InserirVotacao } from "../../domain/usecases/inserirVotacao"

export class VotacaoController {

  constructor(private inserirVotacao: InserirVotacao, private pautaRepository: PautaRepository) { }

  inserir(req: any): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const { id_pauta, id_usuario, voto } = req.body
        const pauta = await this.pautaRepository.getById(id_pauta)
        const newPauta = new Pauta(typeof pauta?.id === 'string' ? parseInt(pauta?.id as any) : pauta?.id, pauta?.descricao, pauta?.categoria, pauta?.tempoSessao, pauta?.data)
        const newVotacao = new Votacao(newPauta, typeof id_usuario === 'string' ? parseInt(id_usuario as any) : id_usuario, voto)
        await this.inserirVotacao.execute(newVotacao)
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

}
