import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { environment } from 'environments/environment';
import {ILocale} from "../shared/models/locale.model";
import {GenericService} from "./GenericService";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class LocaleService  extends GenericService{
  ressourceURL = environment.apiUrl + 'api/locales/by-locale/'
  public locales: ILocale[] = [];
  constructor(private http: HttpClient) {
    super();
  }

  getAllLocales(defaultLocale : string): Observable<any> {
    return this.http.get(this.ressourceURL+ defaultLocale);
}

  findAll(localeId: string, force?: boolean): Observable<ILocale[]> {
    if (!force && this.locales?.length) {
      return of(this.locales);
    }
    return this._api.get('api/locales/by-locale/' + localeId).pipe(map((res) => {
      this.locales = res
      return res;
    }));;
  }

}
