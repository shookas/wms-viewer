import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorsHandler } from './errors-handler';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpCancelInterceptor } from './http-cancel.interceptor';

@NgModule({
  imports: [CommonModule, MatSnackBarModule],
  declarations: [],
  exports: [],
  providers: [
    {
      provide: ErrorHandler,
      useClass: ErrorsHandler
    },
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: HttpCancelInterceptor
    }
  ]
})
export class CoreModule {}
