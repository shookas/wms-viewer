import { ProjectsApi, WorkspacesResponse } from './../models/api.models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  static readonly projectsUrl = 'geoserver/rest/workspaces.json';
  constructor(private http: HttpClient) {}

  getProjects(): Observable<any> {
    return this.http.get<WorkspacesResponse>(ApiService.projectsUrl).pipe(
      map(res => res.workspaces.workspace),
      mergeMap(workspaces =>
        forkJoin(
          workspaces.map(workspace => this.enrichProject(workspace.name))
        )
      ),
      map(console.log)
    );
  }

  private enrichProject(workspaceName: string) {
    const wmsUrl = `geoserver/${workspaceName}/wms`;
    const params = new HttpParams()
      .set('service', 'wms')
      .set('version', '1.1.1')
      .set('request', 'GetCapabilities');
    const headers = new HttpHeaders().set('Content-Type', 'text/xml');
    return this.http.get(wmsUrl, { params, headers, responseType: 'text' });
  }
}
