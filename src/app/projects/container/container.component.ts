import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectsService } from 'src/app/core/projects.service';
import { Project } from '../project-card/project.model';

@Component({
  selector: 'app-projects-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ProjectsContainerComponent implements OnInit, OnDestroy {
  projects$: Observable<Project[]>;

  constructor(private projectsService: ProjectsService) {}

  ngOnInit() {
    this.projects$ = this.projectsService.getProjects();
  }

  ngOnDestroy() {
  }
}
