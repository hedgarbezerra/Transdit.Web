import { MatSnackBar } from '@angular/material/snack-bar';
import { DefaultResponse } from './../classes/DefaultResponse';
import { FormControl, FormGroup } from "@angular/forms";

export function getFormFromGroup(name : string, form: FormGroup){ return form.get(name) as FormControl }
export function getQueryVariable(variable: string) : string | null
{
  let query = window.location.search.substring(1);
  let vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
          let pair = vars[i].split("=");
          if(pair[0] == variable){return pair[1];}
  }
  return null;
}
export function HandleRequestError<T extends DefaultResponse<any>>(err : any): [number, string] {
    if(err.status == 400){
      let errAsResult = err.error as T;
      return [400, errAsResult.messages.join(' \n')];
    }
    else if(err.status == 401){
      return [401, 'Houve um erro com sua sessão, você será desconectado.']
    }
    else if(err.status = 500){
      let errorMessage = err.error as string;
      if(typeof(errorMessage) == 'string')
        return [err.status, errorMessage]

      return [err.status, 'Houve um erro inesperado com a conexão com o servidor, tente novamente em instantes.']
    }
    return [err?.status ?? 500, 'Houve um erro inesperado com a conexão com o servidor, tente novamente em instantes.']
}
