import HTTP from "./http"
import express, { Application, NextFunction } from 'express'
import cors from "cors"
import helmet from "helmet"
import { RequestParams, validacao } from "../../utils/request-validador"
import { BAD_REQUEST, OK, SERVER_ERROR, UNAUTHORIZED } from "../../utils/error"
import { JwtTokenAdapter } from "../../utils/jwtTokenAdapter"
import { Configuracao } from "../../configuracao"

export class ExpressAdapter extends HTTP {
  app: Application
  constructor() {
    super()
    this.app = express()
    this.config()
  }

  private config(): void {
    this.app.use(helmet())
    this.app.use(cors())
    this.app.use(express.urlencoded({ extended : true }))
    this.app.use(express.json())
    this.app.use(this.authMiddleware)
  }

  /**Middleware para autenticação do usuário antes de consumir o serviço da API */
  protected async authMiddleware(req: any, res: any, next: NextFunction) {
    if (req.url.startsWith('/api')) {
      const token = req.headers['authorization']
      if (!token) {
        return res.status(UNAUTHORIZED).json({ message: 'Token não fornecido' })
      }
      const jwtTokenAdapter = new JwtTokenAdapter()
      const isTokenValid = await jwtTokenAdapter.verificar(token, Configuracao.token.chave as string)
      if (!isTokenValid) {
        return res.status(UNAUTHORIZED).json({ message: 'Token inválido' })
      }
    }
    next()
  }

  on(url: string, metodo: string, validacoes: RequestParams[], fn: (req: any) => Promise<any>): void {
    // @ts-ignore
    this.app[metodo](url, async (req: any, res: any) => {
      try {
        if (validacoes.length) {
          const parametros = Object.keys(req.query).length ? req.query : req.body
          const errors = validacao(validacoes, parametros)
          if (errors.length) {
            return res.status(BAD_REQUEST).json({ erros: errors })
          }
        }
        const output = await fn(req)
        return res.status(OK).json(output)
      } catch (error: any) {
        return res.status(error?.code && typeof error.code === 'number' ? error.code : SERVER_ERROR).json(error)
      }
    })
  }

  listen(porta: number): void {
    this.app.listen(porta)
    console.log(`Servidor Express rodando na porta: ${porta}`)
  }
}
