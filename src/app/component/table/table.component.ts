import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-table',
  imports: [MatTableModule, MatCardModule, MatButtonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input({ required: true }) data: any[] = [];
  @Input({ required: true }) displayedColumns: any[] = [];

  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();

  edit(rowData: any) {
    this.onEdit.emit(rowData)
  }

  delete(rowData: any) {
    this.onDelete.emit(rowData)
  }
}
