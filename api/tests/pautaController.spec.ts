
import { PautaController } from '../src/presentation/controller/pautaController'

describe('Pauta Controller', () => {

  let pautaController: PautaController

  const mockBuscarTodasPautas: any = {
    execute: jest.fn().mockResolvedValue([{ id: 1, descricao: 'Teste', categoria: 'Teste', tempoSessao: 1, data: new Date() }]),
  }
  const mockBuscarSomentePautasAtivas: any = {
    execute: jest.fn().mockResolvedValue([
      { id: 1, descricao: 'Teste', categoria: 'Teste', tempoSessao: 1, data: new Date('2024-01-01 00:00:00') },
    ]),
  }
  const mockBuscarDetalhesDePauta: any = {
    execute: jest.fn().mockResolvedValue({
      id_pauta: 1,
      descricao: 'Teste',
      totalVotos: 10,
      situacao: 'EXPIRADA',
      status: 'APROVADADA'
    }),
  }
  const mockInserirPauta: any = {
    execute: jest.fn().mockResolvedValue(1),
  }
  const mockDeletarPauta: any = {
    execute: jest.fn().mockResolvedValue(undefined)
  }

  beforeEach(() => {
    pautaController = new PautaController(
      mockBuscarTodasPautas,
      mockBuscarSomentePautasAtivas,
      mockInserirPauta,
      mockDeletarPauta,
      mockBuscarDetalhesDePauta,
    )
  })

  it('Deve buscar todas as pautas: ', async () => {
    const sut = await pautaController.all({})
    expect(sut.length > 0).toEqual(true)
    expect(mockBuscarTodasPautas.execute).toHaveBeenCalled()
  })

  it('Deve buscar somente pautas ativas: ', async () => {
    const sut = await pautaController.somentePautasAtivas({})
    expect(sut.length === 1).toEqual(true)
    expect(mockBuscarSomentePautasAtivas.execute).toHaveBeenCalled()
  })

  it('Deve retornar os detalhes da pauta correta: ', async () => {
    const req = {
      query: {
        id: 1, // Simula o ID da pauta
      },
    }
    const sut = await pautaController.getDetalhes(req)
    expect(sut).toEqual({
      id_pauta: 1,
      descricao: 'Teste',
      totalVotos: 10,
      situacao: 'EXPIRADA',
      status: 'APROVADADA'
    })
    expect(mockBuscarDetalhesDePauta.execute).toHaveBeenCalled()
  })

  it('Deve inserir uma pauta: ', async () => {
    const req = {
      body: {
        descricao: 'Teste',
        categoria: 'Teste',
        tempoSessao: 1
      },
    }
    const sut = await pautaController.inserir(req)
    expect(sut).toEqual(1)
    expect(mockInserirPauta.execute).toHaveBeenCalled()
  })

  
  it('Deve deletar uma pauta: ', async () => {
    const req = {
      query: {
        id: 1, // Simula o ID da pauta
      },
    }
    await pautaController.deletar(req)
    expect(mockDeletarPauta.execute).toHaveBeenCalledWith(req.query.id)
  })

})