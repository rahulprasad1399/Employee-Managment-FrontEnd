import { Component, OnInit, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

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
    MatCardModule
  ],
  templateUrl: './employeeformcomponent.component.html',
  styleUrl: './employeeformcomponent.component.scss',
})
export class EmployeeformcomponentComponent implements OnInit {
  fb = inject(FormBuilder);
  employeeForm!: FormGroup;

  ngOnInit() {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      jobTitle: ['', Validators.required],
      gender: [1, Validators.required],
      departmentId: ['', Validators.required],
      joiningDate: ['', Validators.required],
      lastWorkingDate: [''],
      dateOfBirth: ['', Validators.required],
    });
  }

  submit(){

  }
}
