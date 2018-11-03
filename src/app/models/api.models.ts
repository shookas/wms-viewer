export interface Workspace {
  name: string;
  href: string;
}

export interface Workspaces {
  workspace: Workspace[];
}

export interface WorkspacesResponse {
  workspaces: Workspaces;
}
