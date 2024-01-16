import { Component, OnInit } from '@angular/core'
import { IUsuario } from '../../model/usuario'
import { UsuarioService } from '../../service/usuario.service'
import { lastValueFrom } from 'rxjs'
import { ETipoPipe, IHeaders } from 'src/app/shared/tabela/model/headers'
import { NotificationService } from 'src/app/core/services/notification.service'

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

  constructor(private usuarioService: UsuarioService, private notificationService: NotificationService) {
    this.headers = [
      { label: 'ID', key: 'id' },
      { label: 'Nome', key: 'nome' },
      { label: 'Login', key: 'login' },
      { label: 'Tipo', key: 'tipo', tipoPipe: ETipoPipe.TIPO_USUARIO },
      { label: 'Cpf', key: 'cpf' }
    ]
    this.callbackFiltrar = (item: IUsuario, filtro: string) => item.nome.toLowerCase().includes(filtro.toLowerCase())
  }

  async ngOnInit() {
    this.usuarios = await lastValueFrom(this.usuarioService.all())
  }

  public deletarUsuario(id: number): void {
    this.usuarioService.delete(id).subscribe({
      next: () => {
        this.usuarios = this.usuarios.filter(item => item.id !== id)
        this.notificationService.success('Usuário deletado com sucesso!')
      },
      error: (e: any) => {
        this.notificationService.success('Error ao deletar Usuário!')
        console.log('Erro: ', e)
      }
    })
  }
}
