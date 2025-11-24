import { Component, Input, OnInit, inject } from '@angular/core';
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
import { Gender } from '../../../types/employee';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
  data = inject<{ employeeId?: number }>(MAT_DIALOG_DATA);

  @Input() employeeId!: any;

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

    const employeeId = this.data?.employeeId;

    // EDIT
    if (employeeId) {
      this.http.getEmployeeById(employeeId).subscribe((res: any) => {
        let result = {
          ...res,
          gender: res.gender === 'male' ? 1 : 0,
        };
        this.employeeForm.patchValue(result);
      });
    } else {
    }
  }

  submit() {
    const genderString =
      this.employeeForm.value.gender === 1
        ? 'male'
        : this.employeeForm.value.gender === 2
        ? 'female'
        : null;

    let payload: any = {
      Name: this.employeeForm.value.name,
      Email: this.employeeForm.value.email,
      Phone: this.employeeForm.value.phone,
      JobTitle: this.employeeForm.value.jobTitle,
      Gender: genderString,
      DepartmentId: this.employeeForm.value.departmentId,
      JoiningDate: this.employeeForm.value.joiningDate,
      DateOfBirth: this.employeeForm.value.dateOfBirth,
      LastWorkingDate: this.employeeForm.value.lastWorkingDate || null,
    };

    if (this.data.employeeId) {
      this.http
        .updateEmployeeById(this.data.employeeId, payload)
        .subscribe((res) => {
          console.log('Data updated successfully');
        });
    } else {
      this.http.addEmployee(payload).subscribe({
        next: (res) => alert('Data Saved'),
      });
      this.dialog.close();
    }
  }
}
