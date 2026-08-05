import { Component } from '@angular/core';
import { CtaComponent } from '../features/cta/cta.component';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CtaComponent],
  template: `
    <div class="page-wrapper">
      <app-cta></app-cta>
    </div>
  `,
  styles: [`
    .page-wrapper {
      padding-top: 72px;
    }
  `]
})
export class ContactPageComponent {}
