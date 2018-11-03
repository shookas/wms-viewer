import { Layer } from "../../models/wms-capabilities.model";

export interface Project {
  id: string;
  title: string;
  bounds: number[][];
  store: string;
  layers: Layer[];
}
