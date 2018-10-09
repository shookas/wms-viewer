import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyService } from './notify.service';

@Injectable()
export class ErrorsHandler implements ErrorHandler {
  notifyService: NotifyService;

  constructor(private injector: Injector) {
    this.notifyService = this.injector.get(NotifyService);
  }

  handleError(error: Error | HttpErrorResponse) {
    if (error instanceof HttpErrorResponse) {
      // Server or connection error happened
      if (!navigator.onLine) {
        // Handle offline error
      } else {
        this.notifyService.showError(error);
      }
    }
    console.error(error);

  }
}
