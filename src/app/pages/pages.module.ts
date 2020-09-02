import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NbMenuModule, NbTooltipModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';



@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbTooltipModule,
    ReactiveFormsModule
  ],
  declarations: [PagesComponent],
  providers: []
})
export class PagesModule {}
