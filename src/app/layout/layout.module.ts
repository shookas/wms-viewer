import { TopMenuComponent } from './top-menu/top-menu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatMenuModule,
    MatIconModule
  ],
  declarations: [TopMenuComponent],
  exports: [TopMenuComponent]
})
export class LayoutModule {}
