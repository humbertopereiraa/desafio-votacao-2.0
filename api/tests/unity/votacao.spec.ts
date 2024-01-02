import { Pauta } from '../../src/domain/entity/pauta'
import { Votacao } from '../../src/domain/entity/votacao'

describe('Votação', () => {
  it('Deve criar uma instância da Entidade Votação: ', () => {
    const pauta = new Pauta(1, 'Teste', 'Teste', 1, new Date())
    expect(() => {
      new Votacao(pauta, 1, 'S')
    }).not.toThrow()
  })

  it('Não deve criar uma Votação, caso a sessão tenha expirado', () => {
    const pauta = new Pauta(1, 'Teste', 'Teste', 1, new Date('2024-01-01 00:00:00'))
    expect(() => {
      new Votacao(pauta, 1, 'S')
    }).toThrow('Não é possivel votar em uma pauta com sessão expirada!')
  })
})