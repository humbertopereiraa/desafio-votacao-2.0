
import { Votacao } from "../../domain/entity/votacao"
import { VotacaoRepository } from "../../domain/repository/votacaoRepository"
import { ComandoSQL, Conexao } from "../database/conexao"

export class VotacaoRepositoryImp implements VotacaoRepository {

  constructor(private conexao: Conexao) { }

  getByPauta(id_pauta: number): Promise<any> {
    throw new Error("Method not implemented.")
  }

  async insert(votacao: Votacao): Promise<any> {
    const sql = 'INSERT INTO votacao (id_pauta, id_usuario, voto) VALUES (?, ?, ?) RETURNING *'
    return this.conexao.query(ComandoSQL.INSERT, sql, [votacao.pauta.id, votacao.id_usuario, votacao.voto])
  }
}
