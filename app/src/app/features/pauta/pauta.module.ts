import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PautaComponent } from './pauta.component'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  { path: '', component: PautaComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PautaComponent],
  exports: [PautaComponent]
})
export class PautaModule { }
