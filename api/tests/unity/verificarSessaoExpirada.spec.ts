import { sessaoExpirou } from './../../src/utils/verificarSessaoExpirada'

describe('Sessão Expirada', () => {
  it('Deve verificar se Sessão Está Expirada: ', () => {
    const dataCriacaoPauta = new Date('2024-01-01 10:00:00')
    const tempoSessaoEmMinuto = 2 
    const sut = sessaoExpirou(dataCriacaoPauta, tempoSessaoEmMinuto)
    expect(sut).toBe(true)
  })

  it('Deve verificar se Sessão Está Ativa: ', () => {
    const dataCriacaoPauta = new Date()
    const tempoSessaoEmMinuto = 20
    const sut = sessaoExpirou(dataCriacaoPauta, tempoSessaoEmMinuto)
    expect(sut).toBe(false)
  })
})