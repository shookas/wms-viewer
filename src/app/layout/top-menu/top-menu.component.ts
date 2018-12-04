import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ProjectsService } from '../../core/projects.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit, OnDestroy {
  currentProjectTitle: string;
  private projectSubscription: Subscription;
  constructor(
    public auth: AuthService,
    public projectsService: ProjectsService
  ) {}

  purgeProject() {
    this.projectsService.currentProject.next(null);
  }

  ngOnInit() {
    this.projectSubscription = this.projectsService.currentProject.subscribe(
      project => (this.currentProjectTitle = project ? project.title : '')
    );
  }

  ngOnDestroy() {
    this.projectSubscription.unsubscribe();
  }
}
