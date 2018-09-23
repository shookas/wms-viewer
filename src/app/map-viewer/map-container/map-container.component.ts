import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Map, map, tileLayer } from 'leaflet';

@Component({
  selector: 'app-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss']
})
export class MapContainerComponent implements OnInit, AfterViewInit {
  mapViewer: Map;
  constructor() {}

  ngOnInit() {}
  ngAfterViewInit() {
    this.mapViewer = map('map').setView([52.407838, 16.932936], 13);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(
      this.mapViewer
    );
  }
}
