import { ProjectsContainerComponent } from './pages/projects/container/container.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapContainerComponent } from './map-viewer/map-container/map-container.component';
import { LoginComponent } from './pages/login/login.component';

const appRoutes: Routes = [
  { path: 'projects', component: ProjectsContainerComponent},
  { path: 'projects/:id', component: MapContainerComponent},
  { path: 'login', component: LoginComponent },
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
