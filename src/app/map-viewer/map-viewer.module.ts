import { NgModule } from '@angular/core';
import { MapContainerComponent } from './map-container/map-container.component';
import { MapSpinnerComponent } from './map-spinner/map-spinner.component';
import { LatLngComponent } from './lat-lng/lat-lng.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule],
  declarations: [MapContainerComponent, MapSpinnerComponent, LatLngComponent]
})
export class MapViewerModule {}
