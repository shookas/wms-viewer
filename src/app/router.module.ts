import { ProjectsContainerComponent } from './projects/container/container.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapContainerComponent } from './map-viewer/map-container/map-container.component';

const appRoutes: Routes = [
  { path: 'projects', component: ProjectsContainerComponent },
  { path: 'maps/:id', component: MapContainerComponent },
  {
    path: '',
    redirectTo: '/projects',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '/projects' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRouterModule {}
