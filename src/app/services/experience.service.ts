import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Experience } from 'app/modules/experience.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  constructor(private http : HttpClient) { }

  createExperience(experience: Experience){
    return this.http.post(environment.apiUrl+"api/experiences",experience)
  }

  deleteExperience(id: string){
    return this.http.delete(environment.apiUrl+"api/experiences/"+id);
  }
  updateExperience(experience: Experience){
    return this.http.put(environment.apiUrl+"api/experiences/"+experience.id,experience)
  }
}
