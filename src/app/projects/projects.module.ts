import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsContainerComponent } from './container/container.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule, MatCardModule, MatButtonModule
  ],
  declarations: [ProjectsContainerComponent, ProjectCardComponent],
  exports: [ProjectsContainerComponent]
})
export class ProjectsModule { }
