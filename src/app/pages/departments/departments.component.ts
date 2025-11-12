import { Component, OnInit, inject } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { IDepartment } from '../../types/department';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-departments',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.scss',
})
export class DepartmentsComponent implements OnInit {
  httpService = inject(HttpService);
  departments: IDepartment[] = [];
  isFormOpen = false;

  ngOnInit() {
    this.httpService.getDepartments().subscribe((result) => {
      this.departments = result;
    });
  }

  departmentName!: string;

  getLatestData() {
    this.httpService.getDepartments().subscribe((result) => {
      this.departments = result;
    });
  }

  addDepartment() {
    console.log(this.departmentName);
    this.httpService.addDepartment(this.departmentName).subscribe(() => {
      alert('Department added successfully');
      this.getLatestData();
    });
    this.isFormOpen = false;
    this.departmentName = '';
  }

  deleteDepartment(id: number) {
    this.httpService.deleteDepartment(id).subscribe(() => {
      alert('Department deleted successfully');
      this.getLatestData();
    });  
  }

  isEdit = false;
  editId: number = 0;
  editDepartment(department: IDepartment) {
    this.departmentName = department.name;
    this.editId = department.id;
    this.isEdit = true;
    this.isFormOpen = true;
  }

  updateDepartment() {
    return this.httpService
      .editDepartment(this.editId, this.departmentName)
      .subscribe(() => {
        alert('Department edited successfully');
        this.getLatestData();
        this.isFormOpen = false;
        this.departmentName = '';
        this.editId = 0;
      });
  }
}
