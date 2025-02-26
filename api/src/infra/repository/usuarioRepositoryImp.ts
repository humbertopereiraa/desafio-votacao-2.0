import { Usuario } from "../../domain/entity/usuario"
import { UsuarioRepository } from "../../domain/repository/usuarioRepository"
import { ComandoSQL, Conexao } from "../database/conexao"

export class UsuarioRepositoryImp implements UsuarioRepository {
  constructor(private conexao: Conexao) { }

  async all(): Promise<Usuario[]> {
    const sql = 'SELECT * FROM usuario'
    const usuarios = await this.conexao.query(ComandoSQL.SELECT, sql, [])
    return usuarios
  }

  async getUserByLogin(login: string): Promise<Usuario> {
    const sql = 'SELECT * FROM usuario WHERE login = ?'
    const usuario = await this.conexao.query(ComandoSQL.SELECT, sql, [login])
    return usuario[0]
  }

  async insert(usuario: Usuario): Promise<any> {
    const sql = 'INSERT INTO usuario (nome, login, senha, tipo, cpf) VALUES (?, ?, ?, ?, ?) RETURNING *'
    const { nome, login, senha, tipo } = usuario
    const id = await this.conexao.query(ComandoSQL.INSERT, sql, [nome, login, senha, tipo, usuario.cpf.getValue()]) //o banco sqlite retorna apenas o id
    if (id && typeof id === 'number') {
      usuario['id'] = id
    }
    return usuario
  }

  update(usuario: Usuario): Promise<any> {
    const { id, ...dadosAtualizacao } = usuario
    const colunas = Object.keys(dadosAtualizacao)
    const valores = Object.values(dadosAtualizacao)
    const atualizacoes = colunas.map(coluna => `${coluna} = ?`).join(', ')
    const sql = `UPDATE usuario SET ${atualizacoes} WHERE id = ?`;
    const parametros = [...valores, id]
    return this.conexao.query(ComandoSQL.UPDATE, sql, parametros)
  }

  delete(id: number): Promise<void> {
    const sql = 'DELETE FROM usuario WHERE id = ?'
    return this.conexao.query(ComandoSQL.DELETE, sql, [id])
  }
}
