import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UsuarioComponent } from './usuario.component'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  { path: '', component: UsuarioComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UsuarioComponent],
  exports: [UsuarioComponent]
})
export class UsuarioModule { }
