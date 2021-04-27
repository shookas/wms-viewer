import { ProjectsService } from './../../core/projects.service';
import { switchMap } from 'rxjs/operators';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef,
  AfterViewChecked
} from '@angular/core';
import {
  Map,
  map,
  tileLayer,
  control,
  LeafletEvent,
  LatLngBoundsExpression,
  LeafletMouseEvent,
  LocationEvent,
  circle,
  layerGroup,
  LayerGroup
} from 'leaflet';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import 'leaflet-measure/dist/leaflet-measure.pl.js';
import { Project } from 'src/app/pages/projects/project-card/project.model';
import { MapService } from '../map.service';
import { FeatureInfoService } from '../feature-info.service';
import { AccessibilityService } from 'src/app/core/accessibility.service';

@Component({
  selector: 'app-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss']
})
export class MapContainerComponent
  implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked {
  projectSubscruption: Subscription;
  loadingLayers = {};
  maxZoom = 22;
  minZoom = 12;
  latlng: {
    lat: string;
    lng: string;
  };
  readonly osm = tileLayer(
    'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png'
  );
  readonly osm_BlackAndWhite = tileLayer(
    'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'
  );
  readonly esri_WorldImagery = tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
  );
  project: Project;
  mapViewer: Map;

  baseLayers;
  projectLayers;

  sideNavOpened: boolean;
  showSpinner = false;

  private locationLayer: LayerGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectsService: ProjectsService,
    private mapService: MapService,
    private cdRef: ChangeDetectorRef,
    private featureInfoService: FeatureInfoService,
    private accessibilityService: AccessibilityService
  ) { }

  ngOnInit() {
    this.mapService.registerWmsLoader();
    this.loadProject();
  }

  ngAfterViewInit() {
    this.prepareMap();
    this.enableLocationOnMobile();
    this.mapViewer.addEventListener(
      'mousemove',
      this.updateCordsEvent.bind(this)
    );
    this.mapViewer.addEventListener(
      'touchmove',
      this.updateCordsEvent.bind(this)
    );
    this.mapViewer.addEventListener(
      'click',
      this.onMapClick.bind(this)
    );
    this.mapViewer.addEventListener('locationfound',
      this.onLocationEnabled.bind(this)
    );
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnDestroy() {
    this.projectSubscruption.unsubscribe();
  }

  isLoadingLayers() {
    return Object.values(this.loadingLayers).some(loading => !!loading);
  }

  toggleMapLayers(event: MouseEvent) {
    event.stopPropagation();
    this.sideNavOpened = !this.sideNavOpened;
  }

  private updateCordsEvent(event: LeafletMouseEvent) {
    this.latlng = this.mapService.convertDMS(event.latlng);
  }

  private enableLocationOnMobile() {
    if (this.accessibilityService.isMobile) {
      this.mapViewer.locate({ setView: true, maxZoom: 16 });
    }
  }

  private onLocationEnabled(event: LocationEvent) {
    const radius = event.accuracy;
    const position = circle(event.latlng, 2, { color: 'red' });
    const accuracy = circle(event.latlng, radius);
    this.locationLayer = layerGroup([position, accuracy])
    this.mapViewer.addLayer(this.locationLayer)
  }

  private onMapClick(event: LeafletMouseEvent) {
    const queryableLayer = this.featureInfoService.queryableLayer(this.mapViewer);
    if (queryableLayer) {
      this.showSpinner = true;
      this.projectSubscruption.add(
        this.featureInfoService.getFeatureInfo<{ [key: string]: string | number }>(event, this.mapViewer, queryableLayer).subscribe(res => {
          if (res.features.length) {
            this.featureInfoService.showGetFeatureInfo(res.features[0]?.properties);
          }
          this.showSpinner = false;
        })
      )
    }
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
          this.projectsService.currentProject.next(project);
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
      position: 'topleft',
      primaryLengthUnit: 'metry',
      secondaryLengthUnit: undefined,
      primaryAreaUnit: 'hektary',
      secondaryAreaUnit: 'sqmeters',
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
    this.baseLayers = {
      'Open Street Map': this.osm,
      'Open Street Map B/W': this.osm_BlackAndWhite,
      'Esri Orto': this.esri_WorldImagery
    };
    if (!this.project.layers) return;
    this.projectLayers = this.project.layers.reduce((obj, curr) => {
      obj[curr.Name] = (tileLayer as any)
        .wms_headers(this.project.store, {
          layers: this.project.id + ':' + curr.Name,
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
  }

  private setLoadingLayer(loading: boolean, event: LeafletEvent) {
    this.loadingLayers[event.target.options.layers] = loading;
  }

  private addScale() {
    control
      .scale({
        imperial: false,
        position: 'bottomleft'
      })
      .addTo(this.mapViewer);
  }
}
