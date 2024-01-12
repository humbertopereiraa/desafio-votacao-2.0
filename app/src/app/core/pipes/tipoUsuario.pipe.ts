import { Pipe, PipeTransform } from '@angular/core'
import { ETipoUsuario } from 'src/app/features/login/model/usuario'

@Pipe({
  name: 'tipoUsuario'
})
export class TipoUsuarioPipe implements PipeTransform {

  transform(tipo: ETipoUsuario): string {
    return tipo === ETipoUsuario.ADMINISTRADOR ? 'Administrador ' : 'Normal'
  }

}
