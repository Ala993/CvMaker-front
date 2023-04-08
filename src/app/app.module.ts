import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CvListComponent } from './components/cv-list/cv-list.component';
import { CvDetailsComponent } from './components/cv-details/cv-details.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import {MatTabsModule} from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import { NgbActiveModal, NgbDatepicker, NgbDatepickerModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import { AuthExpiredInterceptor } from './service/auth/auth-expired.interceptor';
import { AuthInterceptor } from './service/auth/auth.interceptor';
import { HttpErrorInterceptor } from './service/auth/http-error.interceptor';
import { PdfGeneratorComponent } from './components/pdf-generator/pdf-generator.component';
import { CollaboratorsComponent } from './components/collaborators/collaborators.component';
import { CollaboratorDetailsComponent } from './components/collaborator-details/collaborator-details.component';
import { LOCALE_ID } from '@angular/core';
import { Injector } from '@angular/core';
import { ServiceLocator } from './service/ServiceLocator';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

@NgModule({
  declarations: [
    AppComponent,
    CvListComponent,
    CvDetailsComponent,
    HeaderComponent,
    HomeComponent,
    PdfGeneratorComponent,
    CollaboratorsComponent,
    CollaboratorDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatInputModule,
    NgbModalModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgbDatepickerModule,
    MatSelectModule,
    MatExpansionModule  
  ],
  providers: [
    NgbActiveModal,
    MatDatepickerModule,  
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true
    },
    { provide: LOCALE_ID  , useValue: "fr" }  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    ServiceLocator.injector = this.injector;
    registerLocaleData(localeFr, 'fr');
  }
 }
