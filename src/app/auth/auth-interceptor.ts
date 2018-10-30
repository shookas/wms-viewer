import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // const idToken = this.authService.getToken();

    // if (idToken) {
    //   const cloned = req.clone({
    //     headers: req.headers.set('Authorization', idToken)
    //   });

    //   return next.handle(cloned);
    // } else {
    // }
    return next.handle(req);
  }
}
