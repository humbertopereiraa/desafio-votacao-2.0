import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable, map, of } from 'rxjs'
import { IUsuario } from '../model/usuario'
import { Configuracao } from 'src/configuracao'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly url = `${Configuracao.api}/login`
  private usuarioLogado = new BehaviorSubject<boolean>(false)
  public usuario: IUsuario = null as any

  constructor(private http: HttpClient) {
    const usuario = this.recuperarUsuarioNoSessionStorage()
    if (usuario) {
      this.usuario = usuario
      this.setUsuarioLogado(true)
    }
  }

  authentication(usuario: IUsuario): Observable<boolean> {
    return this.http.post<any>(this.url, usuario).pipe(
      map((usuario: IUsuario) => {
        this.usuario = usuario
        this.guardarUsuarioNoSessionStorage(this.usuario)
        this.setUsuarioLogado(true)
        return true
      })
    )
  }

  logout(): void {
    this.usuario = null as any
    this.guardarUsuarioNoSessionStorage(this.usuario)
    this.setUsuarioLogado(false)
  }

  getUsuarioLogado(): Observable<boolean> {
    return this.usuarioLogado.asObservable()
  }

  private setUsuarioLogado(value: boolean): void {
    this.usuarioLogado.next(value)
  }

  private guardarUsuarioNoSessionStorage(usuario: IUsuario): void {
    sessionStorage.setItem('app-usuario', JSON.stringify(usuario))
  }

  private recuperarUsuarioNoSessionStorage(): IUsuario {
    const usuario = sessionStorage.getItem('app-usuario')
    return usuario ? JSON.parse(usuario) : null
  }
}
