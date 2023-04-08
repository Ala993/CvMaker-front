import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Collaborator } from 'app/modules/collaborator.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http : HttpClient) { }


  getCurrentUserType(){
    return this.http.get(environment.apiUrl+"api/admin/user-type",{responseType: 'text'});
  }

  findCollaboratorByCurrentUser(){
    return this.http.get(environment.apiUrl+"api/collaborator-by-current-user")
  }
  updateCollaborator(collaborator:Collaborator){
    return this.http.put(environment.apiUrl+"api/collaborators/"+collaborator.id,collaborator);
  }
  createCollaborator(collaborator:Collaborator){
    return this.http.post(environment.apiUrl+"api/collaborators",collaborator);
  }
  findAllCollaborators(): Observable<Collaborator[]>{
    return this.http.get<Collaborator[]>(environment.apiUrl+"api/collaborators")
  }
  findCollaboratorById(id:string): Observable<Collaborator>{
    return this.http.get(environment.apiUrl+"api/collaborators/"+id)
  }
}