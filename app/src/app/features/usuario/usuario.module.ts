import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UsuarioComponent } from './usuario.component'
import { RouterModule, Routes } from '@angular/router'
import { ListaDeUsuariosComponent } from './components/lista-de-usuarios/lista-de-usuarios.component'
import { CadastroDeUsuarioComponent } from './components/cadastro-de-usuario/cadastro-de-usuario.component'
import { FiltarUsuariosPipe } from 'src/app/core/pipes/filtarUsuarios.pipe'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TipoUsuarioPipe } from 'src/app/core/pipes/tipoUsuario.pipe'
import { CpfMaskDirective } from 'src/app/core/directives/cpfMask.directive'

const routes: Routes = [
  { path: '', component: ListaDeUsuariosComponent },
  { path: 'cadastro', component: CadastroDeUsuarioComponent }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,   
    RouterModule.forChild(routes)
  ],
  declarations: [
    UsuarioComponent,
    ListaDeUsuariosComponent,
    CadastroDeUsuarioComponent,
    FiltarUsuariosPipe,
    TipoUsuarioPipe,
    CpfMaskDirective
  ],
  exports: [UsuarioComponent]
})
export class UsuarioModule { }
