import { Usuario } from "../../domain/entity/usuario"
import { BuscarTodosUsuarios } from "../../domain/usecases/buscarTodosUsuario"
import { DeletarUsuario } from "../../domain/usecases/deletarUsuario"
import { InserirUsuario } from "../../domain/usecases/inserirUsuario"
import { Encrypter } from "../../utils/encrypter"

export class UsuarioController {

  constructor(private buscarTodosUsuario: BuscarTodosUsuarios, private inserirUsuario: InserirUsuario, private deletarUsuario: DeletarUsuario) { }

  all(_req: any): Promise<Usuario[]> {
    return new Promise<Usuario[]>(async (resolve, reject) => {
      try {
        const output = await this.buscarTodosUsuario.execute()
        resolve(output)
      } catch (error) {
        reject(error)
      }
    })
  }

  inserir(req: any): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const { nome, login, senha, tipo, cpf } = req.body
        const encrypter = new Encrypter()
        const encryptedPassword = encrypter.encryptPassword(senha)
        const newUser = new Usuario(null, nome, login, encryptedPassword, tipo, cpf)
        const output = await this.inserirUsuario.execute(newUser)
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
        await this.deletarUsuario.execute(id)
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }
}
