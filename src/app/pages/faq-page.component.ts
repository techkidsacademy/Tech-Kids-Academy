import { Component } from '@angular/core';
import { FaqComponent } from '../features/faq/faq.component';

@Component({
  selector: 'app-faq-page',
  standalone: true,
  imports: [FaqComponent],
  template: `
    <div class="page-wrapper">
      <app-faq></app-faq>
    </div>
  `,
  styles: [`
    .page-wrapper {
      padding-top: 72px;
    }
  `]
})
export class FaqPageComponent {}
