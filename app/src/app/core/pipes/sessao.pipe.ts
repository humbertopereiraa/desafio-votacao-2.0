import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'sessao'
})
export class SessaoPipe implements PipeTransform {

  transform(dataDaPauta: Date | number, tempoSessao: number): string {
    const dataDeCriacao = new Date(dataDaPauta)
    const novaData = new Date(dataDeCriacao.getTime() + tempoSessao * 60000)
    const dataAtual = new Date()
    return novaData.valueOf() < dataAtual.valueOf() ? 'Expirada' : 'Ativa'
  }

}
