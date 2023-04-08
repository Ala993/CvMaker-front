import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {map} from "rxjs/operators";
import {ResponseWrapper} from "../shared/util/response-wrapper.model";
import {IUserWebNotification} from "../shared/models/user-web-notification.model";
import {GenericService} from "./GenericService";
import {createRequestOption} from "../core/utils/request-util";
import {convertResponse} from "../shared/util/response-converter";
import {environment} from "../../environments/environment";


@Injectable({providedIn:"root"})
export class WebNotificationService extends GenericService{
  private newVoteRetrospectiveReceived = new BehaviorSubject(false);
  sharedNewVote = this.newVoteRetrospectiveReceived.asObservable();

  constructor(private http: HttpClient) {
    super()
  }


  getMyNotifications(): Observable<IUserWebNotification[]> {
    return this._api.get('api/user-notifications/mine/not-read/');
  }

  getMyNotificationsLimited(): Observable<IUserWebNotification[]> {
    return this._api.get('api/mmt-user-notifications/mine/not-read/');
  }

  getMyNotificationsReaded(): Observable<IUserWebNotification[]> {
    return this._api.get('api/user-notifications/mine/read/');
  }

  public interceptNewVoteReceiver() {
    this.newVoteRetrospectiveReceived.next(true);
  }

  query(req?: any): Observable<ResponseWrapper> {
    const options = createRequestOption(req);
    return this._api.get('api/user-notifications/mine', options).pipe(
      map((res) => convertResponse(res)));
  }



  public getNotificationWithPagination(page: number, size: number,): Observable<any> {
    return this.http.get<any>(environment.apiUrl + 'api/user-notifications/mine/?page=' + page + '&size=' + size, { observe: 'response' });
  }

  update(webNotification: IUserWebNotification): Observable<HttpResponse<any>> {
    return this.http.put(environment.apiUrl +'api/user-notifications', webNotification, {observe: 'response'});
  }

  updateAll(webNotifications: IUserWebNotification[]): Observable<HttpResponse<any>> {
    return this.http.put(environment.apiUrl +'api/user-notifications/all', webNotifications, {observe: 'response'});
  }

  delete(id: string): Observable<any> {
    return this._api.delete('api/user-notifications/' + id);
  }

  deleteAll(ids: string[]): Observable<any> {
    return this._api.post('api/user-notifications/delete', ids);
  }

}
