import { Pipe, PipeTransform } from '@angular/core'
import { IUsuario } from 'src/app/features/usuario/model/usuario'

@Pipe({
  name: 'filtarUsuarios'
})
export class FiltarUsuariosPipe implements PipeTransform {

  transform(items: IUsuario[], filtro: string): any {
    if (!items || !filtro) {
      return items
    }
    return items.filter(item =>
      item.nome.toLowerCase().includes(filtro.toLowerCase())
    )
  }

}
