import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { PautaService } from '../../services/pauta.service'
import { IPauta } from '../../model/pauta'
import { Router } from '@angular/router'

@Component({
  selector: 'app-cadastro-da-pauta',
  templateUrl: './cadastro-da-pauta.component.html',
  styleUrls: ['./cadastro-da-pauta.component.css']
})
export class CadastroDaPautaComponent implements OnInit {

  public pautaFormGroup: FormGroup

  constructor(private formBuilder: FormBuilder, private pautaService: PautaService, private router: Router) { 
    this.pautaFormGroup = this.formBuilder.group({
      descricao: ['', Validators.required],
      tempoSessao: [1, Validators.required]
    })
  }

  ngOnInit() { }

  public onSubmit(): void {
    if (!this.pautaFormGroup.valid) return
    const that = this
    const pauta = {
      descricao: this.pautaFormGroup.value.descricao,
      tempoSessao: this.pautaFormGroup.value.tempoSessao
    } as IPauta
    this.pautaService.post(pauta).subscribe({
      next(value) {
        that.router.navigate(['/pauta'])
      },
      error(e) {
        console.log(e)
      },
    })
  }

}
