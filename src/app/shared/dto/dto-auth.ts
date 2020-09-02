import { DominioTipoLogin } from '../enum/DominioTipoLogin';

export interface LoginDto {
  login: string;
  senha: string;
  tipoLogin: DominioTipoLogin;
}

export interface SenhaDto {
  senha: string;
  senhaConfirmacao: string;
}

export interface UsuarioLogadoDto {
  sub: string;
  permissoes: string[];
  cnes_municipios_vinc: string[];
  iss: string;
  nome: string;
  exp: number;
  iat: number;
  email: string;
  token: string;
  perfil: string;
}
