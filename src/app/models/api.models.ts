import { LatLngBounds } from "leaflet";

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  bounds?: LatLngBounds;
  store: string;
  layers: Layer[];
}

export interface Layer {
  id: string;
  name: string;
}

export interface ProjectsApi {
  data: Project[];
}
