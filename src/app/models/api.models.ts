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

export interface User {
  _id: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
}

export interface UserResp extends RootObject {
  user: User;
}

export interface RootObject {
  message?: string;
  error?: string;
  token?: string;
  success: boolean;
}
