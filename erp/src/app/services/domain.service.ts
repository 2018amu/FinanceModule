import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


  export interface Domain {
    name: string;
    title: string;
    revenue: string;
    keyAccounts: string;
    apFocus: string;
    applies: boolean; // NEW
  }


@Injectable({
  providedIn: 'root'
})
export class DomainService {
  private apiUrl = 'http://localhost:8080/api/domains';

  constructor(private http: HttpClient) {}

  getDomains(): Observable<Domain[]> {
    return this.http.get<Domain[]>(this.apiUrl);
  }

  getDomainByName(name: string): Observable<Domain> {
    return this.http.get<Domain>(`${this.apiUrl}/${name}`);
  }

  applyDomainSettings(name: string): Observable<Domain> {
    return this.http.post<Domain>(`${this.apiUrl}/apply/${name}`, {});
  }
}