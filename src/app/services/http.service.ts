import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IDepartment } from '../types/department';
import { IEmployee } from '../types/employee';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  http = inject(HttpClient);
  apiUrl = 'https://localhost:7092';

  constructor() {}

  getDepartments() {
    return this.http.get<IDepartment[]>(environment.apiUrl + '/api/Department');
  }

  addDepartment(name: string) {
    return this.http.post(environment.apiUrl + '/api/Department', {
      name: name,
    });
  }

  deleteDepartment(id: number) {
    return this.http.delete(`${environment.apiUrl}/api/Department/${id}`);
  }

  editDepartment(id: number, name: string) {
    return this.http.put(`${environment.apiUrl}/api/Department/${id}`, {
      name,
    });
  }

  getEmployee() {
    return this.http.get<IEmployee[]>(`${environment.apiUrl}/api/Employee`);
  }

  addEmployee(employee: IEmployee) {
    return this.http.post(environment.apiUrl + '/api/Employee', employee);
  }
}
