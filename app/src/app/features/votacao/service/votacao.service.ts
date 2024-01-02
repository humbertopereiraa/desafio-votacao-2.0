import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Configuracao } from 'src/configuracao'
import { IVotacao } from '../model/votacao'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class VotacaoService {

  private url: string = `${Configuracao.api}/private/votacao`

  constructor(private http: HttpClient) { }

  post(votacao: IVotacao): Observable<void> {
    return this.http.post<any>(this.url, votacao)
  }
}
