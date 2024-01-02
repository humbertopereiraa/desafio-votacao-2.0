import { IServidor } from "../../../app"

export = (servidor: IServidor) => {

  // servidor.app.on('/private/pauta/all', 'get', [], servidor.votacaoController.all.bind(servidor.votacaoController))

  servidor.app.on('/private/votacao', 'post', [
    { parametro: 'id_pauta', tipo: 'notEmpty', msg: 'o Campo id_pauta não pode ser vázio' },
    { parametro: 'id_usuario', tipo: 'notEmpty', msg: 'o Campo id_usuario não pode ser vázio' },
    { parametro: 'voto', tipo: 'notEmpty', msg: 'O Campo voto não pode ser vázio' }
  ], servidor.votacaoController.inserir.bind(servidor.votacaoController))
}
