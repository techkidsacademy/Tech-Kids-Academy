import { Component } from '@angular/core';
import { ProjectsComponent } from '../features/projects/projects.component';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [ProjectsComponent],
  template: `
    <div class="page-wrapper">
      <app-projects></app-projects>
    </div>
  `,
  styles: [`
    .page-wrapper {
      padding-top: 72px;
    }
  `]
})
export class ProjectsPageComponent {}
