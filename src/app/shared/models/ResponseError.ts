import { Erro } from "./Erro";
export interface ResponseError {
  url?: String;
  status?: number;
  statusText?: String;
  message?: String;
  errors?: Erro[];
  hasError?: Boolean;
}
