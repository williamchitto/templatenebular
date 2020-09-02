
import { AppSettings } from './../../../shared/app-settings';

import { BasicService } from './../../../shared/services/basic.service';
import { OnInit, Injector } from '@angular/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DominioTipoLogin } from '../../../shared/enum/DominioTipoLogin';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AbstractMsgController } from '../../../@core/mpma/abstract-msg-controller';

import { AuthenticationService } from '../../../shared/services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Nb3LoginComponent extends AbstractMsgController implements OnInit {
  submitted = false;
  public dominioTipoLogin = DominioTipoLogin;
  loginForm: FormGroup;
  keys = Object.keys;
  returnUrl: string;

  constructor(
    injector: Injector,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private basicService: BasicService,
  ) {
    super(injector);

    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/pages/home']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      tipo: ['USUARIO_SISTEMA', Validators.required],
      login: [, Validators.required],
      senha: [, Validators.required]
    });

    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'] ||
      '/pages/home';
  }

  get f() {
    return this.loginForm.controls;
  }

  async login() {
    this.router.navigate([this.returnUrl]);
    /*
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.authenticationService
      .login({
        login: this.loginForm.controls.login.value,
        senha: this.loginForm.controls.senha.value,
        tipoLogin: this.loginForm.controls.tipo.value
      })
      .pipe(first())
      .subscribe(
      async  nomeUsuario => {
              this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log(error);
          super.showDangerMsg('Erro', 'Usuário ou Senha inválidos.');
        }
      );*/
  }


}
