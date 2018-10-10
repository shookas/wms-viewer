import { ProjectsContainerComponent } from './projects/container/container.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapContainerComponent } from './map-viewer/map-container/map-container.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/auth.guard';

const appRoutes: Routes = [
  { path: 'projects', component: ProjectsContainerComponent, canActivate: [AuthGuard] },
  { path: 'projects/:id', component: MapContainerComponent, canActivate: [AuthGuard] },
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
