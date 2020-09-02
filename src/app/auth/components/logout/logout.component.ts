import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-logout',
  templateUrl: './logout.component.html',
  styles: []
})
export class LogoutComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authenticationService.logout();
    this.router.navigate(['/auth/login']);
  }
}
