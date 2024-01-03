import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, map, shareReplay } from 'rxjs'
import { Configuracao } from 'src/configuracao'
import { IUsuario } from '../model/usuario'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string = `${Configuracao.api}/private/usuario`
  private cache: any

  constructor(private http: HttpClient) { }

  all(): Observable<IUsuario[]> {
    if (!this.cache) {
      this.cache = this.http.get(`${this.url}/all`).pipe(shareReplay(1))
    }
    return this.cache
  }

  getById(id: number): Observable<IUsuario | undefined> {
    return this.all().pipe(
      map((usuario) => usuario.find(item => item.id === id))
    )
  }

  post(pauta: IUsuario): Observable<IUsuario> {
    this.limparCache()
    return this.http.post<any>(this.url, pauta)
  }

  delete(id: number): Observable<void> {
    this.limparCache()
    const params = new HttpParams().set('id', id)
    return this.http.delete<void>(this.url, { params })
  }

  private limparCache(): void {
    this.cache = undefined
  }

}
