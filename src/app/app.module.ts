import { AppSettings } from './shared/app-settings';
import { BasicService } from './shared/services/basic.service';
import { AuthenticationService } from './shared/services/authentication.service';
import { CheckForUpdateService } from './shared/services/check-for-update.service';
import { LoaderComponent } from './pages/modules/loader/loader.component';
import { LoaderInterceptorService } from './shared/interceptors/loader-interceptor.service';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule
} from '@nebular/theme';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData, CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
registerLocaleData(localePt);

@NgModule({
  declarations: [AppComponent, LoaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDateFnsDateModule.forRoot({ format: 'dd/MM/yyyy' }),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY'
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerImmediately'
    })
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    CheckForUpdateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private sw: CheckForUpdateService,

    private basicService: BasicService,
    private authenticationService: AuthenticationService,

  ) {
    // check the service worker for updates
    if (environment.production) {
      this.sw.checkForUpdates();
    }


  }

}
