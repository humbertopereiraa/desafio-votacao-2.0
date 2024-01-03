import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'tipoUsuario'
})
export class TipoUsuarioPipe implements PipeTransform {

  transform(tipo: 'A' | 'N'): string {
    return tipo === 'A' ? 'Administrador ' : 'Normal'
  }

}
