import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PautaComponent } from './pauta.component'
import { RouterModule, Routes } from '@angular/router'
import { DetalhesDaPautaComponent } from './components/detalhes-da-pauta/detalhes-da-pauta.component'
import { ListaDePautasComponent } from './components/lista-de-pautas/lista-de-pautas.component'

const routes: Routes = [
  { path: '', component: ListaDePautasComponent },
  { path: ':id', component: DetalhesDaPautaComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PautaComponent,
    ListaDePautasComponent,
    DetalhesDaPautaComponent
  ],
  exports: [PautaComponent]
})
export class PautaModule { }
