import { routes } from './auth.routes';
import { Nb3LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Nb3AuthComponent } from './components/auth.component';
import { NgModule } from '@angular/core';
import {
  NbMenuModule,
  NbLayoutModule,
  NbCardModule,
  NbCheckboxModule,
  NbAlertModule,
  NbInputModule,
  NbButtonModule,
  NbRadioModule
} from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { InputTextModule } from 'primeng/inputtext';
import { LogoutComponent } from './components/logout/logout.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbMenuModule,
    NbRadioModule,
    NbLayoutModule,
    NbCardModule,
    NbCheckboxModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    InputTextModule
  ],
  declarations: [Nb3AuthComponent, Nb3LoginComponent, LogoutComponent],
  exports: [Nb3AuthComponent, Nb3LoginComponent, RouterModule]
})
export class AuthModule {}
