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
  addBankAccount(bank: BankAccount): Observable<BankAccount> {
    return this.http.post<BankAccount>(this.apiUrl, bank);
  }
  importStatement(formData: FormData) {
    return this.http.post('http://localhost:8080/api/bank-accounts/import', formData,{ responseType: 'text' });
  }
  reconcileBankAccounts(): Observable<any> {
    return this.http.post(`${this.apiUrl}/reconcile`, {},{ responseType: 'text' }); // empty body, backend handles logic
  }
  deleteBankAccount(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
  
}