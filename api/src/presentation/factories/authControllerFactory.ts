import { Autenticacao } from "../../domain/usecases/autenticacao"
import { Conexao } from "../../infra/database/conexao"
import { UsuarioRepositoryImp } from "../../infra/repository/usuarioRepositoryImp"
import { Encrypter } from "../../utils/encrypter"
import { JwtTokenAdapter } from "../../utils/jwtTokenAdapter"
import { AuthController } from "../controller/authController"

export class AuthControllerFactory {
  constructor(private conexao: Conexao, private chave: string) { }

  criarAuthController(): AuthController {
    const token = new JwtTokenAdapter()
    const encrypter = new Encrypter()
    const usuarioRepository = new UsuarioRepositoryImp(this.conexao)
    const autenticacao = new Autenticacao(token, usuarioRepository, encrypter, this.chave)
    return new AuthController(autenticacao)
  }
}
