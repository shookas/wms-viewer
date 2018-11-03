import { Component, OnInit, OnDestroy } from '@angular/core';
import { Project } from '../../models/api.models';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';

@Component({
  selector: 'app-projects-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ProjectsContainerComponent implements OnInit, OnDestroy {
  projects$: Observable<any>;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.projects$ = this.apiService.getProjects();
  }

  ngOnDestroy() {
  }
}
