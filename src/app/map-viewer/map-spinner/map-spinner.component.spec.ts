import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSpinnerComponent } from './map-spinner.component';

describe('MapSpinnerComponent', () => {
  let component: MapSpinnerComponent;
  let fixture: ComponentFixture<MapSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
