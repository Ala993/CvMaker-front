import {Routes} from '@angular/router';

import {LoginoneComponent} from './loginone/loginone.component';

export const SessionRoutes: Routes = [{
  path: '',
  redirectTo: 'loginone',
  pathMatch: 'full',
}, {
  path: '',
  children: [
    {
    path: 'loginone',
    component: LoginoneComponent
  },
 // {path: '**', redirectTo: 'loginone'}
  ]
}];
