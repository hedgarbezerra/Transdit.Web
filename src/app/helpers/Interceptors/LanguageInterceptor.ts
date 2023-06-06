import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';

@Injectable()
export class LanguageInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {    
    let lang = localStorage.getItem('app-lang');
    if(!lang)
      return next.handle(req);

    req = req.clone({
      setHeaders: {
        'Accept-Language': lang
      },
    });
    return next.handle(req);
  }
}
