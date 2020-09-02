import { Municipio } from './../dto/municipio';

import { Uf } from './../dto/uf';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NbToastrService } from '@nebular/theme';
import { AbstractService } from '../../@core/mpma/abstract-service';

@Injectable({
  providedIn: 'root'
})
export class BasicService extends AbstractService {
  private endpoint: string;
  private headers: HttpHeaders;

  constructor( injector: Injector, private http: HttpClient) {
    super(injector);
    this.endpoint = `${environment.apiEndpoint}`;
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
  }

  buscarUnidadesSaudePorUf(sigla): Promise<any> {
    return this.http
      .get<any>(
        this.endpoint +
          `/unidade-saude/search/findByUf?siglaUf=${encodeURIComponent(
            String(sigla)
          )}`,
        { headers: this.headers }
      )
      .pipe(
        map(obj => {
          if (obj._embedded) {
            return obj._embedded['unidadeSaudeResultDtoes'];
          }
          return [];
        }),
        catchError(e => this.handleError(e))
      )
      .toPromise();
  }



  buscarMunicipioPorIbge(cnes_municipios_vinc: string[]): Promise<any> {
    return this.http
      .get<any>(
        this.endpoint +
          '/municipio/search/findByCodCnesIn?codCnes=' +
          cnes_municipios_vinc.join('&codCnes='),
        { headers: this.headers }
      )
      .pipe(
        map(obj => {
          if (obj._embedded) {
            return obj._embedded['municipios'];
          }
          return [];
        }),
        catchError(e => this.handleError(e))
      )
      .toPromise();
  }

  buscarUnidadesSaudePorUsuario(idUsuario): Promise<any> {
    return this.http
      .get<any>(
        this.endpoint +
          '/unidade-saude/search/findByUsuarioVinculo?idUsuario=' +
          idUsuario,
        { headers: this.headers }
      )
      .pipe(
        map(obj => {
          if (obj._embedded) {
            return obj._embedded['unidades-saude'];
          }
          return [];
        }),
        catchError(e => this.handleError(e))
      )
      .toPromise();
  }


  buscarUfs(): Observable<any> {
    return this.http
      .get<Uf>(this.endpoint + '/uf', { headers: this.headers })
      .pipe(
        map(obj => {
          return obj;
        }),
        catchError(e => this.handleError(e))
      );
  }

  async buscarUfBySiglaIgnoreCase(sigla: string): Promise<Uf> {
    return this.http
      .get<Uf>(
        `${this.endpoint}/uf/search/findBySiglaIgnoreCase?sigla=${sigla}`,
        { headers: this.headers }
      )
      .pipe(
        map(obj => {
          return obj;
        }),
        catchError(e => this.handleError(e))
      )
      .toPromise();
  }

  buscarMunicipios(idUf): Promise<any> {
    return this.http
      .get<Municipio>(
        this.endpoint + '/municipio/search/findMunicipiosByUfId?ufId=' + idUf,
        { headers: this.headers }
      )
      .pipe(
        map(obj => {
          return obj;
        }),
        catchError(e => this.handleError(e))
      )
      .toPromise();
  }
}
