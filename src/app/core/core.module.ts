import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorsHandler } from './errors-handler';
import { MatSnackBarModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, MatSnackBarModule],
  declarations: [],
  exports: [],
  providers: [
    {
      provide: ErrorHandler,
      useClass: ErrorsHandler,
    }
  ]
})
export class CoreModule {}
