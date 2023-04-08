import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';



@Injectable({providedIn: 'root'})
export class AuthServerProvider {
  constructor(private http: HttpClient) {}


  login(credentials): Observable<any> {
    const data = {
      username: credentials.username,
      password: credentials.password,
      rememberMe: credentials.rememberMe
    };
    return this.http.post(environment.apiUrl + 'api/authenticate', data, { observe: 'response' }).pipe(map(authenticateSuccess.bind(this)));
    function authenticateSuccess(resp) {
    
     
        const jwt = resp.body.id_token;        
        this.storeAuthenticationToken(jwt, credentials.rememberMe);
        return jwt;
      
    }
  }



  storeAuthenticationToken(jwt, rememberMe) {
    if (rememberMe) {
      localStorage.setItem('authenticationToken', jwt);
    } else {
      sessionStorage.setItem('authenticationToken', jwt);
    }
  }

  logout(): Observable<any> {
    return new Observable(observer => {
      localStorage.removeItem('authenticationToken');
      localStorage.clear();
      sessionStorage.removeItem('authenticationToken');
      sessionStorage.clear();
      observer.complete();
    });
  }
}
