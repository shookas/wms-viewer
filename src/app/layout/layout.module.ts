import { TopMenuComponent } from './top-menu/top-menu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, MatToolbarModule],
  declarations: [TopMenuComponent],
  exports: [TopMenuComponent]
})
export class LayoutModule {}
