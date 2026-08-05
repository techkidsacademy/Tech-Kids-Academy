import { Component } from '@angular/core';
import { RoadmapComponent } from '../features/roadmap/roadmap.component';

@Component({
  selector: 'app-roadmap-page',
  standalone: true,
  imports: [RoadmapComponent],
  template: `
    <div class="page-wrapper">
      <app-roadmap></app-roadmap>
    </div>
  `,
  styles: [`
    .page-wrapper {
      padding-top: 72px;
    }
  `]
})
export class RoadmapPageComponent {}
