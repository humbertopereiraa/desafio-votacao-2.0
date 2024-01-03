import { UsuarioRepository } from "../repository/usuarioRepository"

export class BuscarTodosUsuarios {
  constructor(private usuarioRepository: UsuarioRepository) { }

  async execute() {
    const usuarios = await this.usuarioRepository.all()
    return usuarios
  }
}
