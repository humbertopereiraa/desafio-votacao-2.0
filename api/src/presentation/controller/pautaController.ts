import { Pauta } from "../../domain/entity/pauta"
import { BuscarSomentePautasAtivas } from "../../domain/usecases/buscarSomentePautasAtivas"
import { BuscarTodasPautas } from "../../domain/usecases/buscarTodasPautas"
import { DeletarPauta } from "../../domain/usecases/deletarPauta"
import { InserirPauta } from "../../domain/usecases/inserirPauta"

export class PautaController {

  constructor(private buscarTodasPautas: BuscarTodasPautas, private buscarSomentePautasAtivas: BuscarSomentePautasAtivas,
    private inserirPauta: InserirPauta, private deletarPauta: DeletarPauta) { }

  all(_req: any): Promise<Pauta[]> {
    return new Promise<Pauta[]>(async (resolve, reject) => {
      try {
        const output = await this.buscarTodasPautas.execute()
        resolve(output)
      } catch (error) {
        reject(error)
      }
    })
  }

  somentePautasAtivas(_req: any): Promise<Pauta[]> {
    return new Promise<Pauta[]>(async (resolve, reject) => {
      try {
        const output = await this.buscarSomentePautasAtivas.execute()
        resolve(output)
      } catch (error) {
        reject(error)
      }
    })
  }

  inserir(req: any): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const { descricao, tempoSessao } = req.body
        const newPauta = new Pauta(descricao, tempoSessao)
        const output = await this.inserirPauta.execute(newPauta)
        resolve(output)
      } catch (error) {
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
      } catch (error) {
        reject(error)
      }
    })
  }
}
