import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:9092/auth/users';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(emailAddress: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + '/login', {
      "email": emailAddress,
      "password": password
    }, httpOptions);
  }

  register(userName: string, emailAddress: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + '/register', {
      "userName" : userName,
      "emailAddress": emailAddress,
      "password": password
    }, httpOptions);
  }
}