import { Component, OnDestroy, OnInit, Injector } from '@angular/core';
import {
  NbMediaBreakpointsService,
  NbSidebarService,
  NbThemeService,
  NbToastrService
} from '@nebular/theme';

import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { AbstractMsgController } from '../../../@core/mpma/abstract-msg-controller';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html'
})
export class HeaderComponent extends AbstractMsgController
  implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light'
    },
    {
      value: 'dark',
      name: 'Dark'
    },
    {
      value: 'cosmic',
      name: 'Cosmic'
    },
    {
      value: 'corporate',
      name: 'Corporate'
    }
  ];

  currentTheme = 'default';

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  constructor(
    private sidebarService: NbSidebarService,
    private themeService: NbThemeService,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private router: Router,
    private authenticationService: AuthenticationService,
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    this.authenticationService.currentUser
      .pipe(takeUntil(this.destroy$))
      .subscribe(x => {
        this.user = x;
        super.showSuccessMsg(
          this.getSaudacao(),
          `${x.nome}, seu login foi realizado com sucesso!`
        );
      });

    const { xl } = this.breakpointService.getBreakpointsMap();

    this.themeService
      .onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl)
      );

    this.themeService
      .onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$)
      )
      .subscribe(themeName => (this.currentTheme = themeName));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.router.navigate(['/']);
    return false;
  }

  private getSaudacao(): string {
    const date: Date = new Date();
    if (date.getHours() > 6 && date.getHours() < 12) {
      return 'Bom dia';
    } else if (date.getHours() >= 12 && date.getHours() <= 18) {
      return 'Boa tarde';
    } else {
      return 'Boa noite';
    }
  }
}
