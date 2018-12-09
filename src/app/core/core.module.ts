import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorsHandler } from './errors-handler';
import { MatSnackBarModule } from '@angular/material';
import { DragulaModule } from 'ng2-dragula';

@NgModule({
  imports: [CommonModule, MatSnackBarModule],
  declarations: [],
  exports: [],
  providers: [
    {
      provide: ErrorHandler,
      useClass: ErrorsHandler
    }
  ]
})
export class CoreModule {}
