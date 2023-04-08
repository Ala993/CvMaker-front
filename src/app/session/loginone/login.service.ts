import { Injectable } from '@angular/core';
import {UserAccountService} from '../../service/auth/user-account.service';
import {Router} from '@angular/router';
import {AuthServerProvider} from '../../service/auth/auth-jwt.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private accountService: UserAccountService, private authServerProvider: AuthServerProvider, private router: Router) {}

  login(credentials, callback?) {
    const cb = callback || function() {};

    return new Promise((resolve, reject) => {
      this.authServerProvider.login(credentials).subscribe(
        data => {
          this.accountService.identity().then(account => {
            resolve(data);
          });
          return cb();
        },
        err => {
           this.logout();
          reject(err);
          return cb(err);
        }
      );
    });
  }



  logout() {
    this.authServerProvider.logout().subscribe(null, null, () => {
      this.accountService.authenticate(null)
      this.router.navigate(['/session/loginone']);
    });
  }
}
