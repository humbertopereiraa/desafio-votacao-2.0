import { Component, OnInit } from '@angular/core'
import { IPauta } from '../../model/pauta'
import { PautaService } from '../../services/pauta.service'
import { lastValueFrom } from 'rxjs'
import { IHeaders } from 'src/app/shared/tabela/model/headers'
import { Router } from '@angular/router'

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

  constructor(private pautaService: PautaService, private router: Router) {
    this.headers = [
      { label: 'ID', key: 'id' },
      { label: 'Descrição', key: 'descricao' },
      { label: 'Categoria', key: 'categoria' },
      { label: 'Tempo Sessão (Minutos)', key: 'tempoSessao' },
      { label: 'Data de Criação', key: 'data', usarPipeData: true },
      { label: 'Sessão', key: 'data', usarPipeSessao: true }
    ]
    this.callbackFiltrar = (item: IPauta, filtro: string) => {
      return item.descricao.toLowerCase().includes(filtro.toLowerCase()) || item.categoria.toLowerCase().includes(filtro.toLowerCase())
    }
  }

  async ngOnInit() {
    this.pautas = await lastValueFrom(this.pautaService.all())
  }

  public deletarPauta(id: number): void {
    const that = this
    this.pautaService.delete(id).subscribe({
      next() {
        const index = that.pautas.findIndex(item => item.id === id)
        if (index > -1) {
          that.pautas.splice(index, 1)
        }
      },
      error(e) {
        console.log('Erro: ', e)
      },
    })
  }

  public detalhesPauta(id: number): void {
    this.router.navigate(['/pauta', id])
  }
}
