import { ComandoSQL, Conexao } from "./conexao"
import sqlite3 from 'sqlite3'

export class SqliteDB implements Conexao {

  db = new sqlite3.Database('./database.sqlite')

  constructor() {
    this.inicializarBancoDeDados()
  }

  public async query(comando: ComandoSQL, sql: string, parametros: any[]): Promise<any> {
    if (comando === ComandoSQL.SELECT) {
      const output = await this.all(sql, parametros)
      return output
    }
    this.db.run(sql, parametros)
  }

  private all(sql: string, parametros: any[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.db.all(sql, parametros, (error, rows) => {
        if (error) {
          reject(error)
          return
        }
        resolve(rows)
      })
    })
  }

  private async inicializarBancoDeDados(): Promise<void> {
    await this.criarTabelas()
    this.criarRegistroDefault()
  }

  private async criarTabelas(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const tabelaUsuario = `CREATE TABLE IF NOT EXISTS usuario (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome VARCHAR(40) NOT NULL,
          login VARCHAR(30) NOT NULL UNIQUE,
          senha VARCHAR(30) NOT NULL,
          tipo CHAR(1) NOT NULL,
          cpf VARCHAR(11) NOT NULL UNIQUE
        )`
        await this.executarQuery(tabelaUsuario)
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  private async executarQuery(query: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.db.run(query, (error) => {
        if (error) {
          reject(error)
          return
        }
        resolve()
      })
    })
  }

  private async criarRegistroDefault(): Promise<void> {
    this.db.get('SELECT * FROM usuario LIMIT 1', (error, row) => {
      if (error) { //TODO: ADICIONAR LOG
        console.log(error)
        return
      }

      if (!row) {
        const sql = `INSERT INTO usuario (nome, login, senha, tipo, cpf) VALUES (?, ?, ?, ?, ?)`
        const parametros = ['Administrador', 'admin', '$2a$10$6V5JooDh4N3U2pkY1CScu.G.9Qq97keV7yfPMNJdYUDibj6dL7F/e', 'A', '000000000']
        this.db.run(sql, parametros)
      }
    })
  }
}
