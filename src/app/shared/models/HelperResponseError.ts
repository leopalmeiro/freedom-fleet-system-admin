import { ResponseError } from './ResponseError';
import { Erro } from './Erro';

export class HelperResponseError implements ResponseError {
  url?: String;
  status?: number;
  statusText?: String;
  message?: String;
  errors?: Erro[];
  hasError?: Boolean;
  constructor(){}

  toStrint(){
    return 'dsads';
  }
}
