import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core'
import { ETipoPipe, IHeaders } from './model/headers'

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent implements OnInit {

  @Input() data: any[] = []
  @Input() headers: IHeaders[] = []
  @Input() filtro: string = ''
  @Input() callbackFiltrar: (item: any, filtro: string) => boolean = () => true
  @Input() exibirBotaoEditar: boolean = false
  @Input() exibirBotaoDeletar: boolean = false
  @Input() exibirBotaoDetalhe: boolean = false
  @Input() exibirBotaoVotar: boolean = false
  @Output() editar: EventEmitter<any> = new EventEmitter<any>()
  @Output() detalhe: EventEmitter<number> = new EventEmitter<number>()
  @Output() deletar: EventEmitter<number> = new EventEmitter<number>()
  @Output() votar: EventEmitter<number> = new EventEmitter<number>()

  public filtroParam: { filtro: string, callbackFiltrar: (item: any, filtro: string) => boolean } = { filtro: '', callbackFiltrar: () => true }
  public eTipoPipe = ETipoPipe

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes['filtro'] && changes['filtro']) {
      this.filtroParam = {
        filtro: this.filtro ?? '',
        callbackFiltrar: this.callbackFiltrar
      }
    }
  }

  onDetalhes(id: number): void {
    this.detalhe.emit(id)
  }

  onEditar(event: any): void {
    this.editar.emit(event)
  }

  onDeletar(id: number): void {
    this.deletar.emit(id)
  }

  onVotar(id: number): void {
    this.votar.emit(id)
  }
}
