import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { DetalhesDaPautaComponent } from './components/detalhes-da-pauta/detalhes-da-pauta.component'
import { ListaDePautasComponent } from './components/lista-de-pautas/lista-de-pautas.component'
import { CadastroDaPautaComponent } from './components/cadastro-da-pauta/cadastro-da-pauta.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TabelaModule } from 'src/app/shared/tabela/tabela.module'

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
    TabelaModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ListaDePautasComponent,
    DetalhesDaPautaComponent,
    CadastroDaPautaComponent
  ]
})
export class PautaModule { }
