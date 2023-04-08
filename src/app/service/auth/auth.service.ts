import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {UserAccountService} from './user-account.service';
import {AuthServerProvider} from './auth-jwt.service';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';

@Injectable({providedIn: 'root'})
export class AuthService {

    constructor(
        private accountService: UserAccountService,
        private authServerProvider: AuthServerProvider,
        private router: Router,
        private toastr: ToastrService,
        private translate: TranslateService) {
    }

    login(credentials, callback?) {
        const cb = callback || function () {
        };

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
            this.accountService.authenticate(null);
            this.router.navigate(['/session/loginone']);
        });
    }




}
