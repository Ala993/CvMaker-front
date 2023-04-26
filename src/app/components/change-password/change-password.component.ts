import { Component } from '@angular/core';
import { UserPassword } from 'app/modules/password.model';
import { AccountService } from 'app/services/account.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  constructor(
    private accountService: AccountService
  ) { }


  changePassword(newPassword) {
    let userPassword = new UserPassword();
    userPassword.newPassword = newPassword;
   // this.accountService.changePassword()
  }
}
