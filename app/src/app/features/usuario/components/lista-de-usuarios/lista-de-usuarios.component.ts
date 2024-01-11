import { Component, OnInit } from '@angular/core'
import { IUsuario } from '../../model/usuario'
import { UsuarioService } from '../../service/usuario.service'
import { lastValueFrom } from 'rxjs'
import { IHeaders } from 'src/app/shared/tabela/model/headers'

@Component({
  selector: 'app-lista-de-usuarios',
  templateUrl: './lista-de-usuarios.component.html',
  styleUrls: ['./lista-de-usuarios.component.css']
})
export class ListaDeUsuariosComponent implements OnInit {

  public usuarios: IUsuario[] = []
  public filtro: string = ''
  public headers: IHeaders[] = []
  public callbackFiltrar: (item: any, filtro: string) => boolean = () => true

  constructor(private usuarioService: UsuarioService) { 
    this.headers = [
      { label: 'ID', key: 'id' },
      { label: 'Nome', key: 'nome' },
      { label: 'Login', key: 'login' },
      { label: 'Tipo', key: 'tipo' },
      { label: 'Cpf', key: 'cpf' }
    ]
    this.callbackFiltrar = (item: IUsuario, filtro: string) => item.nome.toLowerCase().includes(filtro.toLowerCase())
  }

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
