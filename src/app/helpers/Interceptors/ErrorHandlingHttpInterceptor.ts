import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EMPTY, catchError, throwError } from "rxjs";
import { HandleRequestError } from "../HelperFunctions";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class ErrorHandlingHttpInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req)
    .pipe(catchError((err) => {
      let errorWithCode = HandleRequestError(err);
      this.snackBar.open(errorWithCode[1], 'Fechar', { duration: 5000});
        return throwError(() => err);
      })
    );
  }
}
