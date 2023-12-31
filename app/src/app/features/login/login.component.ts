import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from './services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginFormGroup: FormGroup
  public mensagemErro: string = ''

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginFormGroup = this.formBuilder.group({
      login: ['', [Validators.required]],
      senha: ['', Validators.required]
    })
  }

  ngOnInit() { }

  public login(): void {
    if (!this.loginFormGroup.valid) return
    this.authService.authentication(this.loginFormGroup.value).subscribe({
      next: () => {
        this.mensagemErro = ''
        this.router.navigateByUrl('/pauta')
      },
      error: (e: any) => {
        if (e && e.error && e.error.msg) {
          this.mensagemErro = e.error.msg
        }
      }
    })
  }

}
