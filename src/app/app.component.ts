import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from './core/api.service';
import { Subscription } from 'rxjs';
import { ProjectsService } from './core/projects.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private apiSubscription: Subscription;

  constructor(
    private apiService: ApiService,
    private dataService: ProjectsService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.apiSubscription = this.apiService
      .getProjects()
      .subscribe(response => this.dataService.projects$.next(response.data));
  }

  ngOnDestroy() {
    this.apiSubscription.unsubscribe();
  }
}
