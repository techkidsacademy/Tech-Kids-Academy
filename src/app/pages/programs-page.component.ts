import { Component } from '@angular/core';
import { JourneyComponent } from '../features/journey/journey.component';

@Component({
  selector: 'app-programs-page',
  standalone: true,
  imports: [JourneyComponent],
  template: `
    <div class="page-wrapper">
      <app-journey></app-journey>
    </div>
  `,
  styles: [`
    .page-wrapper {
      padding-top: 72px;
    }
  `]
})
export class ProgramsPageComponent {}
