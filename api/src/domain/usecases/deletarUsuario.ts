import { UsuarioRepository } from "../repository/usuarioRepository"

export class DeletarUsuario {
  
  constructor(private usuarioRepository: UsuarioRepository) { }

  async execute(id: number) {
    return this.usuarioRepository.delete(id)
  }
}
