import { LatLngBounds } from "leaflet";

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  bounds?: LatLngBounds;
}

export interface ProjectsApi {
  data: Project[];
}
