import {
  NbToastrService,
  NbComponentStatus,
  NbGlobalPhysicalPosition
} from '@nebular/theme';
import { Injector } from '@angular/core';

export abstract class AbstractMsgController {
  status: NbComponentStatus = 'primary';
  protected toastrService: NbToastrService;
  config = {
    status: this.status,
    destroyByClick: true,
    duration: 5000,
    hasIcon: true,
    position: NbGlobalPhysicalPosition.TOP_RIGHT,
    preventDuplicates: false
  };

  constructor(injector: Injector) {
     this.toastrService = injector.get(NbToastrService);
  }

  showInfoMsg(title: string, body: string) {
    this.showToast('info', title, body);
  }

  showSuccessMsg(title: string, body: string) {
    this.showToast('success', title, body);
  }

  showDangerMsg(title: string, body: string) {
    this.showToast('danger', title, body);
  }

  showWarningMsg(title: string, body: string) {
    this.showToast('warning', title, body);
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    this.config.status = type;
    this.toastrService.show(body, title, this.config);
  }
}
