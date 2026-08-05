import { Component } from '@angular/core';
import { InstructorsComponent } from '../features/instructors/instructors.component';

@Component({
  selector: 'app-instructors-page',
  standalone: true,
  imports: [InstructorsComponent],
  template: `
    <div class="page-wrapper">
      <app-instructors></app-instructors>
    </div>
  `,
  styles: [`
    .page-wrapper {
      padding-top: 72px;
    }
  `]
})
export class InstructorsPageComponent {}
