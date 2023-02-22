import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { employeemodel } from '../Model/employeemodel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  apiurl = 'http://localhost:9090';

  Getallemployees(): Observable<employeemodel[]> {
    return this.http.get<employeemodel[]>(this.apiurl + '/users');
  }

  GetEmployeeById(id: any): Observable<employeemodel> {
    return this.http.get<employeemodel>(this.apiurl + '/user' + id);
  }

  RemoveEmployee(id: any) {
    return this.http.delete(this.apiurl + '/deleteuser' + id);
  }

  CreateEmployee(employeedata: any) {
    return this.http.post(this.apiurl + '/addUser', employeedata);
  }

  UpdateEmployee(id: any, employeedata: any) {
    return this.http.put(this.apiurl + '/updateuser' + id, employeedata);
  }

}
