import { Nb3AuthComponent } from './components/auth.component';
import { Nb3LoginComponent } from './components/login/login.component';
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: 'auth',
    component: Nb3AuthComponent,
    children: [
      {
        path: '',
        component: Nb3LoginComponent,
      },
      {
        path: 'login',
        component: Nb3LoginComponent,
      },

    ],
  },
];
