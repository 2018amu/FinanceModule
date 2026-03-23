import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ModuleSetup {
  id?: number;
  fiscalYearStart: string;
  baseCurrency: string;
  taxId: string;
  accountingMethod: string;
}

@Injectable({
  providedIn: 'root'
})
export class ModulesetupService {

  private apiUrl = 'http://localhost:8080/api/setup';

  constructor(private http: HttpClient) {}

  // Get all setups
  getAll(): Observable<ModuleSetup[]> {
    return this.http.get<ModuleSetup[]>(this.apiUrl);
  }

  //  Get by ID
  getById(id: number): Observable<ModuleSetup> {
    return this.http.get<ModuleSetup>(`${this.apiUrl}/${id}`);
  }

  //  Save (Create)
  create(setup: ModuleSetup): Observable<ModuleSetup> {
    return this.http.post<ModuleSetup>(this.apiUrl, setup);
  }

  //  Update (optional if you implement PUT in backend)
  update(id: number, setup: ModuleSetup): Observable<ModuleSetup> {
    return this.http.put<ModuleSetup>(`${this.apiUrl}/${id}`, setup);
  }

  //  Delete
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}