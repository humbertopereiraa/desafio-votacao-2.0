import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Params } from '@angular/router'
import { Observable } from 'rxjs'
import { IPauta } from 'src/app/features/pauta/model/pauta'
import { PautaService } from 'src/app/features/pauta/services/pauta.service'
import { VotacaoService } from '../../service/votacao.service'
import { AuthService } from 'src/app/features/login/services/auth.service'
import { IVotacao } from '../../model/votacao'

@Component({
  selector: 'app-voto',
  templateUrl: './voto.component.html',
  styleUrls: ['./voto.component.css']
})
export class VotoComponent implements OnInit {

  public pauta: Observable<IPauta> | undefined
  public votoFormGroup: FormGroup
  public opcoes: string[] = ['SIM', 'NÃO']
  public exibirTemplete: 'Votacao' | 'Sucesso' | 'Error' = 'Votacao'
  public mensagem: string = ''

  private usuarioLogado: any

  constructor(private route: ActivatedRoute, private pautaService: PautaService,
    private formBuilder: FormBuilder, private votacaoService: VotacaoService,
    private authService: AuthService) {
    this.votoFormGroup = this.formBuilder.group({
      voto: ['', Validators.required]
    })
  }

  async ngOnInit() {
    this.route.params.forEach(async (params: Params) => {
      const id = params['id']
      if (id) {
        this.pauta = this.pautaService.getById(parseInt(id)) as Observable<IPauta>
      }
    })
    this.authService.getUsuarioLogado().subscribe((usuario) => {
      this.usuarioLogado = usuario
    })

  }

  public salvar(): void {
    if (!this.votoFormGroup.valid) return
    const that = this
    this.pauta?.subscribe((item) => {
      const votacao = {
        id_pauta: item.id,
        id_usuario: that.usuarioLogado.id,
        voto: (that.votoFormGroup.value.voto === 'SIM') ? "S" : "N"
      } as IVotacao
      that.votacaoService.post(votacao).subscribe({
        next(value) {
          that.mensagem = 'Votação realizada com sucesso'
          that.exibirTemplete = 'Sucesso'
        },
        error(e) {
          if(e?.error && e?.error?.code === 'SQLITE_CONSTRAINT') {
            that.mensagem = 'Não pode votar em uma pauta mais de uma vez!'
          } else {
            that.mensagem = e?.message ?? 'Error'
          }
          that.exibirTemplete = 'Error'
        },
      })
    })
  }

}
