
import { NbMenuItem } from '@nebular/theme';
import { AuthenticationService } from './../shared/services/authentication.service';
import { Component } from '@angular/core';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="MENU_ITEMS"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `
})
export class PagesComponent {

  MENU_ITEMS: NbMenuItem[] = [
    {
      title: 'Matéria Atuação',
      icon: 'file-text-outline',
      link: '/pages/home'
    },
    {
      title: 'Correição e Inspeção ',
      icon: 'file-text-outline',
      link: '/pages/home'
    },

    {
      title: 'Cadastros',
      icon: 'lock-outline',

      children: [
        {
          title: 'Manter Unidade ',
          link: '/pages/consultaperfil',
          icon: 'people-outline',

        },
        {
          title: 'Manter Membros ',
          link: '/pages/consultausuario',
          icon: 'person-outline',

        }
      ]
    },
    {
      title: 'Configurações',
      icon: 'lock-outline',
      children: [
           {
          title: 'Sair',
          link: '/auth/logout'
        }
      ]
    }
  ];

  constructor(private authenticationService: AuthenticationService) {}


}
