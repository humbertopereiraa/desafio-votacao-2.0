
import { Pauta } from "../../domain/entity/pauta"
import { PautaRepository } from "../../domain/repository/pautaRepository"
import { sessaoExpirou } from "../../utils/verificarSessaoExpirada"
import { ComandoSQL, Conexao } from "../database/conexao"

export class PautaRepositoryImp implements PautaRepository {

  constructor(private conexao: Conexao) { }

  async all(): Promise<Pauta[]> {
    const sql = 'SELECT * FROM pauta'
    const pautas = await this.conexao.query(ComandoSQL.SELECT, sql, [])
    return pautas
  }

  async somenteAtivas(): Promise<Pauta[]> {
    const pautas = await this.all()
    return pautas.filter(item => !(sessaoExpirou(item.data, item.tempoSessao)))
  }

  async insert(pauta: Pauta): Promise<any> {
    const sql = 'INSERT INTO pauta (descricao, tempoSessao, data) VALUES (?, ?, ?) RETURNING *'
    const { descricao, tempoSessao, data } = pauta
    const id = await this.conexao.query(ComandoSQL.INSERT, sql, [descricao, tempoSessao, data]) //o banco sqlite retorna apenas o id
    if (id && typeof id === 'number') {
      pauta['id'] = id
    }
    return pauta
  }

  delete(id: number): Promise<void> {
    const sql = 'DELETE FROM pauta WHERE id = ?'
    return this.conexao.query(ComandoSQL.DELETE, sql, [id])
  }
}
