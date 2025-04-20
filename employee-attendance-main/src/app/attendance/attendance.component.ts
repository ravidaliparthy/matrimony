import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import Snackbar
import { AttendanceService } from '../attendance.service';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule
  ],
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  attendanceForm!: FormGroup;
  isCheckInDisabled = false;
  isCheckOutDisabled = true;

  departments: string[] = ['IT', 'HR', 'Sales', 'Marketing'];
  attendanceHistory: any[] = [];
  displayedColumns: string[] = ['check_in_time', 'check_out_time'];
  employeeId: string = ''; // Receive employeeId dynamically

  constructor(
    private fb: FormBuilder,
    private attendanceService: AttendanceService,
    private snackBar: MatSnackBar // Inject the Snackbar service
  ) {}

  ngOnInit(): void {
    this.attendanceForm = this.fb.group({
      employee_name: ['', Validators.required],
      employee_id: [this.employeeId, Validators.required],
      department: ['', Validators.required]
    });
    this.loadAttendanceHistory();
  }

  loadAttendanceHistory(): void {
    this.attendanceService.getAttendanceHistory(this.employeeId).subscribe({
      next: (history) => {
        this.attendanceHistory = history;
      },
      error: (error) => {
        console.error('Error fetching attendance history:', error);
      }
    });
  }

  checkIn(): void {
    if (this.attendanceForm.valid) {
      this.attendanceService.checkIn(this.attendanceForm.value).subscribe({
        next: (response) => {
          console.log('Check-in successful:', response);
          this.isCheckInDisabled = true;
          this.isCheckOutDisabled = false;
          this.loadAttendanceHistory();
          
          // Show success message
          this.snackBar.open('Check-in Successful!', 'Close', {
            duration: 3000, // Snackbar will disappear after 3 seconds
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        },
        error: (error) => {
          console.error('Check-in failed:', error);
        }
      });
    }
  }

  checkOut(): void {
    if (this.attendanceForm.valid) {
      this.attendanceService.checkOut(this.attendanceForm.value).subscribe({
        next: (response) => {
          console.log('Check-out successful:', response);
          this.isCheckOutDisabled = true;
          this.isCheckInDisabled = false;
          this.loadAttendanceHistory();
          
          // Show success message
          this.snackBar.open('Check-out Successful!', 'Close', {
            duration: 3000, // Snackbar will disappear after 3 seconds
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        },
        error: (error) => {
          console.error('Check-out failed:', error);
        }
      });
    }
  }
}
