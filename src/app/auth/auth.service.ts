import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResp } from '../models/api.models';
import { tap, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

export const TOKEN_NAME = 'userName';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly loginUrl = 'geoserver/rest/about/version.json';
  private readonly logoutUrl = 'geoserver/logout';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<UserResp> {
    let headers = new HttpHeaders();
    headers = headers.append(
      'X-Credentials',
      `private-user=${username}&private-pw=${password}`
    );
    return this.http
      .get<UserResp>(this.loginUrl, { headers })
      .pipe(tap(this.setToken.bind(this, username)));
  }

  getToken() {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(username: string) {
    localStorage.setItem(TOKEN_NAME, username);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    this.http
      .post(this.logoutUrl, {}, { responseType: 'text' })
      .pipe(finalize(this.removeSession.bind(this)))
      .subscribe();
  }

  removeSession() {
    localStorage.removeItem(TOKEN_NAME);
    this.router.navigate(['login']);
  }
}
