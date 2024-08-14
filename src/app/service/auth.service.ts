import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Login } from '../component/login/login-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://api.madtalk.ir/api/v1.0.0/auth/';
  
  constructor(private http: HttpClient) { }

  login(loginObj: Login): Observable<Login> {
    return this.http.post(`${this.apiUrl}login/base2/`, loginObj).pipe(
      tap((response: any) => {
        if (response && response[0] && response[0].access && response[0].refresh) {
          const accessToken = response[0].access;
          const refreshToken = response[0].refresh;
          this.setTokens(accessToken, refreshToken);
        } else {
          console.error('No tokens received in the response', response);
        }
      })
    );
  }
  

  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    return this.http.post(`${this.apiUrl}refresh/`, { refresh_token: refreshToken }).pipe(
      tap((response: any) => {
        if (response && response[0] && response[0].access) {
          const accessToken = response[0].access;
          this.setAccessToken(accessToken);
        } else {
          console.error('No access token received during refresh', response);
        }
      })
    );
  }
  

  private setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  private setAccessToken(accessToken: string): void {
    localStorage.setItem('accessToken', accessToken);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}
