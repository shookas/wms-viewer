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
import { DetailModalComponent } from './detail-modal/detail-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { SpinnerOverlayComponent } from './spinner-overlay/spinner-overlay.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const shared = [
  CommonModule,
  MatSidenavModule,
  MatButtonModule,
  MatIconModule,
  MatCheckboxModule,
  MatRadioModule,
  FormsModule,
  MatSliderModule,
  MatTooltipModule,
  MatDialogModule,
  MatTableModule,
  MatProgressSpinnerModule
];

@NgModule({
  imports: [...shared],
  declarations: [DetailModalComponent, SpinnerOverlayComponent],
  entryComponents: [DetailModalComponent],
  exports: [...shared, DetailModalComponent, SpinnerOverlayComponent]
})
export class SharedModule { }
