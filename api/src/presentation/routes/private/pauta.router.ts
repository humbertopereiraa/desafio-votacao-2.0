import { IServidor } from "../../../app"

export = (servidor: IServidor) => {

  servidor.app.on('/private/pauta/all', 'get', [], servidor.pautaController.all.bind(servidor.pautaController))

  servidor.app.on('/private/pauta/somenteAtivas', 'get', [], servidor.pautaController.somentePautasAtivas.bind(servidor.pautaController))

  servidor.app.on('/private/pauta', 'post', [
    { parametro: 'descricao', tipo: 'notEmpty', msg: 'o Campo descricao não pode ser vázio' },
    { parametro: 'tempoSessao', tipo: 'notEmpty', msg: 'O Campo tempoSessao não pode ser vázio' }
  ], servidor.pautaController.inserir.bind(servidor.pautaController))

  servidor.app.on('/private/pauta', 'delete', [
    { parametro: 'id', tipo: 'notEmpty', msg: 'O Campo id não pode ser vázio' },
  ], servidor.pautaController.deletar.bind(servidor.pautaController))
}
