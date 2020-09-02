import { HomeComponent } from './modules/home/home.component';
import { NotPermitedComponent } from './modules/not-permited/not-permited.component';

import { AuthGuard } from './../shared/guards/auth-guard';
import { NotFoundComponent } from './modules/not-found/not-found.component';

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { AtualizarComponent } from './modules/atualizar/atualizar.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'notpermited',
        component: NotPermitedComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'atualizar',
        component: AtualizarComponent
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
