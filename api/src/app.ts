import { Configuracao } from "./configuracao"
import { SqliteDB } from "./infra/database/sqliteDB"
import { ExpressAdapter } from "./infra/http/expressAdapter"
import HTTP from "./infra/http/http"
import { AuthController } from "./presentation/controller/authController"
import { AuthControllerFactory } from "./presentation/factories/authControllerFactory"

export interface IServidor {
  app: HTTP
  authController: AuthController,
}

export const conexao = new SqliteDB()
const authControllerFactory = new AuthControllerFactory(conexao, Configuracao.token.chave as string)

export const servidor: IServidor = {
  app: new ExpressAdapter(),
  authController: authControllerFactory.criarAuthController()
}