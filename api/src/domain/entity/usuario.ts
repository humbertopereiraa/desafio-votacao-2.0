export enum tipo { ADMIN = 'A', NORMAL = 'N'}

export class Usuario {
  id: number
  nome: string
  login: string
  senha: string
  tipo: tipo
  //cpf: CPF TODO: Implementar
  token?: string

  constructor(id: number, nome: string, login: string, senha: string, tipo: tipo) {
    this.id = id
    this.nome = nome
    this.login = login
    this.senha = senha
    this.tipo = tipo
  }
}
