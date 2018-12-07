import { Injectable } from '@angular/core';
import { TileLayer, tileLayer, LatLng } from 'leaflet';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  registerWmsLoader() {
    const that = this;
    (TileLayer as any).WMS_Headers = TileLayer.WMS.extend({
      createTile(coords, done) {
        const url = this.getTileUrl(coords);
        const img = document.createElement('img');
        let headers = new HttpHeaders();
        headers = headers.append('X-Credentials', that.auth.getAuthToken());
        that.http.get(url, { headers, responseType: 'blob' }).subscribe(res => {
          img.src = URL.createObjectURL(res);
          done(null, img);
        });
        return img;
      }
    });
    (tileLayer as any).wms_headers = (url, options) =>
      new (TileLayer as any).WMS_Headers(url, options);
  }

  private toDegreesMinutesAndSeconds(coordinate) {
    const absolute = Math.abs(coordinate);
    const degrees = Math.floor(absolute);
    const minutesNotTruncated = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesNotTruncated);
    const seconds = Math.floor((minutesNotTruncated - minutes) * 60);

    return degrees + ' ' + minutes + ' ' + seconds;
  }

  convertDMS(latlng: LatLng) {
    const latitude = this.toDegreesMinutesAndSeconds(latlng.lat);
    const latitudeCardinal = Math.sign(latlng.lat) >= 0 ? 'N' : 'S';

    const longitude = this.toDegreesMinutesAndSeconds(latlng.lng);
    const longitudeCardinal = Math.sign(latlng.lng) >= 0 ? 'E' : 'W';

    return {
      lat: `${latitude} ${latitudeCardinal}`,
      lng: `${longitude} ${longitudeCardinal}`
    };
  }
}
