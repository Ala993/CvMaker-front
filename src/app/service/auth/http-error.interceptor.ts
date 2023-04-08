import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          let errorTitle = '';
          let errorCode = '';
         
          
          errorTitle = error.error.errorType;
          errorCode = error.error.errorCode;
          errorMessage = error.error.message;
          if(error.error.affect ) {
            return throwError(error?.error);
          }

          if(error.error.violations) {
            return throwError(error?.error);
          }
          return throwError(error.error.detail);
        })
      )
  }
}
