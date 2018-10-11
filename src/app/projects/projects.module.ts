import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsContainerComponent } from './container/container.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    FormsModule
  ],
  declarations: [
    ProjectsContainerComponent,
    ProjectCardComponent,
    CreateProjectComponent
  ],
  exports: [ProjectsContainerComponent]
})
export class ProjectsModule {}
