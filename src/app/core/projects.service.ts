import { Injectable } from '@angular/core';
import { Project } from '../models/api.models';
import { Subject, Observable, ReplaySubject } from 'rxjs';
import { filter, switchMap, findIndex, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  projects$: Subject<Project[]> = new ReplaySubject(1);

  constructor() {}

  getProject(id: string): Observable<Project> {
    return this.projects$.pipe(
      map(projects => {
        const foundProj = projects.find(proj => proj.id.toString() === id);
        if (foundProj) {
          return foundProj;
        } else {
          throw new Error('not found');
        }
      })
    );
  }
}
