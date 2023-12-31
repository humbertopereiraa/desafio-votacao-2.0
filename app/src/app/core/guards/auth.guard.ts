import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { AuthService } from 'src/app/features/login/services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): any {
    this.authService.getUsuarioLogado().subscribe({
      next: (value: boolean) => {
        console.log(value)
        if(!value) {
          this.router.navigate(['/login'])
        }
        return value
      }
    })
  }

}
