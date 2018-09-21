import { MaterialModule } from './material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [],
  exports: [CommonModule, MaterialModule]
})
export class CoreModule {}
