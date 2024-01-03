import { Usuario } from '../src/domain/entity/usuario'

describe('Usuário', () => {
  it('Deve criar uma instância da Entidade Usuario: ', () => {
    expect(() => {
      new Usuario(1, 'Teste', 'Teste', 'Teste', 'A' as any, '647.565.860-07')
    }).not.toThrow()
  })

  it('Não deve criar um usuário, caso o cpf seja inválido', () => {
    expect(() => {
      new Usuario(1, 'Teste', 'Teste', 'Teste', 'A' as any, '000.000.001-07')
    }).toThrow('Cpf inválido')
  })
})