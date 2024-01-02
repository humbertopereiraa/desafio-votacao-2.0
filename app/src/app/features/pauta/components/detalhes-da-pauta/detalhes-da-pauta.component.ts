import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { Observable } from 'rxjs'
import { PautaService } from '../../services/pauta.service'

@Component({
  selector: 'app-detalhes-da-pauta',
  templateUrl: './detalhes-da-pauta.component.html',
  styleUrls: ['./detalhes-da-pauta.component.css']
})
export class DetalhesDaPautaComponent implements OnInit {

  public pauta: Observable<any> | undefined

  constructor(private route: ActivatedRoute, private pautaService: PautaService) { }

  ngOnInit() {
    this.route.params.forEach(async (params: Params) => {
      const id = params['id']
      if (id) {
        this.pauta = this.pautaService.getDetalhes(parseInt(id)) as Observable<any>
      }
    })
  }

}
