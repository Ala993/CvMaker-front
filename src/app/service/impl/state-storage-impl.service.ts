import {Injectable} from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {LocaleImplService} from './locale-impl.service';

@Injectable({providedIn: 'root'})
export class StateStorageImplService {

  constructor(private  $sessionStorage: SessionStorageService,
              private  $localStorage: LocalStorageService,
              private localeService: LocaleImplService) {
  }

  clearAllData() {
    try {
      localStorage.clear();
      sessionStorage.clear();
      this.$localStorage.clear('authenticationToken');
      this.$localStorage.clear('localeId');
      this.$sessionStorage.clear('authenticationToken');
      this.$localStorage.clear('user');
      this.$sessionStorage.clear('user');
    } finally {
      this.localeService.initLocale();
    }
  }

}
