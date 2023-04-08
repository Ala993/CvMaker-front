import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {GenericService} from "../service/GenericService";

@Injectable({
  providedIn: 'root'
})
export class SessionService extends GenericService{

  constructor(private http: HttpClient) { super();}


  forgetPassword(email: string,lang: string){
    return this._api.post('api/account/reset-password-mmeetings/init/' +  lang , email);
  }
  changePassword(kyeAndPassword: any){
    return this._api.post('api/account/reset-password/backOffice_mmeetings/finish',kyeAndPassword);
  }

}
