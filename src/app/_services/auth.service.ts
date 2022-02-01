import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

// Route Guards

const AUTH_API = 'http://localhost:9092/auth/users';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private token: TokenStorageService) { } // 

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

  isLoggedIn() {
    const token = window.sessionStorage.getItem('auth-user'); // get token from local storage
    if (token) {
      const authServiceToken = JSON.parse(token).jwt;
      console.log(authServiceToken);
      const payload = atob(authServiceToken.split('.')[1]); // decode payload of token
      const parsedPayload = JSON.parse(payload); // convert payload into an Object

      return parsedPayload.exp > Date.now() / 1000; // check if token is expired
    }
    return;
  }

}