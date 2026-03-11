import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  userId: string;
  fullName: string;
  email: string;
  role: string;
  department: string;
  lastLogin: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
  addUser(user: any) {
    return this.http.post('http://localhost:8080/api/users', user);
  }
  //   updateUser(user: any) {
  //     return this.http.put(`http://localhost:8080/api/users/${user.id}`, user);
  //   }
  // user.service.ts
  updateUser(id: number, user: User) {
    return this.http.put(`/api/users/${id}`, user); // adjust URL if needed
  }
}
