import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable, map, of } from 'rxjs'
import { IUsuarioLogin } from '../model/usuario'
import { Configuracao } from 'src/configuracao'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly url = `${Configuracao.api}/login`
  private usuarioLogado = new BehaviorSubject<any>(null)
  public usuario: IUsuarioLogin = null as any

  constructor(private http: HttpClient) {
    const usuario = this.recuperarUsuarioNoSessionStorage()
    if (usuario) {
      this.usuario = usuario
      this.setUsuarioLogado(this.usuario)
    }
  }

  authentication(usuario: IUsuarioLogin): Observable<boolean> {
    return this.http.post<any>(this.url, usuario).pipe(
      map((usuario: IUsuarioLogin) => {
        this.usuario = usuario
        this.guardarUsuarioNoSessionStorage(this.usuario)
        this.setUsuarioLogado(usuario)
        return true
      })
    )
  }

  logout(): void {
    this.usuario = null as any
    this.guardarUsuarioNoSessionStorage(this.usuario)
    this.setUsuarioLogado(null)
  }

  getUsuarioLogado(): Observable<any> {
    return this.usuarioLogado.asObservable()
  }

  private setUsuarioLogado(value: any): void {
    this.usuarioLogado.next(value)
  }

  private guardarUsuarioNoSessionStorage(usuario: IUsuarioLogin): void {
    sessionStorage.setItem('app-usuario', JSON.stringify(usuario))
  }

  private recuperarUsuarioNoSessionStorage(): IUsuarioLogin {
    const usuario = sessionStorage.getItem('app-usuario')
    return usuario ? JSON.parse(usuario) : null
  }
}
