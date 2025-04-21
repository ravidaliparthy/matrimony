import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  private apiUrl = 'http://localhost:5000/api/attendance'; // Your API base URL

  constructor(private httpClient: HttpClient) {}

  checkIn(data: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/checkin`, data);
  }

  checkOut(data: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/checkout`, data);
  }

  getAttendanceHistory(employeeId: string): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/attendance/${employeeId}`);
  }

  // Method to get the report based on filters
getReport(filters: any): Observable<any> {
    const params = new URLSearchParams();
  
    for (const key in filters) {
      if (filters[key]) {
        params.set(key, filters[key]);
      }
    }
  
    return this.httpClient.get<any>(`${this.apiUrl}/reports?${params.toString()}`);
  }
}
