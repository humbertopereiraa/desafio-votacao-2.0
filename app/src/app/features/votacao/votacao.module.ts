import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { PautasComponent } from './components/pautas/pautas.component'
import { VotoComponent } from './components/voto/voto.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TabelaModule } from 'src/app/shared/tabela/tabela.module'

const routes: Routes = [
  { path: '', component: PautasComponent },
  { path: ':id', component: VotoComponent },
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
    PautasComponent,
    VotoComponent
  ]
})
export class VotacaoModule { }
