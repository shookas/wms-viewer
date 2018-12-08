import { NgModule } from '@angular/core';
import { MapContainerComponent } from './map-container/map-container.component';
import { MapSpinnerComponent } from './map-spinner/map-spinner.component';
import { LatLngComponent } from './lat-lng/lat-lng.component';
import { SharedModule } from '../shared/shared.module';
import { MapLayersComponent } from './map-layers/map-layers.component';

@NgModule({
  imports: [SharedModule],
  declarations: [MapContainerComponent, MapSpinnerComponent, LatLngComponent, MapLayersComponent]
})
export class MapViewerModule {}
