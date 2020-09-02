import { environment } from './../../../environments/environment';
import { ApplicationRef, Injectable, Injector } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { concat, interval } from 'rxjs';
import { first } from 'rxjs/operators';
import { AbstractMsgController } from '../../@core/mpma/abstract-msg-controller';
import { NbToastrService } from '@nebular/theme';

@Injectable()
export class CheckForUpdateService extends AbstractMsgController {
  updates: SwUpdate;

  constructor(
    appRef: ApplicationRef,
    updates: SwUpdate,
    injector: Injector
  ) {
    super(injector);
    this.updates = updates;

    const appIsStable$ = appRef.isStable.pipe(
      first(isStable => isStable === true)
    );

    const everyMinutes$ = interval(environment.checkUpdateTimeInMinutes);
    const everyMinutesOnceAppIsStable$ = concat(appIsStable$, everyMinutes$);

    everyMinutesOnceAppIsStable$.subscribe(() => {
      updates
        .checkForUpdate()
        .then(() => console.log('checking for updates...', new Date()));
    });

    updates.activated.subscribe(event => {
      super.showInfoMsg(
        'Atualização',
        `Aplicação atualizada da versão ${event.previous.hash} para versão ${event.current.hash}!`
      );
    });
  }

  public checkForUpdates(): void {
    this.updates.available.subscribe(event => {
      console.log('A new version was detected! System will update.');
      this.promptUser();
    });
  }

  private promptUser(): void {
    this.updates.activateUpdate().then(() => {
      console.log('Updating...');
      document.location.reload();
    });
  }
}
