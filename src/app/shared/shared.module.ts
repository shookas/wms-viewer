import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatSidenavModule,
  MatButtonModule,
  MatIconModule,
  MatCheckboxModule,
  MatRadioModule,
  MatSliderModule,
  MatTooltipModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';

const shared = [
  CommonModule,
  MatSidenavModule,
  MatButtonModule,
  MatIconModule,
  MatCheckboxModule,
  MatRadioModule,
  FormsModule,
  MatSliderModule,
  MatTooltipModule
];

@NgModule({
  imports: [...shared],
  declarations: [],
  exports: [...shared]
})
export class SharedModule {}
