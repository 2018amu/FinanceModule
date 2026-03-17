import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Invoice {
  id:number;
  vendorName:string;
  invoiceNumber:string;
  invoiceDate:string;
  dueDate:string;
  amount:number;
  status:string;
}

@Injectable({
  providedIn: 'root'
})
export class ApService {

  private apiUrl = "http://localhost:8080/api/ap";

  constructor(private http: HttpClient) {}

  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.apiUrl);
  }

  addInvoice(invoice:Invoice){
    return this.http.post<Invoice>(this.apiUrl,invoice);
  }
 // ✅ Correct vendor count
getVendorCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/vendors/count`);
  }
  
  // ✅ Correct pay invoice (matches your backend)
  payInvoice(invoiceId: number): Observable<Invoice> {
    return this.http.put<Invoice>(`${this.apiUrl}/pay/${invoiceId}`, {});
  }

  payAllInvoices(): Observable<Invoice[]> {
    return this.http.put<Invoice[]>(`${this.apiUrl}/pay-all`, {});
  }
  
  

}