import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserAccountService } from '../../service/auth/user-account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IUser, User } from 'app/modules/user.model';

@Component({

  selector: 'ms-loginone-session',
  templateUrl: './loginone-component.html',
  styleUrls: ['./loginone-component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class LoginoneComponent implements OnInit {
  showPassword = false;
  customer: IUser;
  email: string;
  password: string;
  authenticationError: boolean;
  rememberMe: boolean;
  submitted = false;
  account: IUser;
  numberOfAttempts = 0;
  hiddenRecaptcha = true;
  forgotPasswordSubmitted = false;
  isValidUsername = true;
  typeuser: any;
  bookings: any;
  constructor(
    private router: Router,
    private loginService: LoginService,
    private userAccountService: UserAccountService,
    private activeModal: NgbActiveModal,
    private modal: NgbModal,
  ) {
  }

  ngOnInit() {
    this.customer = new User();
    this.rememberMe = false;
  }

  checkPasswords(group: FormGroup) {

    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  isValidForm(): boolean {
    if (this.email && this.password) return true;
    else return false;
  }
  login() {
    this.submitted = true;
    this.forgotPasswordSubmitted = false;
    if (!this.isValidForm()) {
      return;
    }
    this.loginService
      .login({
        username: this.email,
        password: this.password,
        rememberMe: this.rememberMe
      })
      .then(() => {

        this.authenticationError = false;
       
        this.userAccountService.identity().then(account => {
          this.account = account;
          this.router.navigateByUrl('');
        });
      })
      .catch(() => {
        this.numberOfAttempts = this.numberOfAttempts + 1;
        if (this.numberOfAttempts > 3) {
          this.hiddenRecaptcha = false
        }
        this.authenticationError = true;
      });

  } 

}



