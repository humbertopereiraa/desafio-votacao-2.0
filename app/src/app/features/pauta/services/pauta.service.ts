import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Configuracao } from 'src/configuracao'
import { IPauta } from '../model/pauta'
import { Observable, shareReplay } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PautaService {

  private url: string = `${Configuracao.api}/private/pauta`
  private cache: any

  constructor(private http: HttpClient) { }

  all(): Observable<IPauta[]> {
    if (!this.cache) {
      this.cache = this.http.get(`${this.url}/all`).pipe(shareReplay(1))
    }
    return this.cache
  }

  somenteAtivos(): Observable<IPauta[]> {
    return this.http.get(`${this.url}/somenteAtivas`) as any
  }

  post(pauta: IPauta): Observable<IPauta> {
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
