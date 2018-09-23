import { ProjectsApi } from './../models/api.models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getProjects(): Observable<ProjectsApi> {
    const url = 'assets/projects.json';
    return this.http.get(url) as Observable<ProjectsApi>;
  }
}
