import { Routes } from '@angular/router';
import { AttendanceComponent } from './attendance/attendance.component';
import { AttendanceHistoryComponent } from './attendance-history/attendance-history.component';
import { ReportComponent } from './report/report.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'attendance',
    pathMatch: 'full'
  },
  {
    path: 'attendance',
    component: AttendanceComponent,
  },
  {
    path: 'attendance/history',
    component: AttendanceHistoryComponent,
  },
  {
    path: 'reports',
    component: ReportComponent,
  },
];
