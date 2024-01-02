import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Params } from '@angular/router'
import { Observable } from 'rxjs'
import { IPauta } from 'src/app/features/pauta/model/pauta'
import { PautaService } from 'src/app/features/pauta/services/pauta.service'

@Component({
  selector: 'app-voto',
  templateUrl: './voto.component.html',
  styleUrls: ['./voto.component.css']
})
export class VotoComponent implements OnInit {

  public pauta: Observable<IPauta> | undefined
  public votoFormGroup: FormGroup
  public opcoes: string[] = ['SIM', 'NÃO']

  constructor(private route: ActivatedRoute, private pautaService: PautaService, private formBuilder: FormBuilder) { 
    this.votoFormGroup = this.formBuilder.group({
      voto: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.route.params.forEach(async (params: Params) => {
      const id = params['id']
      if (id) {
        this.pauta = this.pautaService.getById(parseInt(id)) as Observable<IPauta>
      }
    })
  }

}
