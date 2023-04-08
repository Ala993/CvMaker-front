import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  notInSession=true;
  title = 'cvMaker';
  constructor(
    private router: Router
  ) {}
  ngOnInit() {
    this.notInSession = !this.router.url.includes("session");
    this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd){
        this.notInSession = !val.url.includes("session");
        
      }
  });
  }

}
