import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'filtarRegistroDaTabela'
})
export class FiltarRegistroDaTabelaPipe implements PipeTransform {

  transform(items: any[], filtroParam: { filtro: string, callbackFiltrar: (item: any, filtro: string) => boolean }): any {
    return items.filter(item => filtroParam.callbackFiltrar(item, filtroParam.filtro))
  }

}
