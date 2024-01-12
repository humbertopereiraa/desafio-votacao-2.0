import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { ListaDeUsuariosComponent } from './components/lista-de-usuarios/lista-de-usuarios.component'
import { CadastroDeUsuarioComponent } from './components/cadastro-de-usuario/cadastro-de-usuario.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CpfMaskDirective } from 'src/app/core/directives/cpfMask.directive'
import { TabelaModule } from 'src/app/shared/tabela/tabela.module'

const routes: Routes = [
  { path: '', component: ListaDeUsuariosComponent },
  { path: 'cadastro', component: CadastroDeUsuarioComponent }
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
    ListaDeUsuariosComponent,
    CadastroDeUsuarioComponent,
    CpfMaskDirective
  ]
})
export class UsuarioModule { }
