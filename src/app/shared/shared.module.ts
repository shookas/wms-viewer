import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatSidenavModule,
  MatButtonModule,
  MatIconModule
} from '@angular/material';

@NgModule({
  imports: [CommonModule, MatSidenavModule, MatButtonModule, MatIconModule],
  declarations: [],
  exports: [CommonModule, MatSidenavModule, MatButtonModule, MatIconModule]
})
export class SharedModule {}
