import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LatLng, LeafletMouseEvent, Map, TileLayer } from 'leaflet';
import { FeatureInfo } from '../models/feature-info.model';
import { DetailModalComponent } from '../shared/detail-modal/detail-modal.component';

@Injectable({
  providedIn: 'root'
})
export class FeatureInfoService {

  constructor(private http: HttpClient, public dialog: MatDialog) { }

  getFeatureInfo<P>(evt: LeafletMouseEvent, map: Map, queryableLayer: string) {
    const [projectId] = queryableLayer.split(':');
    const params = this.getFeatureInfoUrl(evt.latlng, map, queryableLayer);
    return this.http.get<FeatureInfo<P>>(`/geoserver/${projectId}/wms`, { params });
  }

  private getFeatureInfoUrl(latlng: LatLng, map: Map, layer: string): HttpParams {
    const point = map.latLngToContainerPoint(latlng);
    const size = map.getSize();
    return new HttpParams()
      .set('request', 'GetFeatureInfo')
      .set('service', 'WMS')
      .set('srs', 'EPSG:4326')
      .set('version', '1.1.1')
      .set('info_format', 'application/json')
      .set('bbox', map.getBounds().toBBoxString())
      .set('height', size.y.toString())
      .set('width', size.x.toString())
      .set('layers', layer)
      .set('query_layers', layer)
      .set('width', size.x.toString())
      .set('x', point.x.toString())
      .set('y', point.y.toString())
  }

  queryableLayer(map: Map): string {
    const visibleLayers = [];
    map.eachLayer(lr => {
      const { layers, zIndex } = (lr as any).options
      if (layers) {
        visibleLayers.push({ layers, zIndex })
      }
    });
    if (visibleLayers.length) {
      visibleLayers.sort((a, b) => (a.zIndex > b.zIndex) ? -1 : 1)
      return visibleLayers[0].layers
    }
  }

  showGetFeatureInfo(properties: {[key: string]: string | number}) {
    this.dialog.open(DetailModalComponent, {
      data: properties
    });
  }
}
