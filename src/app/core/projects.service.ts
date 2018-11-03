import { Injectable } from '@angular/core';
import { WorkspacesResponse } from '../models/api.models';
import { Observable, forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { Project } from '../projects/project-card/project.model';
import { IWmsCapablilities } from '../models/wms-capabilities.model';
const WMSCapabilities = require('wms-capabilities');

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  static readonly projectsUrl = 'geoserver/rest/workspaces.json';
  private workspaces: string[];

  constructor(private http: HttpClient) {}

  // getProject(id: string): Observable<Project> {
  //   return this.projects$.pipe(
  //     map(projects => {
  //       const foundProj = projects.find(proj => proj.id.toString() === id);
  //       if (foundProj) {
  //         return foundProj;
  //       } else {
  //         throw new Error('not found');
  //       }
  //     })
  //   );
  // }

  getProjects(): Observable<Project[]> {
    return this.http.get<WorkspacesResponse>(ProjectsService.projectsUrl).pipe(
      map(res => {
        this.workspaces = res.workspaces.workspace.map(work => work.name);
        return res.workspaces.workspace;
      }),
      mergeMap(workspaces =>
        forkJoin(
          workspaces.map(workspace => this.enrichProject(workspace.name))
        )
      ),
      map(xmlRes => xmlRes.map(this.getCapabilitiesParser)),
      map(jsRes => jsRes.map(this.parseCapabilitiesToProject.bind(this)))
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

  private getCapabilitiesParser(xml: string): IWmsCapablilities {
    return new WMSCapabilities(xml).toJSON() as IWmsCapablilities;
  }

  private parseCapabilitiesToProject(
    capabilities: IWmsCapablilities,
    index: number
  ): Project {
    return {
      id: this.workspaces[index],
      title: this.workspaces[index],
      bounds: [
        [
          capabilities.Capability.Layer.LatLonBoundingBox[1],
          capabilities.Capability.Layer.LatLonBoundingBox[0]
        ],
        [
          capabilities.Capability.Layer.LatLonBoundingBox[3],
          capabilities.Capability.Layer.LatLonBoundingBox[2]
        ]
      ],
      store: this.workspaces[index],
      layers: capabilities.Capability.Layer.Layer
    };
  }
}
