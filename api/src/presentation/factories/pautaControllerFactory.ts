
import { BuscarDetalhesDePauta } from "../../domain/usecases/buscarDetalhesDePauta"
import { BuscarSomentePautasAtivas } from "../../domain/usecases/buscarSomentePautasAtivas"
import { BuscarTodasPautas } from "../../domain/usecases/buscarTodasPautas"
import { DeletarPauta } from "../../domain/usecases/deletarPauta"
import { InserirPauta } from "../../domain/usecases/inserirPauta"
import { Conexao } from "../../infra/database/conexao"
import { PautaRepositoryImp } from "../../infra/repository/pautaRepositoryImp"
import { PautaController } from "../controller/pautaController"

export class PautaControllerFactory {

  constructor(private conexao: Conexao) { }

  criarController(): PautaController {
    const pautaRepository = new PautaRepositoryImp(this.conexao)
    const buscarTodasPautas = new BuscarTodasPautas(pautaRepository)
    const buscarSomentePautasAtivas = new BuscarSomentePautasAtivas(pautaRepository)
    const inserirPauta = new InserirPauta(pautaRepository)
    const deletarPauta = new DeletarPauta(pautaRepository)
    const buscarDetalhesDePautaPauta = new BuscarDetalhesDePauta(pautaRepository)
    return new PautaController(buscarTodasPautas, buscarSomentePautasAtivas, inserirPauta, deletarPauta, buscarDetalhesDePautaPauta)
  }
}
