import { NotPermitedComponent } from './not-permited/not-permited.component';

import { FieldsetModule } from 'primeng/fieldset';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbListModule,
  NbRouteTabsetModule,
  NbAutocompleteModule,
  NbStepperModule,
  NbTabsetModule,
  NbUserModule,
  NbActionsModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbTooltipModule
} from '@nebular/theme';
import { FormsModule as ngFormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { SelecionaCidadeEstadoComponent } from './seleciona-cidade-estado/seleciona-cidade-estado.component';
import { TableModule } from 'primeng/table';
import { PickListModule } from 'primeng/picklist';
import { InputMaskModule } from 'primeng/inputmask';
import { KeyFilterModule } from 'primeng/keyfilter';
import { DialogConfirmComponent } from '../components/dialog-confirm/dialog-confirm';
import { CalendarModule } from 'primeng/calendar';
import { NotFoundComponent } from './not-found/not-found.component';
import { HasPermissionDirective } from '../../shared/directives/hasPermission.directive';
import { AtualizarComponent } from './atualizar/atualizar.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbCardModule,
    NbButtonModule,
    NbListModule,
    NbAccordionModule,
    NbUserModule,
    ThemeModule,
    NbInputModule,
    NbAutocompleteModule,
    NbActionsModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbTooltipModule,
    NbSelectModule,
    NbIconModule,
    ngFormsModule,
    TableModule,
    PickListModule,
    InputMaskModule,
    KeyFilterModule,
    CalendarModule,
    FieldsetModule
  ],
  declarations: [
    SelecionaCidadeEstadoComponent,
    DialogConfirmComponent,
    NotFoundComponent,
    NotPermitedComponent,
    HasPermissionDirective,
    AtualizarComponent,
    HomeComponent
  ],
  providers: [],
  exports: []
})
export class ModulesModule {}
