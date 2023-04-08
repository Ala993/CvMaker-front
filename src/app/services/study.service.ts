import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Study } from 'app/modules/study.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudyService {

  constructor(private http : HttpClient) { }

  createStudy(study: Study){
    return this.http.post(environment.apiUrl+"api/studies",study)
  }

  updateStudy(study:Study){
    return this.http.put(environment.apiUrl+"api/studies/"+study.id,study)
  }
  deleteStudy(id: string){
    return this.http.delete(environment.apiUrl+"api/studies/"+id);
  }
}
