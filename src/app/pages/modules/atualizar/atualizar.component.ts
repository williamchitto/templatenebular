import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'ngx-atualizar',
  templateUrl: './atualizar.component.html',
  styles: []
})
export class AtualizarComponent implements OnInit {
  constructor(updates: SwUpdate, private router: Router) {
    this.checkUpdate(updates);
  }

  ngOnInit(): void {}

  async checkUpdate(updates: SwUpdate): Promise<void> {
    if (environment.production) {
      await updates.checkForUpdate().then(() => {
        console.log('forced check for updates...', new Date());
      });
    }
    this.router.navigate(['/pages/home']);
  }
}
