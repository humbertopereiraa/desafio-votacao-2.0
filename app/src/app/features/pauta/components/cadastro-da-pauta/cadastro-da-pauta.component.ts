import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-cadastro-da-pauta',
  templateUrl: './cadastro-da-pauta.component.html',
  styleUrls: ['./cadastro-da-pauta.component.css']
})
export class CadastroDaPautaComponent implements OnInit {

  public pautaFormGroup: FormGroup

  constructor(private formBuilder: FormBuilder) { 
    this.pautaFormGroup = this.formBuilder.group({
      descricao: ['', Validators.required],
      tempoSessao: [1, Validators.required]
    })
  }

  ngOnInit() { }

}
