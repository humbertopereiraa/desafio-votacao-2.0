import { CPF } from '../src/domain/entity/cpf'

describe('CPF', () => {
  it('Deve validar cpf Válido: ', () => {
    const sut = new CPF('647.565.860-07')
    expect(sut.isValid()).toBe(true)
  })

  it('Deve gerar erro com cpf inválido: ', () => {
    expect(() => {
      new CPF('000.000.001-07')
    }).toThrow('Cpf inválido')
  })
})