import { ProjectsService } from '../../core/projects.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Project } from '../../models/api.models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-projects-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ProjectsContainerComponent implements OnInit, OnDestroy {
  projects: Project[];

  private projectsSubscription: Subscription;
  constructor(private dataService: ProjectsService) {}

  ngOnInit() {
    this.projectsSubscription = this.dataService.projects$.subscribe(
      projects => (this.projects = projects)
    );
  }

  ngOnDestroy() {
    this.projectsSubscription.unsubscribe();
  }
}
