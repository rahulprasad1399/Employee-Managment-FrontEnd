import { Component, OnInit, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { NgClass } from '@angular/common';
import { IDepartment } from '../../../types/department';
import { HttpService } from '../../../services/http.service';
import { Gender, IEmployee } from '../../../types/employee';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-employeeformcomponent',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatRadioModule,
    NgClass,
  ],
  templateUrl: './employeeformcomponent.component.html',
  styleUrl: './employeeformcomponent.component.scss',
})
export class EmployeeformcomponentComponent implements OnInit {
  fb = inject(FormBuilder);
  http = inject(HttpService);
  dialog = inject(MatDialogRef<EmployeeformcomponentComponent>);

  gender = Gender;

  department: IDepartment[] = [];

  employeeForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    jobTitle: ['', Validators.required],
    gender: [1, Validators.required],
    departmentId: [1, Validators.required],
    joiningDate: ['', Validators.required],
    lastWorkingDate: [''],
    dateOfBirth: ['', Validators.required],
  });

  ngOnInit() {
    this.http.getDepartments().subscribe((res) => {
      this.department = res;
    });
  }

  submit() {
    this.http.addEmployee(this.employeeForm.value as IEmployee).subscribe({
      next: (res) => alert('Data Saved'),
    });
    this.dialog.close();
  }
}
