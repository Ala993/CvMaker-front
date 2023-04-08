import {Injectable} from '@angular/core';
import {GenericService} from '../GenericService';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {IEmployee} from 'app/shared/models/Employee.model';
import {IEmployeeDTO} from "../../shared/models/employeeDTO.model";
import { ManagedUserBpGroup } from 'app/management-user/user-details/user-details-bp/user-details-bp.component';


@Injectable({
  providedIn: 'root'
})
export class AccountService extends GenericService {

  constructor(private http: HttpClient) {
    super();
  }

  activate(key: string) {
    return this.http.get(environment.apiUrl + 'api/activate/' + key);
  }

  create(customer: any): Observable<any> {
    return this._api.post('api/register/', customer);
  }

  update(customer: any): Observable<HttpResponse<any>> {
    return this._api.put('api/account/', customer);
  }

  find(id: string): Observable<any> {
    return this._api.get('api/customers/' + id);
  }

  findAll(): Observable<any[]> {
    return this._api.get('api/customers/');
  }

  delete(email: string): Observable<any> {
    return this._api.delete('api/users/' + email);
  }

  updateEmployee(employee: IEmployee, oldEmail: string): Observable<HttpResponse<IEmployee>> {
    return this._api.put('api/employees/account/' + oldEmail, employee);
  }





  saveImageUser(file: File, typeId: string): Observable<any> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    return this.http.post(environment.apiUrl + 'api/upload-media-for-user/' + typeId, formdata);
  }

  createMultipleMmeetingsEmployee(clientId: string,employeesMmeetings: IEmployeeDTO[]): Observable<any> {
    return this._api.post('api/multiple-employee-meetings/register/'+clientId, employeesMmeetings);
  }

  createBpMmeetingsEmployee(clientId: string,managedUserBpGroupDTO: ManagedUserBpGroup): Observable<any> {
    return this._api.post('api/bp-employee-meetings/register/'+clientId, managedUserBpGroupDTO);
  }

  createMmeetingsEmployeeFromExistingUser(clientId: string,employeeMmeetings: IEmployeeDTO, salesPersonCode ?: string): Observable<any> {
    return this._api.post('api/employee-meetings-from-existing-user/register/'+clientId+'/'+salesPersonCode, employeeMmeetings);
  }

  createMmeetingsCorporateSellerEmployeeForServiceProvider(clientId: string, employeeMmeetings: IEmployeeDTO): Observable<any> {
    return this._api.post('api/employee-meetings/cs/register/' + clientId, employeeMmeetings);
  }
   updateMmeetingsEmployee(clientId: string,employeeMmeetings: IEmployeeDTO): Observable<any> {
    return this._api.put('api/employee-meetings/account/'+ clientId,employeeMmeetings);
  }

  updateBpMmeetingsEmployee(clientId: string,managedUserBpGroupDTO: ManagedUserBpGroup): Observable<any> {
    return this._api.put('api/bp-employee-meetings/account/'+ clientId,managedUserBpGroupDTO);
  }

  updateMmeetingsEmployeeProfile(email: string, employeeMmeetings: IEmployeeDTO): Observable<any> {
    return this._api.put('api/employee-meetings/profile/' + email, employeeMmeetings);
  }
  updateFcmToken(email: string, fcm: string){
    return this._api.put('api/update-firebaseFCMToken/'+email+'/'+fcm)
  }

  getEmployeeExcelFormTemplate() {
    const httpOptions = {
      'responseType': 'arraybuffer' as 'json'
    };
    return this.http.get(environment.apiUrl + "api/employee-excel-form-template", httpOptions);
  }
}
