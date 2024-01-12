export interface IVotacao {
  id_pauta: number
  id_usuario: number
  voto: EVOTO
}

export enum EVOTO {
  SIM = 'S',
  NAO = 'N'
}

export enum ETemplateVotacao {
  ERRO,
  SUCESSO,
  VOTACAO
}