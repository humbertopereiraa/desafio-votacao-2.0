import * as dotenv from "dotenv"
dotenv.config()

const Configuracao = {
  app: {
    title: process.env.APP_NAME,
    version: process.env.APP_VERSION
  },
  token: {
    chave: process.env.SECRET
  },
  http: {
    port: parseInt(process.env.HTTP_PORT ?? '3000')
  },
}
export { Configuracao }
