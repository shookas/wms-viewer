import { ProjectsService } from './../../core/projects.service';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import {
  Map,
  map,
  tileLayer,
  control,
  LeafletEvent,
  LatLngBoundsExpression,
} from 'leaflet';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import 'leaflet-measure/dist/leaflet-measure.pl.js';
import { Project } from 'src/app/projects/project-card/project.model';
import { MapHelperService } from '../map-helper.service';

@Component({
  selector: 'app-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss']
})
export class MapContainerComponent implements OnInit, AfterViewInit, OnDestroy {
  projectSubscruption: Subscription;
  loadingLayers = {};
  maxZoom = 22;
  minZoom = 12;
  readonly osm = tileLayer(
    'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
    {
      maxZoom: this.maxZoom,
      minZoom: this.minZoom
    }
  );
  project: Project;
  mapViewer: Map;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectsService: ProjectsService,
    private mapHelper: MapHelperService
  ) {}

  ngOnInit() {
    this.mapHelper.registerWmsLoader();
    this.loadProject();
  }

  ngAfterViewInit() {
    this.prepareMap();
  }

  ngOnDestroy() {
    this.projectSubscruption.unsubscribe();
  }

  isLoadingLayers() {
    return Object.values(this.loadingLayers).some(loading => !!loading);
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
          if (!this.mapViewer) {
            this.prepareMap();
          }
          this.prepareProjectMap();
        },
        () => this.router.navigate(['/projects'])
      );
  }

  private prepareMap() {
    if (this.mapViewer) return;
    this.mapViewer = map('map', {
      layers: [this.osm],
      maxZoom: this.maxZoom,
      minZoom: this.minZoom
    });
    const measureControl = (control as any).measure({
      primaryLengthUnit: 'metry',
      secondaryLengthUnit: undefined,
      primaryAreaUnit: 'hektary',
      secondaryAreaUnit: undefined,
      activeColor: '#a50e0e',
      completedColor: '#a50e0e',
      units: {
        metry: {
          factor: 1,
          display: 'metry',
          decimals: 2
        },
        hektary: {
          factor: 0.0001,
          display: 'hektary',
          decimals: 2
        }
      },
      popupOptions: {
        className: 'leaflet-measure-resultpopup',
        autoPanPadding: [10, 10]
      }
    });
    measureControl.addTo(this.mapViewer);
  }

  private prepareProjectMap() {
    if (this.project.bounds) {
      this.mapViewer.fitBounds(this.project.bounds as LatLngBoundsExpression);
    }
    this.addLayers();
    this.addScale();
  }

  private addLayers() {
    const baseLayers = {
      'Open Street Map': this.osm
    };
    if (!this.project.layers) return;
    const projectLayers = this.project.layers.reduce((obj, curr) => {
      obj[curr.Name] = (tileLayer as any)
        .wms_headers(this.project.store, {
          layers: curr.Name,
          transparent: true,
          format: 'image/png',
          maxZoom: this.maxZoom,
          minZoom: this.minZoom,
          tiled: true
        })
        .addEventListener('load', this.setLoadingLayer.bind(this, false))
        .addEventListener('add', this.setLoadingLayer.bind(this, true))
        .addEventListener('remove', this.setLoadingLayer.bind(this, false));
      return obj;
    }, {});
    control.layers(baseLayers, projectLayers).addTo(this.mapViewer);
  }

  private setLoadingLayer(loading: boolean, event: LeafletEvent) {
    this.loadingLayers[event.target.options.layers] = loading;
  }

  private addScale() {
    control.scale({
      imperial: false,
      position: 'bottomleft'
    }).addTo(this.mapViewer);
  }
}
