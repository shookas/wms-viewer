import { Component, OnInit, Input } from '@angular/core';
import { Map } from 'leaflet';

@Component({
  selector: 'app-map-layers',
  templateUrl: './map-layers.component.html',
  styleUrls: ['./map-layers.component.scss']
})
export class MapLayersComponent implements OnInit {
  @Input()
  map: Map;

  _baseLayers;
  @Input()
  set baseLayers(value) {
    if (value) {
      this._baseLayers = Object.entries(value);
    }
  }
  get baseLayers() {
    return this._baseLayers;
  }
  _projectLayers;
  @Input()
  set projectLayers(value) {
    if (value) {
      this._projectLayers = Object.entries(value);
    }
  }
  get projectLayers() {
    return this._projectLayers;
  }

  constructor() {}

  ngOnInit() {}
}
