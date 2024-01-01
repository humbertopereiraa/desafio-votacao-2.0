import { DatePipe } from '@angular/common'
import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'formartarData'
})
export class FormartarDataPipe implements PipeTransform {

  transform(dataEmMilissegundos: number | Date): string {
    const data = new Date(dataEmMilissegundos)
    const dia = ('0' + data.getDate()).slice(-2)
    const mes = ('0' + (data.getMonth() + 1)).slice(-2)
    const ano = data.getFullYear()
    const horas = ('0' + data.getHours()).slice(-2)
    const minutos = ('0' + data.getMinutes()).slice(-2)
    return `${dia}/${mes}/${ano} ${horas}:${minutos}`
  }

}
