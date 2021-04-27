import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyService } from './notify.service';
import { AuthService } from './auth/auth.service';

@Injectable()
export class ErrorsHandler implements ErrorHandler {
  notifyService: NotifyService;
  authService: AuthService;

  constructor(private injector: Injector) {
    this.notifyService = this.injector.get(NotifyService);
    this.authService = this.injector.get(AuthService);
  }

  handleError(error: Error | HttpErrorResponse) {
    if (error instanceof HttpErrorResponse) {
      // Server or connection error happened
      console.log(error);
      
      if (error.status === 401 || error.status === 403) {
        this.authService.logout()
      }
      if (!navigator.onLine) {
        // Handle offline error
      } else {
        if (error.status !== 0) {
          this.notifyService.showError(error);
        }
      }
    }
    console.error(error);

  }
}
