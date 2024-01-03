import { Component, OnInit } from '@angular/core'
import { IUsuario } from '../../model/usuario'
import { UsuarioService } from '../../service/usuario.service'
import { lastValueFrom } from 'rxjs'

@Component({
  selector: 'app-lista-de-usuarios',
  templateUrl: './lista-de-usuarios.component.html',
  styleUrls: ['./lista-de-usuarios.component.css']
})
export class ListaDeUsuariosComponent implements OnInit {

  public usuarios: IUsuario[] = []
  public filtro: string = ''

  constructor(private usuarioService: UsuarioService) { }

  async ngOnInit() {
    this.usuarios = await lastValueFrom(this.usuarioService.all())
  }

  public deletarUsuario(id: number): void {
    const that = this
    this.usuarioService.delete(id).subscribe({
      next() {
        const index = that.usuarios.findIndex(item => item.id === id)
        if (index > -1) {
          that.usuarios.splice(index, 1)
        }
      },
      error(e) {
        console.log('Erro: ', e)
      },
    })
  }

}
