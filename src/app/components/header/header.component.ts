import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AccountService } from 'app/services/account.service';
import { LoginService } from 'app/session/loginone/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isCollaborator=false;
  isHr = false;
  isAdmin= false;
  constructor(
    private accountService : AccountService,
    private loginService : LoginService
    ){}


  ngOnInit() {
    this.accountService.getCurrentUserType().subscribe(res => {
      if(res == "COLLABORATOR"){
        this.isCollaborator = true;
      }else this.isHr=true;
    });

    this.accountService.getCurrentUser().subscribe(res => {
      res.authorities.forEach(auth => {
        if(auth.name == "ROLE_ADMIN"){
          this.isAdmin = true;
        }
      })      
    })
  }

  logout(){
    this.loginService.logout();
  }
}
