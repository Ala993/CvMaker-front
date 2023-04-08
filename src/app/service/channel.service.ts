
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {GenericService} from "./GenericService";
import {IChannelTranslationToSave} from "../shared/models/channel-translation-tosave.model";
import {IChannel} from "../shared/models/channel.model";
import {ResponseWrapper} from "../shared/util/response-wrapper.model";
import {convertResponse} from "../shared/util/response-converter";
import {createRequestOption} from "../core/utils/request-util";
import {IPaymentMode} from "../shared/models/payment-mode.model";

@Injectable({ providedIn: 'root' })
export class ChannelService extends GenericService {

  constructor(private http : HttpClient) {
    super();
  }

  create(channel: IChannelTranslationToSave): Observable<IChannelTranslationToSave> {
    return this._api.post('api/channels', channel);
  }

  update(channel: IChannelTranslationToSave): Observable<IChannelTranslationToSave> {
    return this._api.put('api/channels', channel);
  }

  find(id: string): Observable<IChannel> {
    return this._api.get('api/channels/' + id);
  }

  findAll(): Observable<IChannel[]> {
    return this._api.get('api/channels');
  }

  delete(id: string): Observable<any> {
    return this._api.delete('api/channels/' + id);
  }

  query(req?: any): Observable<ResponseWrapper> {
    const options = createRequestOption(req);
    return this.http.get(environment.apiUrl + 'api/channels/', options).pipe(
      map((res) => convertResponse(res)));
  }

  getChannelPerLocale(id: string, locale: string): Observable<IPaymentMode> {
    return this._api.get('api/channel-perLocale/' + id + '/' + locale);
  }
}

