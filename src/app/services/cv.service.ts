import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cv } from '../modules/cv.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CvService {

  constructor(private httpClient: HttpClient) { }


  findAllCvs() : Observable<Cv[]>{
    return this.httpClient.get<Cv[]>(environment.apiUrl+"api/cvs");
  }

  createCv(cv: Cv) {
    return this.httpClient.post(environment.apiUrl+"api/cvs",cv )
  }

  updateCv(cv: Cv){
    return this.httpClient.put(environment.apiUrl+"api/cvs/"+cv.id,cv )
  }
  findCvById(id: string){
    return this.httpClient.get(environment.apiUrl+"api/cvs/"+id);
  }

  deleteCv(id:string){
    return this.httpClient.delete(environment.apiUrl+"api/cvs/"+id)
  }
}
