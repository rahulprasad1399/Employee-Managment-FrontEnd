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
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-employee',
  imports: [TableComponent, MatButtonModule, MatIconModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent implements OnInit {
  httpService = inject(HttpService);
  employeeList: IEmployee[] = [];
  showCols = ['id', 'name', 'email', 'phone', 'action'];
  readonly dialog = inject(MatDialog);

  openDialog(): void {
    let ref = this.dialog.open(EmployeeformcomponentComponent, {
      panelClass: 'm-auto',
    });
    ref.afterClosed().subscribe((result) => {
      this.getAllEmployee();
    });
  }

  getAllEmployee() {
    this.httpService.getEmployee().subscribe({
      next: (res) => {
        this.employeeList = res;
      },
      error: (err) => console.log(err),
    });
  }

  ngOnInit() {
    this.getAllEmployee();
  }

  edit(employee: IEmployee) {}

  delete(employee: IEmployee) {}

  add() {
    this.openDialog();
  }
}
