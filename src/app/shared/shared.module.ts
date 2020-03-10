import { MatSliderModule } from '@angular/material/slider';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRadioModule } from '@angular/material/radio';

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
