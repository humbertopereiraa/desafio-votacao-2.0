import { Component, OnInit } from '@angular/core'
import { IPauta } from '../../model/pauta'
import { PautaService } from '../../services/pauta.service'
import { lastValueFrom } from 'rxjs'
import { ETipoPipe, IHeaders } from 'src/app/shared/tabela/model/headers'
import { Router } from '@angular/router'
import { NotificationService } from 'src/app/core/services/notification.service'

@Component({
  selector: 'app-lista-de-pautas',
  templateUrl: './lista-de-pautas.component.html',
  styleUrls: ['./lista-de-pautas.component.css']
})
export class ListaDePautasComponent implements OnInit {

  public pautas: IPauta[] = []
  public filtro: string = '' //
  public headers: IHeaders[] = []
  public callbackFiltrar: (item: any, filtro: string) => boolean = () => true

  constructor(private pautaService: PautaService, private router: Router, private notificationService: NotificationService) {
    this.headers = [
      { label: 'ID', key: 'id' },
      { label: 'Descrição', key: 'descricao' },
      { label: 'Categoria', key: 'categoria' },
      { label: 'Tempo Sessão (Minutos)', key: 'tempoSessao' },
      { label: 'Data de Criação', key: 'data', tipoPipe: ETipoPipe.FORMATAR_DATA },
      { label: 'Sessão', key: 'data', tipoPipe: ETipoPipe.STATUS_SESSAO }
    ]
    this.callbackFiltrar = (item: IPauta, filtro: string) => {
      return item.descricao.toLowerCase().includes(filtro.toLowerCase()) || item.categoria.toLowerCase().includes(filtro.toLowerCase())
    }
  }

  async ngOnInit() {
    this.pautas = await lastValueFrom(this.pautaService.all())
  }

  public deletarPauta(id: number): void {
    this.pautaService.delete(id).subscribe({
      next: () => {
        this.pautas = this.pautas.filter(item => item.id !== id)
        this.notificationService.success('Pauta deletada com sucesso!')
      },
      error: (e: any) => {
        this.notificationService.success('Error ao deletar Pauta!')
        console.log('Erro: ', e)
      }
    })
  }

  public detalhesPauta(id: number): void {
    this.router.navigate(['/pauta', id])
  }
}
