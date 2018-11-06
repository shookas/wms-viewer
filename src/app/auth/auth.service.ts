import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

export const USER_NAME = 'userName';
export const AUTH_TOKEN = 'authToken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly loginUrl = 'geoserver/rest/about/version.json';
  private readonly logoutUrl = 'geoserver/logout';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    const auth = `private-user=${username}&private-pw=${password}`;
    let headers = new HttpHeaders();
    headers = headers.append(
      'X-Credentials',
      `private-user=${username}&private-pw=${password}`
    );
    return this.http
      .get(this.loginUrl, { headers })
      .pipe(tap(this.setSession.bind(this, username, auth)));
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
    this.http
      .post(this.logoutUrl, {}, { responseType: 'text' })
      .pipe(finalize(this.removeSession.bind(this)))
      .subscribe();
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
