import { AppSettings } from './../../../shared/app-settings';
import { takeWhile } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Municipio } from './../../../shared/dto/municipio';
import { BasicService } from './../../../shared/services/basic.service';
import { Uf } from './../../../shared/dto/uf';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ViewChild,
  OnChanges
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ngx-seleciona-cidade-estado',
  templateUrl: './seleciona-cidade-estado.component.html',
  styleUrls: ['./seleciona-cidade-estado.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelecionaCidadeEstadoComponent),
      multi: true
    }
  ]
})
export class SelecionaCidadeEstadoComponent
  implements OnInit, ControlValueAccessor, OnChanges {
  constructor(private basicService: BasicService) {}
  @Input() edit: boolean;
  @Input() labelUF: string = 'Estado';
  @Input() labelCidade: string = 'Município';
  @Input() rowData: any;
  @Input() disabled: boolean;
  ufs: Uf[];
  municipios: Municipio[];
  @Output() municipio: Municipio;

  @Input() municipioSelecionado: Municipio;

  options: string[];
  filteredUfs: Observable<Uf[]>;
  filtereMunicipios: Observable<Municipio[]>;
  ufValue: string;
  municipioValue: string;
  @ViewChild('inputUf') inputUf;
  @ViewChild('inputCidade') inputCidade;

  @Output() onChangeUf: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
    this.ufs = [];
    this.configurarEstado();
  }

  ngOnChanges(): void {
    if (this.municipioSelecionado != null) {
      this.onUfChange(this.municipioSelecionado.uf);
    }
    if (this.disabled != null && this.inputUf) {
      this.inputUf.nativeElement.disabled = this.disabled;
    }
    if (this.disabled != null && this.inputCidade) {
      this.inputCidade.nativeElement.disabled = this.disabled;
    }
  }

  onChange = (_: any) => {};

  onTouched = () => {};

  onModelChange(value) {
    this.filteredUfs = of(this.filterUf(value));
  }

  onMunicipioChange(value) {
    if (value === '') {
      this.propagateChange(null);
      this.onChangeUf.emit(null);
    }
    this.filtereMunicipios = of(this.filterMunicipio(value));
  }

  private filterUf(value: any): Uf[] {
    let filterValues = '';
    if (typeof value === 'string') {
      filterValues = value.toLowerCase();
    } else {
      filterValues = value.nomeComSigla.toLowerCase();
    }
    return this.ufs.filter(uf => uf.nome.toLowerCase().includes(filterValues));
  }

  private filterMunicipio(value: any): Municipio[] {
    let filterValues = '';

    if (typeof value === 'string') {
      filterValues = value.toLowerCase();
    } else {
      filterValues = value.nome.toLowerCase();
    }

    return this.municipios.filter(muni =>
      muni.nome.toLowerCase().includes(filterValues)
    );
  }

  viewHandle2(value) {
    if (value.nome === undefined) {
      return value;
    }
    return value.nome.toUpperCase();
  }

  viewHandle(value) {
    if (value.nome === undefined) {
      return value;
    }
    return value.nomeComSigla.toUpperCase();
  }
  alive = true;

  async configurarEstado() {
    this.basicService
      .buscarUfs()
      .pipe(takeWhile(() => this.alive))
      .subscribe(async retorno => {
        this.ufs = retorno._embedded['ufs'];

        this.filteredUfs = of(this.ufs);

        if (!this.edit) {
          const uf = await this.ufs.find(a => a.sigla === AppSettings.DEFAULT_UF);

          this.onUfChange(uf);

          this.ufValue = uf.nomeComSigla;

          this.inputUf.nativeElement.value = uf.nomeComSigla;
        }
      });
  }

  writeValue(value: any) {
    if (value !== null) {
      this.municipio = value;
    }
  }

  onUfChange(event) {
    if (event.id === undefined) {
      return;
    }

    this.municipios = [];

    this.basicService.buscarMunicipios(event.id).then(retorno => {
      this.municipios = retorno._embedded['municipios'];
      this.inputCidade.nativeElement.value = '';
      this.filtereMunicipios = of(this.municipios);

      if (this.municipioSelecionado !== undefined && this.municipioSelecionado !== null) {
        this.inputCidade.nativeElement.value = this.municipioSelecionado.nome;
        this.ufValue = this.municipioSelecionado.uf.nomeComSigla;
        this.onMunicipioChangeSelect(this.municipioSelecionado);
      }
    });
  }

  onMunicipioChangeSelect(event) {
    if (event.id) {
      this.municipio = event;
      this.propagateChange(this.municipio);
      this.onChangeUf.emit(this.municipio);
    }
  }

  propagateChange = (_: any) => {};

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }
}
