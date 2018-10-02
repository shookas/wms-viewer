import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapContainerComponent } from './map-container/map-container.component';
import { MapSpinnerComponent } from './map-spinner/map-spinner.component';

@NgModule({
  imports: [CommonModule],
  declarations: [MapContainerComponent, MapSpinnerComponent]
})
export class MapViewerModule {}
