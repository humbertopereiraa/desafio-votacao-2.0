import { Configuracao } from "./configuracao"
import { SqliteDB } from "./infra/database/sqliteDB"
import { ExpressAdapter } from "./infra/http/expressAdapter"
import HTTP from "./infra/http/http"
import { Logger } from "./logs/logger"
import { WinstonLoggerAdapter } from "./logs/winstonLogAdapter"
import { AuthController } from "./presentation/controller/authController"
import { PautaController } from "./presentation/controller/pautaController"
import { UsuarioController } from "./presentation/controller/usuarioController"
import { VotacaoController } from "./presentation/controller/votacaoController"
import { AuthControllerFactory } from "./presentation/factories/authControllerFactory"
import { PautaControllerFactory } from "./presentation/factories/pautaControllerFactory"
import { UsuarioControllerFactory } from "./presentation/factories/usuarioControllerFactory"
import { VotacaoControllerFactory } from "./presentation/factories/votacaoControllerFactory"

export const logger: Logger = new WinstonLoggerAdapter()

export interface IServidor {
  app: HTTP
  authController: AuthController,
  pautaController: PautaController,
  votacaoController: VotacaoController,
  usuarioController: UsuarioController
}

export const conexao = new SqliteDB()
const authControllerFactory = new AuthControllerFactory(conexao, Configuracao.token.chave as string)
const pautaControllerFactory = new PautaControllerFactory(conexao)
const votacaoControllerFactory = new VotacaoControllerFactory(conexao)
const usuarioControllerFactory = new UsuarioControllerFactory(conexao)

export const servidor: IServidor = {
  app: new ExpressAdapter(),
  authController: authControllerFactory.criarController(),
  pautaController: pautaControllerFactory.criarController(),
  votacaoController: votacaoControllerFactory.criarController(),
  usuarioController: usuarioControllerFactory.criarController()
}