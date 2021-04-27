import { Injectable } from '@angular/core';
import { WorkspacesResponse } from '../models/api.models';
import { Observable, forkJoin, Subject, BehaviorSubject } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { Project } from '../pages/projects/project-card/project.model';
import { IWmsCapablilities } from '../models/wms-capabilities.model';
import * as WMSCapabilities from 'wms-capabilities';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  static readonly projectsUrl = 'geoserver/rest/workspaces.json';
  currentProject = new BehaviorSubject<Project>(null);
  private workspaces: string[];

  constructor(private http: HttpClient) {}

  getProject(workspaceName: string): Observable<Project> {
    this.workspaces = [workspaceName];
    return this.getCapablilities(workspaceName).pipe(
      map(this.capabilitiesParser),
      map(this.tranformToProject.bind(this))
    );
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<WorkspacesResponse>(ProjectsService.projectsUrl).pipe(
      map(res => {
        this.workspaces = res.workspaces?.workspace?.map(work => work.name) || [];
        return res.workspaces?.workspace || [];
      }),
      mergeMap(workspaces =>
        forkJoin(
          workspaces.map(workspace => this.getCapablilities(workspace.name))
        )
      ),
      map(xmlRes => xmlRes.map(this.capabilitiesParser)),
      map(jsRes => jsRes.map(this.tranformToProject.bind(this)))
    );
  }

  private getCapablilities(workspaceName: string) {
    const wmsUrl = `geoserver/${workspaceName}/wms`;
    const params = new HttpParams()
      .set('service', 'wms')
      .set('version', '1.1.1')
      .set('request', 'GetCapabilities');
    const headers = new HttpHeaders().set('Content-Type', 'text/xml');
    return this.http.get(wmsUrl, { params, headers, responseType: 'text' });
  }

  private capabilitiesParser(xml: string): IWmsCapablilities {
    return new WMSCapabilities(xml).toJSON() as IWmsCapablilities;
  }

  private tranformToProject(
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
      store: `geoserver/gwc/service/wms`,
      layers: capabilities.Capability.Layer.Layer
    };
  }
}
