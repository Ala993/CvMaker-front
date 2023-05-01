import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HumanRessource } from 'app/modules/human-ressource.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HumanRessourceService {

  constructor(
    private http: HttpClient
  ) { }

  updateHr(humanRessource:HumanRessource){
    return this.http.put(environment.apiUrl+"api/human-resources/"+humanRessource.id,humanRessource);
  }
  createHr(humanRessource:HumanRessource){
    return this.http.post(environment.apiUrl+"api/human-resources",humanRessource);
  }
  findHrById (id: string){
    return this.http.get(environment.apiUrl+ "api/human-resources/"+id);
  }
  findAllHrs (): Observable<HumanRessource[]>{
    return this.http.get<HumanRessource[]>(environment.apiUrl+ "api/human-resources"); 
  }
}
