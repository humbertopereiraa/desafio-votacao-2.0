import { CpfErro } from "../errors/cpfErro"

export class CPF {

  constructor(private value: string) {
    if (!this.isValid()) {
      throw new CpfErro('Cpf inválido')
    }
  }

  isValid(): boolean {
    const cpfRegex = /^(?:(\d{3}).(\d{3}).(\d{3})-(\d{2}))$/

    if (!cpfRegex.test(this.value)) return false

    const numeros = this.value.match(/\d/g)?.map(Number)

    if (!numeros || numeros.length !== 11) return false

    let soma, resto = 0

    soma = numeros.slice(0, 9).reduce((acc, cur, idx) => {
      return acc + cur * (10 - idx)
    }, 0)

    resto = (soma * 10) % 11
    if (resto === 10 || resto === 11) {
      resto = 0
    }

    if (resto !== numeros[9]) return false

    soma = numeros.slice(0, 10).reduce((acc, cur, idx) => {
      return acc + cur * (11 - idx)
    }, 0)

    resto = (soma * 10) % 11
    if (resto === 10 || resto === 11) resto = 0
    if (resto !== numeros[10]) return false

    return true
  }

  getValue(): string {
    return this.value
  }
}
