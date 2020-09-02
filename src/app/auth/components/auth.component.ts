/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'nb3-auth',

  template: `
    <nb-layout>
      <nb-layout-column style=" padding: 0px !important;">
        <router-outlet></router-outlet>
      </nb-layout-column>
    </nb-layout>
  `
})
export class Nb3AuthComponent implements OnDestroy {
  private alive = true;
  subscription: any;

  authenticated: boolean = false;
  token: string = '';

  // showcase of how to use the onAuthenticationChange method
  constructor(protected location: Location) {}

  back() {
    this.location.back();
    return false;
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
