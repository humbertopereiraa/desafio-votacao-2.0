import { Encrypter } from "../../utils/encrypter"
import { Token } from "../../utils/token"
import { Usuario } from "../entity/usuario"
import { UsuarioRepository } from "../repository/usuarioRepository"

export class Autenticacao {
  constructor(private tokenProvider: Token, private usuarioRepositoryImp: UsuarioRepository, private encrypter: Encrypter, private chave: string) { }

  async execute(login: string, senha: string): Promise<Usuario | undefined> {
    const usuario = await this.usuarioRepositoryImp.getUserByLogin(login)
    const valido = usuario && await this.encrypter.comparePassword(senha, usuario.senha)
    if (valido) {
      usuario['token'] = await this.tokenProvider.gerar({ id: usuario.id }, this.chave) // 5min
      return usuario
    }
    return undefined
  }
}
