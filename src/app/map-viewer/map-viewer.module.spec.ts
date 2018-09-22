import { MapViewerModule } from './map-viewer.module';

describe('MapViewerModule', () => {
  let mapViewerModule: MapViewerModule;

  beforeEach(() => {
    mapViewerModule = new MapViewerModule();
  });

  it('should create an instance', () => {
    expect(mapViewerModule).toBeTruthy();
  });
});
