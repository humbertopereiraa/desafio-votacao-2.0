import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TabelaComponent } from './tabela.component'
import { FiltarRegistroDaTabelaPipe } from 'src/app/core/pipes/filtarRegistroDaTabela.pipe'
import { FormartarDataPipe } from 'src/app/core/pipes/formartarData.pipe'
import { SessaoPipe } from 'src/app/core/pipes/sessao.pipe'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TabelaComponent,
    FiltarRegistroDaTabelaPipe,
    FormartarDataPipe,
    SessaoPipe
  ],
  exports: [TabelaComponent]
})
export class TabelaModule { }
