import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FixedAsset {
  id?: number;
  assetName: string;
  category: string;
  purchaseDate: string;
  purchaseValue: number;
  currentValue: number;
  status: string;
  accumulatedDepreciation: number;
}

@Injectable({
  providedIn: 'root'
})
export class FixedAssetService {

  private apiUrl = 'http://localhost:8080/api/assets';

  constructor(private http: HttpClient) {}

  getAll(): Observable<FixedAsset[]> {
    return this.http.get<FixedAsset[]>(this.apiUrl);
  }

  add(asset: FixedAsset): Observable<FixedAsset> {
    return this.http.post<FixedAsset>(this.apiUrl, asset);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  runDepreciation(): Observable<FixedAsset[]> {
    return this.http.post<FixedAsset[]>(`${this.apiUrl}/depreciation`, {});
  }

  getSummary(): Observable<any> {
    return this.http.get(`${this.apiUrl}/summary`);
  }
}