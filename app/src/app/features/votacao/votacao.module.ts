import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { VotacaoComponent } from './votacao.component'
import { RouterModule, Routes } from '@angular/router'
import { PautasComponent } from './components/pautas/pautas.component'
import { VotoComponent } from './components/voto/voto.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { PipePautaSharedModule } from 'src/app/shared/pipe-pauta-shared/pipe-pauta-shared.module'

const routes: Routes = [
  { path: '', component: PautasComponent },
  { path: ':id', component: VotoComponent },
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, 
    PipePautaSharedModule,  
    RouterModule.forChild(routes)
  ],
  declarations: [
    VotacaoComponent,
    PautasComponent,
    VotoComponent
  ],
  exports: [VotacaoComponent]
})
export class VotacaoModule { }
