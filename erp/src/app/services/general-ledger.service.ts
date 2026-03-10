import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface JournalEntry {
  id: number;
  date: string;
  journalNo: string;
  description: string;
  debit: number;
  credit: number;
  status: string;
}

export interface TrialBalanceRow {
  account_code: string;
  account_name: string;
  debit: number;
  credit: number;
  net: number;
}

export interface LedgerEntry {
  date: string;
  account: string;
  journalNo: string;
  debit: number;
  credit: number;
  balance: number;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class GlService {
  private apiUrl = 'http://localhost:8080/api/gl';

  constructor(private http: HttpClient) {}

  getJournals(): Observable<JournalEntry[]> {
    return this.http.get<JournalEntry[]>(`${this.apiUrl}/journals`);
  }
  

  getTrialBalance(): Observable<TrialBalanceRow[]> {
    return this.http.get<TrialBalanceRow[]>(`${this.apiUrl}/trial-balance`);
  }
  runClosing(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/closing`, data);
  }

  getLedgerEntries(account?: string, date?: string): Observable<LedgerEntry[]> {
    let url = `${this.apiUrl}/ledger`;
    const params: any = {};
    if (account) params.account = account;
    if (date) params.date = date;
    return this.http.get<LedgerEntry[]>(url, { params });
  }

  // For totals
  getGlStats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stats`);
  }

  addJournal(journal: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/journals`, journal);
  }
  
  approveJournal(id: number) {
    
    return this.http.put(`${this.apiUrl}/journals/approve/${id}`, null);
  }
  
  postJournal(id: number) {
    return this.http.put(`${this.apiUrl}/journals/post/${id}`, null);
  }
  runMonthEndClose() {
    return this.http.post('http://localhost:8080/api/gl/month-end-close', {});
  }
  
}