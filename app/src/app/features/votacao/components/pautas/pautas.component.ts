import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { lastValueFrom } from 'rxjs'
import { IPauta } from 'src/app/features/pauta/model/pauta'
import { PautaService } from 'src/app/features/pauta/services/pauta.service'
import { IHeaders } from 'src/app/shared/tabela/model/headers'

@Component({
  selector: 'app-pautas',
  templateUrl: './pautas.component.html',
  styleUrls: ['./pautas.component.css']
})
export class PautasComponent implements OnInit {

  public pautas: IPauta[] = []
  public filtro: string = ''
  public headers: IHeaders[] = []
  public callbackFiltrar: (item: any, filtro: string) => boolean = () => true

  constructor(private pautaService: PautaService, private router: Router) {
    this.headers = [
      { label: 'Pauta', key: 'descricao', classe: 'col-6' },
      { label: 'Categoria', key: 'categoria', classe: 'col-4' }
    ]
    this.callbackFiltrar = (item: IPauta, filtro: string) => {
      return item.descricao.toLowerCase().includes(filtro.toLowerCase()) || item.categoria.toLowerCase().includes(filtro.toLowerCase())
    }
  }

  async ngOnInit() {
    this.pautas = await lastValueFrom(this.pautaService.somenteAtivos())
  }

  public votar(id: number): void {
    this.router.navigate(['/votacao', id])
  }
}
