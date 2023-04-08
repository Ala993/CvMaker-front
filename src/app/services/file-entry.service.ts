import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileEntryService {

  constructor(private http: HttpClient) { }

  storeImage(image){
    const multipartFile: FormData = new FormData();
    multipartFile.append('multipartFile', image);
    return this.http.post(environment.apiUrl + 'api/save-file', multipartFile);
  }
}
