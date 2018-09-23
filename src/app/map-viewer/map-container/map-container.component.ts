import { ProjectsService } from './../../core/projects.service';
import { switchMap } from 'rxjs/operators';
import { Project } from './../../models/api.models';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Map, map, tileLayer } from 'leaflet';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss']
})
export class MapContainerComponent implements OnInit, AfterViewInit {
  project$: Observable<Project>;
  mapViewer: Map;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectsService: ProjectsService
  ) {}

  ngOnInit() {
    this.project$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.projectsService.getProject(params.get('id'))
      )
    );

    this.project$.subscribe(project => {
      console.log(project)
    });
  }

  ngAfterViewInit() {
    this.mapViewer = map('map').setView([52.407838, 16.932936], 13);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(
      this.mapViewer
    );
  }
}
