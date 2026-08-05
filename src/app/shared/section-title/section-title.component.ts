import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-title',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="section-title-container">
      <div class="subtitle-badge" [style.color]="accentColor" [style.border-color]="accentColor + '33'" [style.background-color]="accentColor + '12'">
        <span class="dot" [style.background-color]="accentColor"></span>
        <span>{{ subtitle }}</span>
      </div>
      <h2 class="title">{{ title }}</h2>
      <div class="divider-line" [style.background-color]="accentColor"></div>
    </div>
  `,
  styles: [`
    .section-title-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    .subtitle-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 16px;
      border-radius: 30px;
      font-size: 0.85rem;
      font-weight: 700;
      border: 1px solid;
      margin-bottom: 1rem;
    }
    .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
    }
    .title {
      font-size: 2.25rem;
      font-weight: 800;
      color: var(--primary);
      margin-bottom: 0.75rem;
      letter-spacing: -0.5px;
    }
    @media (max-width: 768px) {
      .title {
        font-size: 1.75rem;
      }
    }
    .divider-line {
      width: 48px;
      height: 4px;
      border-radius: 2px;
      margin-top: 0.25rem;
    }
  `]
})
export class SectionTitleComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) subtitle!: string;
  @Input() accentColor = '#0088FF';
}
