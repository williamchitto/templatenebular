import { Injector } from '@angular/core';
import { AbstractMsgController } from './abstract-msg-controller';
import { NbToastrService, NbIconLibraries } from '@nebular/theme';

export abstract class AbstractPagedController extends AbstractMsgController {
  first = 0;

  rows = 10;

  constructor( injector: Injector) {
    super(injector);


  }

  abstract getSearchResultLength(): number;

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.first === this.getSearchResultLength() - this.rows;
  }

  isFirstPage(): boolean {
    return this.first === 0;
  }
}
