import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-not-permited',
  styleUrls: ['./not-permited.component.scss'],
  templateUrl: './not-permited.component.html'
})
export class NotPermitedComponent {
  constructor(private router: Router) {}

  goToHome() {
    this.router.navigate(['/pages']);
  }
}
