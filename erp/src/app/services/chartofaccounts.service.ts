import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Account {
  id?: number;
  account_code: string;
  account_name: string;
  type: string;
  sub_type: string;
  balance: number;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChartofaccountsService {

  private apiUrl = "http://localhost:8080/api/coa";

  constructor(private http: HttpClient) {}

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.apiUrl);
  }

  addAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(this.apiUrl, account);
  }

  updateAccount(account: Account): Observable<Account> {
    if (!account.id) throw new Error("Cannot update account without ID");
    return this.http.put<Account>(`${this.apiUrl}/${account.id}`, account);
  }

  deleteAccount(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}