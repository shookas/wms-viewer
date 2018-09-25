import { ProjectsService } from './../../core/projects.service';
import { switchMap } from 'rxjs/operators';
import { Project } from './../../models/api.models';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Map, map, tileLayer, control } from 'leaflet';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss']
})
export class MapContainerComponent implements OnInit, AfterViewInit, OnDestroy {
  projectSubscruption: Subscription;
  readonly osm = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
  project: Project;
  mapViewer: Map;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectsService: ProjectsService
  ) {}

  ngOnInit() {
    this.loadProject();
  }

  ngAfterViewInit() {
    this.prepareMap();
  }

  ngOnDestroy() {
    this.projectSubscruption.unsubscribe();
  }

  private loadProject() {
    this.projectSubscruption = this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.projectsService.getProject(params.get('id'))
        )
      )
      .subscribe(
        project => {
          this.project = project;
          this.prepareProjectMap();
        },
        () => this.router.navigate(['/projects'])
      );
  }

  private prepareMap() {
    this.mapViewer = map('map', {
      layers: [this.osm]
    });
  }

  private prepareProjectMap() {
    if (this.project.bounds) {
      this.mapViewer.fitBounds(this.project.bounds);
    }
    this.addLayers();
  }
  private addLayers() {
    const baseLayers = {
      "Open Street Map": this.osm
    }
    const projectLayers = this.project.layers.reduce((obj, curr) => {
      obj[curr.name] = tileLayer.wms(this.project.store, {
        layers: curr.id,
        transparent: true,
        format: 'image/png'
      });
      return obj;
    }, {})

    control.layers(baseLayers, projectLayers).addTo(this.mapViewer);
  }
}
