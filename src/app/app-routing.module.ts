import { Nb3LoginComponent } from './auth/components/login/login.component';
import { Nb3AuthComponent } from './auth/components/auth.component';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './shared/guards/auth-guard';
import { LogoutComponent } from './auth/components/logout/logout.component';

export const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    component: Nb3AuthComponent,
    children: [
      { path: 'login', component: Nb3LoginComponent },
      { path: 'logout', component: LogoutComponent }
    ]
  },
  { path: '', redirectTo: '/pages/home', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

const config: ExtraOptions = {
  useHash: false
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
