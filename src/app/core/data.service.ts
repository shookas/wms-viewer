import { Injectable } from '@angular/core';
import { Project } from '../models/api.models';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  projects: Subject<Project[]> = new Subject();
  constructor() {}
}
