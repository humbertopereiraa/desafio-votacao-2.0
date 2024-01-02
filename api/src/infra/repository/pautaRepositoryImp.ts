
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

  async getById(id: number): Promise<Pauta> {
    const sql = 'SELECT * FROM pauta WHERE id = ?'
    const pauta: Pauta[] = await this.conexao.query(ComandoSQL.SELECT, sql, [id])
    return pauta[0]
  }

  async getDetalhe(id: number): Promise<any> {
    const sql = 'SELECT DISTINCT * FROM pauta LEFT JOIN votacao ON pauta.id = votacao.id_pauta WHERE id = ?'
    const pauta: any[] = await this.conexao.query(ComandoSQL.SELECT, sql, [id]) ?? []
    const contagemVotos = pauta.reduce((acc, item) => {
      const valor = item.voto
      acc[valor] = (acc[valor] || 0) + 1
      return acc
    }, {})
    const expirou = sessaoExpirou(pauta[0]?.data, pauta[0]?.tempoSessao)
    return {
      id_pauta: pauta[0]?.id,
      descricao: pauta[0]?.descricao,
      totalVotos: (contagemVotos['S'] ?? 0) + (contagemVotos['N'] ?? 0),
      situacao: expirou ? 'EXPIRADA' : 'ATIVA',
      status: expirou ? (((contagemVotos['S'] ?? 0) > (contagemVotos['N'] ?? 0)) ? 'APROVADADA' : 'REPROVADA') : 'EM ABERTO' //Para uma pauta ser aprovada, deve ter mais votos Sim 
    }
  }

  async somenteAtivas(): Promise<Pauta[]> {
    const pautas = await this.all()
    return pautas.filter(item => !(sessaoExpirou(item.data, item.tempoSessao)))
  }

  async insert(pauta: Pauta): Promise<any> {
    const sql = 'INSERT INTO pauta (descricao, categoria, tempoSessao, data) VALUES (?, ?, ?, ?) RETURNING *'
    const { descricao, categoria, tempoSessao, data } = pauta
    const id = await this.conexao.query(ComandoSQL.INSERT, sql, [descricao, categoria, tempoSessao, data]) //o banco sqlite retorna apenas o id
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
