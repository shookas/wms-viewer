import { TopMenuComponent } from './top-menu/top-menu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, MatToolbarModule, MatButtonModule, RouterModule],
  declarations: [TopMenuComponent],
  exports: [TopMenuComponent]
})
export class LayoutModule {}
