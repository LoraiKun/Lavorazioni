import { Injectable } from '@angular/core';
import { LoginBody, LoginResponse } from '../../models/auth';
import { Observable, of, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // constructor(private http: HttpClient) {}

  logIn(loginBody: LoginBody): Observable<LoginResponse> {
    let authorized: boolean = false;
    RegistredUsers.forEach((user) => {
      if (
        user.email == loginBody.email &&
        user.password == loginBody.password
      ) {
        authorized = true;
      }
    });
    if (authorized) {
      localStorage.setItem('email', loginBody.email)
      return of(TOKEN);
    } else {
      return throwError(() => new Error('Simulated API failure'));
    }
  }
  logOut(){
    localStorage.clear()
  }

  getPassword(email: string): Observable<string> {
    let authorized: boolean = false;
    let password!: string;
    RegistredUsers.forEach((user) => {
      if (user.email == email) {
        authorized = true;
        password = user.password;
      }
    });

    if (authorized) {
      return of(password);
    } else {
      return throwError(() => new Error('Simulated API failure'));
    }
  }
  getEmail(){
    return localStorage.getItem('email')
  }
}

const RegistredUsers = [
  {
    email: 'lorenzo.dettori@nvgroup.it',
    password: '123456Qwerty!',
  },
];

const TOKEN: LoginResponse = { token: 'this token' };
