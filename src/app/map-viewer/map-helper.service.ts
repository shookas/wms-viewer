import { Injectable } from '@angular/core';
import { TileLayer, tileLayer } from 'leaflet';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MapHelperService {
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
}
