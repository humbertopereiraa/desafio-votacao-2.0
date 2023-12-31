import { Component, OnInit } from '@angular/core'
import { IPauta } from '../../model/pauta'

@Component({
  selector: 'app-lista-de-pautas',
  templateUrl: './lista-de-pautas.component.html',
  styleUrls: ['./lista-de-pautas.component.css']
})
export class ListaDePautasComponent implements OnInit {

  public pautas: IPauta[] = []

  constructor() { }

  ngOnInit() { }

  public novaPauta(): void {

  }

  public deletarPauta(id: number): void {

  }

}
