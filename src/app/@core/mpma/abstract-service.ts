import { Injector } from '@angular/core';
import { AbstractMsgController } from './abstract-msg-controller';
import { NbToastrService, NbIconLibraries } from '@nebular/theme';
import { throwError } from 'rxjs';

export abstract class AbstractService extends AbstractMsgController {


  protected toastrService: NbToastrService;
  iconsLibrary: NbIconLibraries;
  constructor(injector: Injector) {
    super(injector);
    this.iconsLibrary = injector.get(NbIconLibraries);
    this.iconsLibrary.registerFontPack('fas', {
      packClass: 'fas',
      iconClassPrefix: 'fa'
    });

    this.iconsLibrary.registerFontPack('far', {
      packClass: 'far',
      iconClassPrefix: 'fa'
    });
 }

  showMsgSucesso(): void {
    super.showSuccessMsg('Sucesso', 'Operação realizada com sucesso!');
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.log(errorMessage);

    super.showDangerMsg(`Erro ${error.status}`, errorMessage);

    return throwError(errorMessage);
  }
}


