import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResp } from '../models/api.models';
import { shareReplay, tap } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import * as moment from 'moment';
import { Router } from '@angular/router';

export const TOKEN_NAME = 'jwt_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly loginUrl = 'api/v1/users/login';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<UserResp> {
    return this.http.post<UserResp>(this.loginUrl, { email, password }).pipe(
      tap(this.setSession.bind(this)),
      shareReplay()
    );
  }

  getToken() {
    return localStorage.getItem(TOKEN_NAME);
  }

  getTokenExpiration(): moment.Moment {
    const token = this.getToken();
    if (!token) return null;
    const decoded: any = jwt_decode(token);
    if (decoded.exp === undefined) return null;

    return moment.unix(decoded.exp);
  }

  logout() {
    localStorage.removeItem(TOKEN_NAME);
    this.router.navigate(['login']);
  }

  isLoggedIn(): boolean {
    return moment().isBefore(this.getTokenExpiration());
  }

  private setSession(authResult: UserResp) {
    localStorage.setItem(TOKEN_NAME, authResult.token);
  }
}