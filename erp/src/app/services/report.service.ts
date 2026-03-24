import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FinancialRecord {
  id?: number;
  type: string;
  category: string;
  name: string;
  amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private baseUrl = 'http://localhost:8080/api/reports';

  constructor(private http: HttpClient) {}

  getReport(type: string): Observable<FinancialRecord[]> {
    return this.http.get<FinancialRecord[]>(`${this.baseUrl}/${type}`);
  }
}