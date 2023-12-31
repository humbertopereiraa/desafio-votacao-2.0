import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { VotacaoComponent } from './votacao.component'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  { path: '', component: VotacaoComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VotacaoComponent],
  exports: [VotacaoComponent]
})
export class VotacaoModule { }
