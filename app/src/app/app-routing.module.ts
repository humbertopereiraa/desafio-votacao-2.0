import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from './core/guards/auth.guard'

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule) },
  { path: 'pauta', loadChildren: () => import('./features/pauta/pauta.module').then(m => m.PautaModule), canActivate: [AuthGuard] },
  { path: 'votacao', loadChildren: () => import('./features/votacao/votacao.module').then(m => m.VotacaoModule), canActivate: [AuthGuard] },
  { path: 'usuario', loadChildren: () => import('./features/usuario/usuario.module').then(m => m.UsuarioModule), canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/votacao' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
