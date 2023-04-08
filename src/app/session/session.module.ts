import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { LoginoneComponent } from './loginone/loginone.component';
import { SessionRoutes } from './session.routing';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'app/service/auth/auth.interceptor';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(SessionRoutes),
        NgbDropdownModule,
        MatIconModule,
        MatTabsModule,

    ],
   declarations: [
      LoginoneComponent,
   ],
   providers: [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    },
   ]
})

export class SessionDemoModule {}
