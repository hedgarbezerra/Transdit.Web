import { Injectable } from "@angular/core";
import { AuthenticationService } from "../services/users/authentication.service";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.token;
        
        req = req.clone({
            setHeaders: {
                Authorization: "Bearer " + authToken,
                'x-api-version': environment.apiVersion,
            }
        });
        return next.handle(req);
    }
}
