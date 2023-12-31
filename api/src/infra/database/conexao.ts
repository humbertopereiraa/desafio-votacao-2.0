export enum ComandoSQL {
  SELECT = 'S',
  INSERT = 'I',
  DELETE = 'D',
  UPDATE = 'U'
}

export interface Conexao {
  query(comando: ComandoSQL, sql: string, parametros: any[]): Promise<any>
}
