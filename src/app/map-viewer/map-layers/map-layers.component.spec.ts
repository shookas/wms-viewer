import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MapLayersComponent } from './map-layers.component';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DragulaService } from 'ng2-dragula';

describe('MapLayersComponent', () => {
  let component: MapLayersComponent;
  let fixture: ComponentFixture<MapLayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MapLayersComponent],
      imports: [MatRadioModule, MatCheckboxModule, MatSliderModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [DragulaService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapLayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('projectLayers', () => {
    const mockLayer = { setZIndex: () => {} };
    const mockProjectLayers = {
      '0': mockLayer,
      b: mockLayer,
      a: mockLayer,
      '1': mockLayer,
      '03': mockLayer,
      '001': mockLayer
    } as any;
    it('should create', () => {
      component.projectLayers = mockProjectLayers;
      fixture.detectChanges();
      const keys = component.projectLayers.map(a => a[0]);
      expect(keys).toEqual(['0', '001', '03', '1', 'a', 'b']);
    });
  });
});
