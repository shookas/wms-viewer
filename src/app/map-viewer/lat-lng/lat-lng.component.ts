import { Component, OnInit, Input } from '@angular/core';
import { LatLng } from 'leaflet';
import { MapService } from '../map.service';

@Component({
  selector: 'app-lat-lng',
  templateUrl: './lat-lng.component.html',
  styleUrls: ['./lat-lng.component.scss']
})
export class LatLngComponent implements OnInit {

  @Input() latlng: LatLng;

  constructor(public mapService: MapService) { }

  ngOnInit() {
  }

}
