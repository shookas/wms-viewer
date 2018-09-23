import { Injectable } from '@angular/core';
import { Project } from '../models/api.models';
import { Subject, Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  projects$: Subject<Project[]> = new Subject();

  constructor() {}

  getProject(id: string): Observable<Project> {
    return this.projects$.pipe(
      switchMap(proj => proj),
      filter(proj => proj.id.toString() === id)
    );
  }
}
