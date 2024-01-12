export interface IUsuarioLogin {
  login: string
  senha: string
  token?: string
}

export enum ETipoUsuario {
  ADMINISTRADOR = 'A',
  NORMAL = 'N'
}