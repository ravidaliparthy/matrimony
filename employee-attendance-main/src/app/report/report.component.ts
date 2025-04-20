import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../attendance.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    MatCardModule
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit {
  displayedColumns: string[] = ['id', 'employee_name', 'employee_id', 'department', 'check_in_time', 'check_out_time', 'created_at'];
  dataSource: any[] = []; // Original full data
  startDate: Date | null = null;
  endDate: Date | null = null;
  employeeName: string = '';
  department: string = '';
  departments: string[] = ['IT', 'HR', 'Sales', 'Marketing'];

  constructor(private attendanceService: AttendanceService) {}

  ngOnInit(): void {
    // Get all attendance records without filters
    this.attendanceService.getReport({ startDate: this.startDate, endDate: this.endDate, employeeName: this.employeeName, department: this.department }).subscribe({
      next: (data) => {
        this.dataSource = data;
      },
      error: (error) => {
        console.error('Error fetching reports:', error);
      }
    });
  }

  downloadReport(): void {
    console.log('Downloading report...');
    if (this.dataSource && this.dataSource.length > 0) {
      const csvData = this.convertToCSV(this.dataSource);
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'report.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } else {
      console.log('No data to download.');
    }
  }

  convertToCSV(data: any[]): string {
    if (!data || data.length === 0) return '';

    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(',')];

    for (const item of data) {
      const values = headers.map(header => {
        let value = item[header];
        if (value instanceof Date) value = value.toLocaleString();
        return value;
      });
      csvRows.push(values.join(','));
    }

    return csvRows.join('\n');
  }

  clearFilters() {
    this.startDate = null;
    this.endDate = null;
    this.employeeName = '';
    this.department = '';
  }
}
