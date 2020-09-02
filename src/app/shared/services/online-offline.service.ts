import { NbToastrService } from '@nebular/theme';
import { Subject, Observable } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { AbstractService } from '../../@core/mpma/abstract-service';

@Injectable({
  providedIn: 'root'
})
export class OnlineOfflineService extends AbstractService {
  private statusConexao$ = new Subject<boolean>();

  constructor(  injector: Injector) {
    super(injector);

    window.addEventListener('online', () => {
      this.showSuccessMsg(
        'Dispositivo Conectado',
        'Seu dispositivo está conectado à internet novamente!'
      );
      this.atualizaStatusConexao();
    });
    window.addEventListener('offline', () => {
      this.showWarningMsg(
        'Dispositivo Desconectado',
        'Verifique a conexão do seu dispositivo à internet!'
      );
      this.atualizaStatusConexao();
    });
  }

  get isOnline(): boolean {
    return !!window.navigator.onLine;
  }

  get statusConexao(): Observable<boolean> {
    return this.statusConexao$.asObservable();
  }

  atualizaStatusConexao() {
    this.statusConexao$.next(this.isOnline);
  }
}
