import { IServidor } from "../../../app"

export = (servidor: IServidor) => {
  servidor.app.on('/login', 'post', [
    { parametro: 'login', tipo: 'notEmpty', msg: 'O login não pode ser vázio' },
    { parametro: 'senha', tipo: 'notEmpty', msg: 'A senha não pode ser vázia' }
  ], servidor.authController.auth.bind(servidor.authController))
}
