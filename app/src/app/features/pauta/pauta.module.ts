import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PautaComponent } from './pauta.component'
import { RouterModule, Routes } from '@angular/router'
import { DetalhesDaPautaComponent } from './components/detalhes-da-pauta/detalhes-da-pauta.component'
import { ListaDePautasComponent } from './components/lista-de-pautas/lista-de-pautas.component'
import { CadastroDaPautaComponent } from './components/cadastro-da-pauta/cadastro-da-pauta.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FormartarDataPipe } from 'src/app/core/pipes/formartarData.pipe'
import { SessaoPipe } from 'src/app/core/pipes/sessao.pipe'
import { FiltarPautasPipe } from 'src/app/core/pipes/filtarPautas.pipe'

const routes: Routes = [
  { path: '', component: ListaDePautasComponent },
  { path: 'cadastro', component: CadastroDaPautaComponent },
  { path: ':id', component: DetalhesDaPautaComponent },
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,   
    RouterModule.forChild(routes)
  ],
  declarations: [
    PautaComponent,
    ListaDePautasComponent,
    DetalhesDaPautaComponent,
    CadastroDaPautaComponent,
    FormartarDataPipe,
    SessaoPipe,
    FiltarPautasPipe
  ],
  exports: [PautaComponent]
})
export class PautaModule { }
