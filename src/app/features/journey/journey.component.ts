import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { SectionTitleComponent } from '../../shared/section-title/section-title.component';

@Component({
  selector: 'app-journey',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent],
  template: `
    <section class="journey-section section-padding">
      <div class="container">
        <app-section-title
          [title]="lang.t().journey.title"
          [subtitle]="lang.t().journey.subtitle"
          accentColor="#0066FF">
        </app-section-title>

        <div class="journey-timeline">
          @for (step of lang.t().journey.steps; track $index) {
            <div class="timeline-step">
              <div class="step-badge" [style.color]="colors[$index]">
                {{ $index + 1 }}
              </div>
              <div class="step-icon-box" [style.background-color]="colors[$index] + '1A'" [style.border-color]="colors[$index] + '33'" [style.color]="colors[$index]">
                <span class="material-icons-round">{{ icons[$index] }}</span>
              </div>
              <h4 class="step-title">{{ step.title }}</h4>
              <p class="step-desc">{{ step.desc }}</p>
            </div>
            @if ($index < lang.t().journey.steps.length - 1) {
              <div class="timeline-connector"></div>
            }
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .journey-section {
      background-color: rgba(10, 25, 47, 0.02);
    }
    .journey-timeline {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-top: 3.5rem;
      position: relative;
    }
    @media (max-width: 992px) {
      .journey-timeline {
        flex-direction: column;
        align-items: center;
        gap: 2rem;
      }
    }
    .timeline-step {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      width: 140px;
    }
    .step-badge {
      width: 32px; height: 32px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.05);
      font-weight: 800;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 0.75rem;
    }
    .step-icon-box {
      width: 68px; height: 68px;
      border-radius: 50%;
      border: 2px solid;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;
      font-size: 30px;
    }
    .step-title {
      font-size: 1rem;
      font-weight: 700;
      color: var(--primary);
      margin-bottom: 0.4rem;
    }
    .step-desc {
      font-size: 0.8rem;
      color: var(--text-secondary);
      line-height: 1.4;
    }
    .timeline-connector {
      flex: 1;
      height: 2px;
      background: linear-gradient(90deg, #0088FF 0%, #FF5722 100%);
      margin-top: 50px;
      opacity: 0.4;
    }
    @media (max-width: 992px) {
      .timeline-connector {
        width: 2px;
        height: 30px;
        margin-top: 0;
      }
    }
  `]
})
export class JourneyComponent {
  lang = inject(LanguageService);

  icons = [
    'computer',
    'videocam',
    'terminal',
    'fact_check',
    'auto_stories',
    'rocket_launch',
    'workspace_premium'
  ];

  colors = [
    '#0088FF',
    '#10B981',
    '#00C853',
    '#FF9800',
    '#FF5722',
    '#8B5CF6',
    '#EC4899'
  ];
}
