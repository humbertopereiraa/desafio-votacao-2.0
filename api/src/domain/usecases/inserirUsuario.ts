import { Usuario } from "../entity/usuario"
import { UsuarioRepository } from "../repository/usuarioRepository"

export class InserirUsuario {
  constructor(private usuarioRepository: UsuarioRepository) { }

  async execute(usuario: Usuario) {
    return this.usuarioRepository.insert(usuario)
  }
}
