export interface IUsuario {
  id: number
  nome: string
  login: string
  senha?: string
  tipo: 'A' | 'N'
  cpf: string
}
