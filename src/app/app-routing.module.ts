import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { CollaboratorDetailsComponent } from './components/collaborator-details/collaborator-details.component';
import { CollaboratorsComponent } from './components/collaborators/collaborators.component';
import { CvDetailsComponent } from './components/cv-details/cv-details.component';
import { CvListComponent } from './components/cv-list/cv-list.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {

    path: '',
    component: HomeComponent,
   
   
  },
  {
    path: 'session',
    loadChildren: () =>
      import('./session/session.module').then(m => m.SessionDemoModule)
  },

  {
    path: 'cv',
    component: CvListComponent
  },
  {
    path: 'details',
    component: CvDetailsComponent
  },
  {
    path: 'details/:id',
    component: CvDetailsComponent
  },
  {
    path: 'mon-cv',
    component: CvDetailsComponent
  },
  {
    path: 'hr-collaborator-cv/:id',
    component: CvDetailsComponent
  },
  {
    path:'collaborators',
    component: CollaboratorsComponent
  },
  {
    path:'collaborator-details',
    component: CollaboratorDetailsComponent
  },
  {
    path:'collaborator-details/:id',
    component: CollaboratorDetailsComponent
  },
  {
    path:'change-password',
    component: ChangePasswordComponent
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
