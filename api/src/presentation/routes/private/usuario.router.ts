import { IServidor } from "../../../app"

export = (servidor: IServidor) => {

  servidor.app.on('/private/usuario/all', 'get', [], servidor.usuarioController.all.bind(servidor.usuarioController))

  servidor.app.on('/private/usuario', 'post', [
    { parametro: 'nome', tipo: 'notEmpty', msg: 'o Campo nome não pode ser vázio' },
    { parametro: 'login', tipo: 'notEmpty', msg: 'o Campo login não pode ser vázio' },
    { parametro: 'senha', tipo: 'notEmpty', msg: 'o Campo senha não pode ser vázio' },
    { parametro: 'tipo', tipo: 'notEmpty', msg: 'o Campo tipo não pode ser vázio' },
    { parametro: 'cpf', tipo: 'notEmpty', msg: 'O Campo cpf não pode ser vázio' }
  ], servidor.usuarioController.inserir.bind(servidor.usuarioController))

  servidor.app.on('/private/usuario', 'delete', [
    { parametro: 'id', tipo: 'notEmpty', msg: 'O Campo id não pode ser vázio' },
  ], servidor.usuarioController.deletar.bind(servidor.usuarioController))
}
