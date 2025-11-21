import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IDepartment } from '../types/department';
import { IEmployee } from '../types/employee';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  http = inject(HttpClient);
  apiUrl = 'https://localhost:7092';

  constructor() {}

  getDepartments() {
    return this.http.get<IDepartment[]>(this.apiUrl + '/api/Department');
  }

  addDepartment(name: string) {
    return this.http.post(this.apiUrl + '/api/Department', {
      name: name,
    });
  }

  deleteDepartment(id: number) {
    return this.http.delete(`${this.apiUrl}/api/Department/${id}`);
  }

  editDepartment(id: number, name: string) {
    return this.http.put(`${this.apiUrl}/api/Department/${id}`, { name });
  }

  getEmployee(){
    return this.http.get<IEmployee[]>(`${this.apiUrl}/api/Employee`)
  }
}
