import { ApiService } from './../../core/api.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Project } from '../../models/api.models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-projects-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit, OnDestroy {
  projects: Project[];
  substription: Subscription;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.substription = this.apiService
      .getProjects()
      .subscribe(response => (this.projects = response.data));
  }

  ngOnDestroy() {
    this.substription.unsubscribe();
  }
}
