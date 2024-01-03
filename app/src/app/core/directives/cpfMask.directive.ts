import { Directive, ElementRef, HostListener } from '@angular/core'

@Directive({
  selector: '[cpfMask]'
})
export class CpfMaskDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInput(event: Event): void {
    const input = event.target as HTMLInputElement
    let trimmed = input.value.replace(/\D/g, '') // Remove todos os caracteres não numéricos

    if (trimmed.length > 11) {
      trimmed = trimmed.slice(0, 11) // Limita ao tamanho do CPF
    }

    if (trimmed.length > 3 && trimmed.length <= 6) {
      trimmed = trimmed.replace(/^(\d{3})/, '$1.') // Adiciona o primeiro ponto
    } else if (trimmed.length > 6 && trimmed.length <= 9) {
      trimmed = trimmed.replace(/^(\d{3})(\d{3})/, '$1.$2.') // Adiciona o segundo ponto
    } else if (trimmed.length > 9) {
      trimmed = trimmed.replace(/^(\d{3})(\d{3})(\d{3})/, '$1.$2.$3-') // Adiciona o traço
    }

    input.value = trimmed
  }
}
