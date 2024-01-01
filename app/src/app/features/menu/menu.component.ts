import { Component, OnInit } from '@angular/core'
import { AuthService } from '../login/services/auth.service'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public usuarioLogado: Observable<any> | undefined
  
  constructor(private authService: AuthService, private router: Router) { }

  async ngOnInit() { 
    this.usuarioLogado = this.authService.getUsuarioLogado()
  }

  public logout(): void {
    this.authService.logout()
    this.router.navigateByUrl('/login')
  }
}
