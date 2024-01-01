import { Configuracao } from "./configuracao"
import { SqliteDB } from "./infra/database/sqliteDB"
import { ExpressAdapter } from "./infra/http/expressAdapter"
import HTTP from "./infra/http/http"
import { AuthController } from "./presentation/controller/authController"
import { PautaController } from "./presentation/controller/pautaController"
import { AuthControllerFactory } from "./presentation/factories/authControllerFactory"
import { PautaControllerFactory } from "./presentation/factories/pautaControllerFactory"

export interface IServidor {
  app: HTTP
  authController: AuthController,
  pautaController: PautaController
}

export const conexao = new SqliteDB()
const authControllerFactory = new AuthControllerFactory(conexao, Configuracao.token.chave as string)
const pautaControllerFactory = new PautaControllerFactory(conexao)

export const servidor: IServidor = {
  app: new ExpressAdapter(),
  authController: authControllerFactory.criarAuthController(),
  pautaController: pautaControllerFactory.criarAuthController()
}