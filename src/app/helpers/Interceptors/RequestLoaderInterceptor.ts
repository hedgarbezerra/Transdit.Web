import { EMPTY, catchError, tap, throwError } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from "@angular/common/http";
import { LoadingSpinnerService } from "../../services/loading-spinner.service";

@Injectable()
export class RequestLoaderInterceptor implements HttpInterceptor {
    constructor(private spinnerService : LoadingSpinnerService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        this.spinnerService.show();

        return next.handle(req)
        .pipe(tap(((event: HttpEvent<any>) =>{
          if(event instanceof HttpResponse)
            this.spinnerService.hide();
        })), 
        catchError(err => {
          this.spinnerService.hide();
          return throwError(() => err);
        }));
    }
}
