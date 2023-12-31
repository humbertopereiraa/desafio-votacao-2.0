import { Component } from '@angular/core'
import { AuthService } from './features/login/services/auth.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public usuarioLogado: any
  public subscription: Subscription

  constructor(private authService: AuthService) {
    this.subscription = this.authService.getUsuarioLogado().subscribe({
      next: (value: boolean) => {
        this.usuarioLogado = value
      }
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe()
  }
}
