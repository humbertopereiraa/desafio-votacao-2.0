import { Component, OnInit } from '@angular/core'
import { IPauta } from '../../model/pauta'
import { PautaService } from '../../services/pauta.service'
import { lastValueFrom } from 'rxjs'

@Component({
  selector: 'app-lista-de-pautas',
  templateUrl: './lista-de-pautas.component.html',
  styleUrls: ['./lista-de-pautas.component.css']
})
export class ListaDePautasComponent implements OnInit {

  public pautas: IPauta[] = []

  constructor(private pautaService: PautaService) { }

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

}
