import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  OnInit
} from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Directive({
  selector: '[hasPermission]'
})
export class HasPermissionDirective implements OnInit {
  private currentUser;
  private permissions = [];
  private logicalOp = 'AND';
  private isHidden = true;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.updateView();
    });
  }

  @Input()
  set hasPermission(val) {
    this.permissions = val;
    this.updateView();
  }

  @Input()
  set hasPermissionOp(permop) {
    this.logicalOp = permop;
    this.updateView();
  }

  private updateView() {
    if (this.checkPermission()) {
      if (this.isHidden) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.isHidden = false;
      }
    } else {
      this.isHidden = true;
      this.viewContainer.clear();
    }
  }

  private existPermission(permissao: string): boolean {
    return this.currentUser.permissoes.find(
      (p: string) => p.toUpperCase() === permissao.toUpperCase()
    );
  }

  private checkPermission() {
    if (this.currentUser && this.currentUser.permissoes) {
      if (this.logicalOp === 'OR') {
        return this.permissions.some(permissao =>
          this.existPermission(permissao)
        );
      } else {
        return this.permissions.every(permissao =>
          this.existPermission(permissao)
        );
      }
    }
  }
}
