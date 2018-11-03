import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { map, tileLayer, Map, LatLngBounds, LatLngBoundsExpression } from 'leaflet';
import { Router } from '@angular/router';
import { Project } from './project.model';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit, AfterViewInit {
  @Input()
  project: Project;

  hoverOnMap: boolean;

  private poznanCords: [number, number] = [52.407838, 16.932936];
  private mapView: Map;

  constructor(private router: Router) {}

  ngOnInit() {}
  ngAfterViewInit() {
    const mapId = `map-${this.project.id}`;
    const mapOptions = {
      zoomControl: false,
      dragging: false,
      scrollWheelZoom: false
    };
    this.mapView = map(mapId, mapOptions).setView(this.poznanCords, 13);
    this.addLayersToMap();
  }

  onMapClick() {
    this.router.navigate(['projects', this.project.id]);
  }

  setHoverOnMap(value: boolean) {
    this.hoverOnMap = value;
  }

  private addLayersToMap() {
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(
      this.mapView
    );
    this.zoomToBounds();
  }

  private zoomToBounds() {
    if (this.project.bounds) {
      this.mapView.fitBounds(this.project.bounds as LatLngBoundsExpression);
    }
  }
}
