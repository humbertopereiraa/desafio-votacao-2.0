import { VotacaoErro } from "../errors/votacaoErro"
import { Pauta } from "./pauta"

export class Votacao {
  pauta: Pauta
  id_usuario: number
  voto: 'S' | 'N'

  constructor(pauta: Pauta, id_usuario: number, voto: 'S' | 'N') {
    this.pauta = pauta
    this.id_usuario = id_usuario
    this.voto = voto

    this.verificarSessaoExpirada()
  }

  private verificarSessaoExpirada(): void {
    const sessaoExperida = this.pauta.sessaoExpirou()
    if (sessaoExperida) {
      throw new VotacaoErro('Não é possivel votar em uma pauta com sessão expirada!')
    }
  }
}
