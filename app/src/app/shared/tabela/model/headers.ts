export interface IHeaders { //TODO: Adicionar PIPE
  label: string
  key: string
  classe?: string
  tipoPipe?: ETipoPipe
}

export enum ETipoPipe {
  FORMATAR_DATA = 'data',
  STATUS_SESSAO = 'sessao',
  TIPO_USUARIO = 'tipoUsuario'
}