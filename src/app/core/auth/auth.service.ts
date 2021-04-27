import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs/internal/observable/throwError';

export const USER_NAME = 'userName';
export const AUTH_TOKEN = 'authToken';

interface UserDTO {
  userName: string;
  enabled: boolean;
}
interface UsersResp {
  users: UserDTO[]
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly loginUrl = 'geoserver/rest/security/usergroup/users.json';

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<UsersResp> {
    const auth = `private-user=${username}&private-pw=${password}`;
    let headers = new HttpHeaders();
    headers = headers.append(
      'X-Credentials',
      `private-user=${username}&private-pw=${password}`
    );
    return this.http
      .get<UsersResp>(this.loginUrl, { headers })
      .pipe(tap(res => {
        const userActive = res.users.some(user => user.userName === username && user.enabled);
        if (!userActive) {
          return throwError(new HttpErrorResponse({ status: 401 }));
        }
      }), tap(this.setSession.bind(this, username, auth)));
  }

  getUserName() {
    return localStorage.getItem(USER_NAME);
  }

  getAuthToken() {
    const token = sessionStorage.getItem(AUTH_TOKEN);
    if (token) {
      return atob(token);
    }
    return token;
  }

  setUsername(username: string) {
    localStorage.setItem(USER_NAME, username);
  }

  setAuthToken(authToken: string) {
    sessionStorage.setItem(AUTH_TOKEN, btoa(authToken));
  }

  isLoggedIn(): boolean {
    return !!this.getAuthToken();
  }

  logout() {
    this.removeSession()
  }

  removeSession() {
    localStorage.removeItem(USER_NAME);
    sessionStorage.removeItem(AUTH_TOKEN);
    this.router.navigate(['login']);
  }

  setSession(username: string, authToken: string) {
    this.setAuthToken(authToken);
    this.setUsername(username);
  }
}
