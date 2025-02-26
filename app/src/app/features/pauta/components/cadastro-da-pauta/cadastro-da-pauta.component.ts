import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { PautaService } from '../../services/pauta.service'
import { IPauta } from '../../model/pauta'
import { Router } from '@angular/router'
import { NotificationService } from 'src/app/core/services/notification.service'

@Component({
  selector: 'app-cadastro-da-pauta',
  templateUrl: './cadastro-da-pauta.component.html',
  styleUrls: ['./cadastro-da-pauta.component.css']
})
export class CadastroDaPautaComponent implements OnInit {

  public pautaFormGroup: FormGroup

  constructor(private formBuilder: FormBuilder, private pautaService: PautaService, private router: Router, private notificationService: NotificationService) {
    this.pautaFormGroup = this.formBuilder.group({
      descricao: ['', Validators.required],
      categoria: ['', Validators.required],
      tempoSessao: [1, Validators.required]
    })
  }

  ngOnInit() { }

  public onSubmit(): void {
    if (!this.pautaFormGroup.valid) return
    const pauta = {
      descricao: this.pautaFormGroup.value.descricao,
      categoria: this.pautaFormGroup.value.categoria,
      tempoSessao: this.pautaFormGroup.value.tempoSessao
    } as IPauta
    this.pautaService.post(pauta).subscribe({
      next: () => {
        this.notificationService.success('Pauta inserida com sucesso!')
        this.router.navigate(['/pauta'])
      },
      error: (e) => {
        this.notificationService.error('Erro ao inserir Pauta!')
        console.log(e)
      },
    })
  }

}
