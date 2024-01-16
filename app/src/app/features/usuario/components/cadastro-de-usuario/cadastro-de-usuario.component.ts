import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { UsuarioService } from '../../service/usuario.service'
import { Router } from '@angular/router'
import { IUsuario } from '../../model/usuario'
import { NotificationService } from 'src/app/core/services/notification.service'

@Component({
  selector: 'app-cadastro-de-usuario',
  templateUrl: './cadastro-de-usuario.component.html',
  styleUrls: ['./cadastro-de-usuario.component.css']
})
export class CadastroDeUsuarioComponent implements OnInit {

  public usuarioFormGroup: FormGroup
  public tipos: string[] = ['Administrador','Normal']

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService, private router: Router, private notificationService: NotificationService) { 
    this.usuarioFormGroup = this.formBuilder.group({
      nome: ['', Validators.required],
      login: ['', Validators.required],
      senha: ['', Validators.required],
      tipo: ['', Validators.required],
      cpf: ['', Validators.required],
    })
  }

  ngOnInit() {
  }

  public onSubmit(): void {
    if (!this.usuarioFormGroup.valid) return
    const usuario = {
      nome:this.usuarioFormGroup.value.nome,
      login:this.usuarioFormGroup.value.login,
      senha:this.usuarioFormGroup.value.senha,
      tipo:this.usuarioFormGroup.value.tipo,
      cpf:this.usuarioFormGroup.value.cpf,
    } as IUsuario
    this.usuarioService.post(usuario).subscribe({
      next: () => {
        this.notificationService.success('Usuário cadastrado com sucesso!')
        this.router.navigate(['/usuario'])
      },
      error: (e) => {
        this.notificationService.error('Erro ao cadastrar usuário!')
        console.log(e)
      },
    })
  }

}
