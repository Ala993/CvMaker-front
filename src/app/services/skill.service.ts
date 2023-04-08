import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Skill } from 'app/modules/skill.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private http : HttpClient) { }
  

  findAllSkills(){
    return this.http.get(environment.apiUrl+"api/skills");
  }

  createSkill(skill: Skill){
    return this.http.post(environment.apiUrl+"api/skills",skill);
  }

  updateSkill(skill: Skill){
    return this.http.put(environment.apiUrl+"api/skills/"+skill.id,skill);
  }

  deleteSkill(id){
    return this.http.delete(environment.apiUrl+"api/skills/"+id);
  }
}
