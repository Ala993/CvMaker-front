import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {throwError as observableThrowError, Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from '../../environments/environment';


@Injectable()
export class APIService {


  constructor(private http: HttpClient) {

  }

  get(url: string, option?): Observable<any> {
    return this.http.get(environment.apiUrl + url, option)
      .pipe(
        catchError(this.handleError)
      );
  }

  post(url: string, body: any = {}): Observable<any> {
    return this.http.post(environment.apiUrl + url, body);
  }

  put(url: string, body: any = {}): Observable<any> {
    return this.http.put(environment.apiUrl + url, body)
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(url: string): Observable<any> {
    return this.http.delete(environment.apiUrl + url)
      .pipe(
        catchError(this.handleError)
      );
  }


  protected handleError(error: Response | any) {
    console.log('ERROR CODE',error);
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || error || '';
      const err = body['error'] || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;

    } else {
      if (error != undefined) {
        if (error.errorCode == 700) {
          errMsg = error.affect[0].message
        } else
          errMsg = error.message ? error.message : error.toString();
      }
    }
    return observableThrowError(errMsg);
  }
}
