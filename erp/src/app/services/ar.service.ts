import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ARInvoice {
  id: number;
  customerName: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  amount: number;
  balance: number;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class ARService {
  private apiUrl = 'http://localhost:8080/api/ar';

  constructor(private http: HttpClient) {}

  // Get all invoices
  getInvoices(): Observable<ARInvoice[]> {
    return this.http.get<ARInvoice[]>(`${this.apiUrl}/invoices`);
  }

  payInvoice(invoiceId: number, amount: number): Observable<ARInvoice> {
    return this.http.put<ARInvoice>(`http://localhost:8080/api/ar/${invoiceId}/pay`, { amount });
  }
  payAllInvoices(): Observable<void> {
    return this.http.put<void>('http://localhost:8080/api/ar/invoices/payall', {});
  }

  // Get total customer count
  getCustomerCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/customers/count`);
  }

  // ---------------- New Methods ----------------

  // Pay all invoices
  // payAllInvoices(): Observable<void> {
  //   return this.http.put<void>(`${this.apiUrl}/pay/all`, {});
  // }

  // Send payment reminders
  // sendReminders(): Observable<void> {
  //   return this.http.post<void>(`${this.apiUrl}/reminders`, {});
  // }
  sendReminders(): Observable<void> {
    return this.http.post<void>('http://localhost:8080/api/ar/invoices/send-reminders', {});
  }

  // Add new invoice
  addInvoice(invoice: ARInvoice): Observable<ARInvoice> {
    return this.http.post<ARInvoice>(`${this.apiUrl}/invoices`, invoice);
  }
  // ar.service.ts
  deleteInvoice(invoiceId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/invoices/${invoiceId}`);
  }
}
