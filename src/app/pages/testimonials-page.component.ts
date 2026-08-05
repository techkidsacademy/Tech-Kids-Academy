import { Component } from '@angular/core';
import { TestimonialsComponent } from '../features/testimonials/testimonials.component';

@Component({
  selector: 'app-testimonials-page',
  standalone: true,
  imports: [TestimonialsComponent],
  template: `
    <div class="page-wrapper">
      <app-testimonials></app-testimonials>
    </div>
  `,
  styles: [`
    .page-wrapper {
      padding-top: 72px;
    }
  `]
})
export class TestimonialsPageComponent {}
