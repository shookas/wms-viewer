import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  defaultOptions: MatSnackBarConfig = {
    duration: 2000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom'
  };

  constructor(public snackBar: MatSnackBar, private zone: NgZone) {}

  showError(error: HttpErrorResponse | Error | string) {
    this.zone.run(() => {
      const errorMessage = typeof error === 'string' ? error : error.message;
      this.snackBar.open(errorMessage, 'OK', this.defaultOptions);
    });
  }
}
