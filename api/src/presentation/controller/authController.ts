import { logger } from "../../app"
import { Usuario } from "../../domain/entity/usuario"
import { Autenticacao } from "../../domain/usecases/autenticacao"
import { UNAUTHORIZED } from "../../utils/error"

export class AuthController {
  constructor(private autenticacao: Autenticacao) { }

  auth(req: any): Promise<Usuario | string> {
    return new Promise<Usuario | string>(async (resolve, reject) => {
      try {
        const { login, senha } = req.body
        const usuario = await this.autenticacao.execute(login, senha)
        if (!usuario) {
          throw { code: UNAUTHORIZED, msg: 'Login ou senha inválidos!' }
        }
        usuario.senha = ''
        resolve(usuario)
      } catch (error: any) {
        logger.error(error?.message ? error?.message : `Erro na autenticação: ${JSON.stringify(error)}`)
        reject(error)
      }
    })
  }
}
