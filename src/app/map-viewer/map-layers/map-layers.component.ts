import { Component, OnInit, Input } from '@angular/core';
import { Map, TileLayer } from 'leaflet';
import { MatCheckboxChange, MatRadioChange, MatSliderChange } from '@angular/material';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'app-map-layers',
  templateUrl: './map-layers.component.html',
  styleUrls: ['./map-layers.component.scss']
})
export class MapLayersComponent implements OnInit {
  @Input()
  map: Map;

  _baseLayers: any[];
  @Input()
  set baseLayers(value) {
    if (value) {
      this._baseLayers = Object.entries(value);
    }
  }
  get baseLayers() {
    return this._baseLayers;
  }
  _projectLayers: any[];
  @Input()
  set projectLayers(value) {
    if (value) {
      this._projectLayers = Object.entries(value);
    }
  }
  get projectLayers() {
    return this._projectLayers;
  }

  dragProjectLayers = 'DRAG_PROJECT_LAYERS';

  constructor(private dragulaService: DragulaService) {}

  ngOnInit() {
    this.dragulaService.createGroup(this.dragProjectLayers, {
      moves: (el, source, handle, sibling) =>
        handle.className === 'mat-checkbox-label'
    });
  }

  onProjectLayerChange(change: MatCheckboxChange, layer: TileLayer) {
    if (change.checked) {
      layer.addTo(this.map);
    } else {
      layer.remove();
    }
  }

  onBaseLayerChange(change: MatRadioChange) {
    change.value.addTo(this.map);
  }

  onDragulaModelChange(event) {
    this._projectLayers = event;
    this.projectLayers.forEach((entry, index) => {
      (entry[1] as TileLayer).setZIndex(index + 1);
    });
  }

  onSliderChange(event: MatSliderChange, layer: TileLayer) {
    const opacity = event.value / 100;
    layer.setOpacity(opacity);
  }
}
