import {environment} from '../../../environments/environment';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import { IUser } from 'app/modules/user.model';


@Injectable({providedIn: 'root'})
export class UserAccountService {
  public userIdentity: any;
  private authenticated = false;
  private authenticationState = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  fetch(): Observable<HttpResponse<IUser>> {
    return this.http.get<IUser>(environment.apiUrl + 'api/account', {observe: 'response'});
  }
  hasAnyAuthority(authorities: string[]): Promise<boolean> {
    return Promise.resolve(this.hasAnyAuthorityDirect(authorities));
  }
  hasAnyAuthorityDirect(authorities: string[]): boolean {
    if (!this.authenticated || !this.userIdentity || !this.userIdentity.userGroups) {
      return false;
    }
    let names = [];
    this.userIdentity.userGroups.forEach(group => names.push(group.code))
    for (let i = 0; i < authorities.length; i++) {
      if (names.indexOf(authorities[i]) != -1) {
        return true;
      }
    }
    return false;
  }
  authenticate(identity) {
    this.userIdentity = identity;
    this.authenticated = identity !== null;
    this.authenticationState.next(this.userIdentity);
  }


  identity(force?: boolean): Promise<IUser> {
    if (force) {
      this.userIdentity = undefined;
    }


    if (this.userIdentity) {
      return Promise.resolve(this.userIdentity);
    }

    return this.fetch()
      .toPromise()
      .then(response => {

        const account: IUser = response.body;
        if (account) {
          this.userIdentity = account;
          this.authenticated = true;
        } else {
          this.userIdentity = null;
          this.authenticated = false;
        }
        this.authenticationState.next(this.userIdentity);
        return this.userIdentity;
      })
      .catch(err => {
        this.userIdentity = null;
        this.authenticated = false;
        this.authenticationState.next(this.userIdentity);
        return null;
      });


  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

}
