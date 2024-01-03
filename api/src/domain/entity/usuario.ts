import { CPF } from "./cpf"

export enum tipo { ADMIN = 'A', NORMAL = 'N' }

export class Usuario {
  id: number | null
  nome: string
  login: string
  senha: string
  tipo: tipo
  cpf: CPF
  token?: string

  constructor(id: number | null, nome: string, login: string, senha: string, tipo: tipo, cpf: string) {
    this.id = id ?? null
    this.nome = nome
    this.login = login
    this.senha = senha
    this.tipo = tipo
    this.cpf = new CPF(cpf)
  }
}
