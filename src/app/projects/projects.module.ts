import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { MatCardModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule, MatCardModule, MatButtonModule
  ],
  declarations: [ContainerComponent, ProjectCardComponent],
  exports: [ContainerComponent]
})
export class ProjectsModule { }
