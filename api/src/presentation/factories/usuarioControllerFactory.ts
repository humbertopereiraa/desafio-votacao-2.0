

import { BuscarTodosUsuarios } from "../../domain/usecases/buscarTodosUsuario"
import { DeletarUsuario } from "../../domain/usecases/deletarUsuario"
import { InserirUsuario } from "../../domain/usecases/inserirUsuario"
import { Conexao } from "../../infra/database/conexao"
import { UsuarioRepositoryImp } from "../../infra/repository/usuarioRepositoryImp"
import { UsuarioController } from "../controller/usuarioController"

export class UsuarioControllerFactory {

  constructor(private conexao: Conexao) { }

  criarController(): UsuarioController {
    const usuarioRepository = new UsuarioRepositoryImp(this.conexao)
    const buscarTodosUsuarios = new BuscarTodosUsuarios(usuarioRepository)
    const inserirUsuario = new InserirUsuario(usuarioRepository)
    const deletarUsuario = new DeletarUsuario(usuarioRepository)
    return new UsuarioController(buscarTodosUsuarios, inserirUsuario, deletarUsuario)
  }
}
