import { Injectable } from '@angular/core';
import {APIService} from './api.service';
import {ServiceLocator} from './ServiceLocator';

@Injectable()
export class GenericService {
    protected _api: APIService;

    constructor() {
        this._api = ServiceLocator.injector.get(APIService);
    }



}
