import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {LoginService} from "./login.service";

@Injectable()
export class AuthExpiredInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {},
        (err: any) => {
          
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.loginService.logout();
              this.router.navigate(['/session/loginone']);
            }
          }
        }
      )
    );
  }
}
