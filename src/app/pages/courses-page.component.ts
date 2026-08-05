import { Component } from '@angular/core';
import { CoursesComponent } from '../features/courses/courses.component';

@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [CoursesComponent],
  template: `
    <div class="page-wrapper">
      <app-courses></app-courses>
    </div>
  `,
  styles: [`
    .page-wrapper {
      padding-top: 72px;
    }
  `]
})
export class CoursesPageComponent {}
