import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoginDto, UsuarioLogadoDto } from '../dto/dto-auth';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private headers: HttpHeaders;
  private currentUserSubject: BehaviorSubject<UsuarioLogadoDto>;
  public currentUser: Observable<UsuarioLogadoDto>;
  jwtHelper: JwtHelperService;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    this.currentUserSubject = new BehaviorSubject<UsuarioLogadoDto>(
      JSON.parse(localStorage.getItem('currentUser'))
    );

    this.currentUser = this.currentUserSubject.asObservable();

    this.jwtHelper = new JwtHelperService();
  }

  public get currentUserValue(): UsuarioLogadoDto {
    return this.currentUserSubject.value;
  }

  login(loginDto: LoginDto) {
    return this.http
      .post<HttpResponse<LoginDto>>(
        `${environment.apiEndpoint}/login`,
        loginDto,
        {
          headers: this.headers,
          observe: 'response'
        }
      )
      .pipe(
        map(response => {
          const authorizationHeader = response.headers.get('authorization');

          const usuarioLogado = <UsuarioLogadoDto>(
            this.jwtHelper.decodeToken(authorizationHeader)
          );

          usuarioLogado.token = authorizationHeader;

          localStorage.setItem('currentUser', JSON.stringify(usuarioLogado));

          this.currentUserSubject.next(usuarioLogado);
          return usuarioLogado.nome;
        }),
        catchError(e => this.handleError(e))
      );
  }
  handleError(error) {
    let errorMessage = '';

    if (error.error && error.error.message) {
      errorMessage = `${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(errorMessage);
  }

  verifyPermissionDisable(permission: string) {
    return !this.currentUserValue.permissoes.includes(permission);
  }

  verifyPermissionNgIf(permission: string) {
    return this.currentUserValue.permissoes.includes(permission);
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.setItem('currentUser', null);
    this.currentUserSubject.next(null);
  }
}
