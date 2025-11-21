import { Component, OnInit, inject } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { TableComponent } from '../../component/table/table.component';
import { IEmployee } from '../../types/employee';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { EmployeeformcomponentComponent } from './employeeformcomponent/employeeformcomponent.component';

@Component({
  selector: 'app-employee',
  imports: [TableComponent, MatButtonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent implements OnInit {
  httpService = inject(HttpService);
  employeeList: IEmployee[] = [];
  showCols = ['id', 'name', 'email', 'phone', 'action'];
  readonly dialog = inject(MatDialog);

  openDialog(): void {
    this.dialog.open(EmployeeformcomponentComponent, {
      panelClass : 'm-auto'
    });
  }

  ngOnInit() {
    this.httpService.getEmployee().subscribe({
      next: (res) => {
        this.employeeList = res;
      },
      error: (err) => console.log(err),
    });
  }

  edit(employee: IEmployee) {}

  delete(employee: IEmployee) {}

  add() {
    this.openDialog()
  }
}