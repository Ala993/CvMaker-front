import { Injectable } from '@angular/core';
import {UserAccountService} from './user-account.service';
import {AuthServerProvider} from './auth-jwt.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private accountService: UserAccountService,
              private authServerProvider: AuthServerProvider,
              private router: Router) { }




  logout() {
    this.authServerProvider.logout().subscribe(null, null, () => {
    //  this.accountService.authenticate(null);
      this.router.navigate(['/session/loginone']);
    });
  }

  logoutFromBack() {
    this.authServerProvider.logout().subscribe(null, null, () => {
      this.accountService.authenticate(null);
    });
  }
}

