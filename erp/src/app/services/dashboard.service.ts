import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Card {
  title: string;
  value: number;
  trend: 'up' | 'down' | 'none';
  trendValue: string;
  icon: string;
}

export interface PendingAction {
  action: string;
  module: string;
  priority: string;
  dueDate: string;
  status: string;
}

export interface DashboardData {
  totalRevenue: Card;
  accountsReceivable: Card;
  accountsPayable: Card;
  cashBalance: Card;
  pendingActions: PendingAction[];
}

// Helper array for month names
const MONTH_NAMES = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
];

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:8080/dashboard';

  constructor(private http: HttpClient) {}

  getDashboardData(): Observable<DashboardData> {
    return this.http.get<DashboardData>(this.apiUrl).pipe(
      map(data => {
        data.pendingActions.forEach(pa => {
          if (pa.dueDate && typeof pa.dueDate === 'object') {
            // assume backend sends { year: 2026, month: 2, day: 26 }
            const d = pa.dueDate as { year: number; month: number; day: number };
            const monthName = MONTH_NAMES[d.month - 1]; // month index 0-11
            pa.dueDate = `${d.year}-${monthName}-${String(d.day).padStart(2, '0')}`;
          }
        });
        return data;
      })
    );
  }
}