
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {LocalStorageService} from 'ngx-webstorage';
import {TranslateService} from '@ngx-translate/core';

import {LocaleService} from '../locale.service';
import {environment} from '../../../environments/environment';


@Injectable({providedIn: 'root'})
export class LocaleImplService {
  defaultLang = environment.defaultLang;
  defaultLangName = environment.defaultLangName;
  private _destroy = new Subject();

  constructor(
      private localeService: LocaleService,
      private $localStorage: LocalStorageService,
      private translate: TranslateService
  ) {
  }


  initLocale() {
    this.translate.use(this.defaultLang);
    this.pushDefaultLocaleToStorage();
  }

  pushDefaultLocaleToStorage() {
    if (this.$localStorage.retrieve('localeId') === null || this.$localStorage.retrieve('localeId') === undefined ) {

        this.$localStorage.store('localeId', this.defaultLang);
        this.$localStorage.store('language', this.defaultLangName);

    }
  }
  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }



}
