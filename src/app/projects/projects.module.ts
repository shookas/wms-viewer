import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsContainerComponent } from './container/container.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { MatCardModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule, MatCardModule, MatButtonModule
  ],
  declarations: [ProjectsContainerComponent, ProjectCardComponent],
  exports: [ProjectsContainerComponent]
})
export class ProjectsModule { }
