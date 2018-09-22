export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  boundaries: [number, number, number, number];
}

export interface ProjectsApi {
  data: Project[];
}
