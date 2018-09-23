import { DataService } from './../../core/data.service';
import { ApiService } from './../../core/api.service';
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
  private apiSubscription: Subscription;
  private projectsSubscription: Subscription;
  constructor(
    private apiService: ApiService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.apiSubscription = this.apiService
      .getProjects()
      .subscribe(response => this.dataService.projects.next(response.data));

    this.projectsSubscription = this.dataService.projects.subscribe(
      projects => (this.projects = projects)
    );
  }

  ngOnDestroy() {
    this.apiSubscription.unsubscribe();
    this.projectsSubscription.unsubscribe();
  }
}
