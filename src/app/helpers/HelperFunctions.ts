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
    else if(err.status = 500){
      let errorMessage = err.error as string;
      if(typeof(errorMessage) == 'string')
        return [err.status, errorMessage]

      return [err.status, 'Houve um erro inesperado com a conexão com o servidor, tente novamente em instantes.']
    }
    return [err?.status ?? 500, 'Houve um erro inesperado com a conexão com o servidor, tente novamente em instantes.']
}

export function downloadFile(data: any, type: string): void {
  let blob = new Blob([data], { type: type});
  let url = window.URL.createObjectURL(blob);
  let pwa = window.open(url);
  if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      alert( 'Please disable your Pop-up blocker and try again.');
  }
}

export function base64ToArrayBuffer(base64: any) {
  var binaryString = window.atob(base64);
  var binaryLen = binaryString.length;
  var bytes = new Uint8Array(binaryLen);
  for (var i = 0; i < binaryLen; i++) {
     var ascii = binaryString.charCodeAt(i);
     bytes[i] = ascii;
  }
  return bytes;
}

export function saveData(data: Uint8Array, type: string, fileName: string) {
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style.display = "none";
  let blob = new Blob([data], {type: type}),
      url = window.URL.createObjectURL(blob);

  a.href = url;
  a.download = fileName;
  a.click();
  
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}
