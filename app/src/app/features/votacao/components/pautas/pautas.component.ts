import { Component, OnInit } from '@angular/core'
import { lastValueFrom } from 'rxjs'
import { IPauta } from 'src/app/features/pauta/model/pauta'
import { PautaService } from 'src/app/features/pauta/services/pauta.service'

@Component({
  selector: 'app-pautas',
  templateUrl: './pautas.component.html',
  styleUrls: ['./pautas.component.css']
})
export class PautasComponent implements OnInit {

  public pautas: IPauta[] = []
  
  constructor(private pautaService: PautaService) { }

  async ngOnInit() {
    this.pautas = await lastValueFrom(this.pautaService.somenteAtivos())
  }

}
