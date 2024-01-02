import { Pipe, PipeTransform } from '@angular/core'
import { IPauta } from 'src/app/features/pauta/model/pauta'

@Pipe({
  name: 'filtarPautas'
})
export class FiltarPautasPipe implements PipeTransform {

  transform(items: IPauta[], filtro: string): any {
    if (!items || !filtro) {
      return items
    }
    return items.filter(item =>
      item.descricao.toLowerCase().includes(filtro.toLowerCase()) ||
      item.categoria.toLowerCase().includes(filtro.toLowerCase()) 

    )
  }

}
