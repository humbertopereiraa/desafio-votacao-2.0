import { logger } from "../../app"
import { Pauta } from "../../domain/entity/pauta"
import { BuscarDetalhesDePauta } from "../../domain/usecases/buscarDetalhesDePauta"
import { BuscarSomentePautasAtivas } from "../../domain/usecases/buscarSomentePautasAtivas"
import { BuscarTodasPautas } from "../../domain/usecases/buscarTodasPautas"
import { DeletarPauta } from "../../domain/usecases/deletarPauta"
import { InserirPauta } from "../../domain/usecases/inserirPauta"

export class PautaController {

  constructor(private buscarTodasPautas: BuscarTodasPautas, private buscarSomentePautasAtivas: BuscarSomentePautasAtivas,
    private inserirPauta: InserirPauta, private deletarPauta: DeletarPauta, private buscarDetalhesDePauta: BuscarDetalhesDePauta) { }

  all(_req: any): Promise<Pauta[]> {
    return new Promise<Pauta[]>(async (resolve, reject) => {
      try {
        const output = await this.buscarTodasPautas.execute()
        resolve(output)
      } catch (error: any) {
        logger.error(error?.message ? error?.message : `Erro no método all na PautaController : ${JSON.stringify(error)}`)
        reject(error)
      }
    })
  }

  somentePautasAtivas(_req: any): Promise<Pauta[]> {
    return new Promise<Pauta[]>(async (resolve, reject) => {
      try {
        const output = await this.buscarSomentePautasAtivas.execute()
        resolve(output)
      } catch (error: any) {
        logger.error(error?.message ? error?.message : `Erro no método somentePautasAtivas na PautaController : ${JSON.stringify(error)}`)
        reject(error)
      }
    })
  }

  getDetalhes(req: any): Promise<Pauta[]> {
    return new Promise<Pauta[]>(async (resolve, reject) => {
      try {
        const { id } = req.query
        const output = await this.buscarDetalhesDePauta.execute(id)
        resolve(output)
      } catch (error: any) {
        logger.error(error?.message ? error?.message : `Erro no método getDetalhes na PautaController : ${JSON.stringify(error)}`)
        reject(error)
      }
    })
  }

  inserir(req: any): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const { descricao, categoria, tempoSessao } = req.body
        const newPauta = new Pauta(null, descricao, categoria, tempoSessao)
        const output = await this.inserirPauta.execute(newPauta)
        resolve(output)
        logger.info(`Pauta inserida com sucesso: ${JSON.stringify(output)}`)
      } catch (error: any) {
        logger.error(error?.message ? error?.message : `Erro no método inserir na PautaController : ${JSON.stringify(error)}`)
        reject(error)
      }
    })
  }

  deletar(req: any): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const { id } = req.query
        await this.deletarPauta.execute(id)
        resolve()
      } catch (error: any) {
        logger.error(error?.message ? error?.message : `Erro no método deletar na PautaController : ${JSON.stringify(error)}`)
        reject(error)
      }
    })
  }
}
