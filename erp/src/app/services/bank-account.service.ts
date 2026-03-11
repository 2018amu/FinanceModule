import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BankAccount {
  id: number;
  accountName: string;
  bankName: string;
  accountNumber: string;
  accountType: string;
  currentBalance: number;
  lastUpdated: string;
  status: string;
}

@Injectable({
     providedIn: 'root'
     })
export class BankAccountService {
  private apiUrl = 'http://localhost:8080/api/bank-accounts';

  constructor(private http: HttpClient) {}

  getBankAccounts(): Observable<BankAccount[]> {
    return this.http.get<BankAccount[]>(this.apiUrl);
  }
}