import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { SectionTitleComponent } from '../../shared/section-title/section-title.component';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent],
  template: `
    <section id="faq" class="section-padding faq-section">
      <div class="container max-w-800">
        <app-section-title
          [title]="lang.t().faqSection.title"
          [subtitle]="lang.t().faqSection.subtitle"
          accentColor="#0088FF">
        </app-section-title>

        <div class="faq-list">
          @for (item of lang.t().faqSection.items; track item.q; let i = $index) {
            <div class="faq-card" [class.expanded]="expandedIndex() === i">
              <div class="faq-header" (click)="toggle(i)">
                <div class="num-badge">{{ i + 1 }}</div>
                <h4 class="faq-q">{{ item.q }}</h4>
                <span class="material-icons-round arrow-icon">keyboard_arrow_down</span>
              </div>

              @if (expandedIndex() === i) {
                <div class="faq-body">
                  <p>{{ item.a }}</p>
                </div>
              }
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .faq-section { background: rgba(10, 25, 47, 0.02); }
    .max-w-800 { max-width: 800px; margin: 0 auto; }
    .faq-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-top: 3rem;
    }
    .faq-card {
      background: #FFFFFF;
      border-radius: 18px;
      border: 1.5px solid var(--border-color);
      overflow: hidden;
      transition: all 0.3s ease;
    }
    .faq-card.expanded {
      border-color: rgba(0, 136, 255, 0.4);
      box-shadow: 0 8px 24px rgba(0, 136, 255, 0.08);
    }
    .faq-header {
      padding: 1.25rem 1.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      cursor: pointer;
    }
    .num-badge {
      width: 32px; height: 32px;
      border-radius: 10px;
      background: rgba(10, 25, 47, 0.08);
      color: var(--primary);
      font-weight: 700;
      font-size: 0.85rem;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    .faq-card.expanded .num-badge {
      background: rgba(0, 136, 255, 0.15);
      color: var(--secondary);
    }
    .faq-q {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
      flex: 1;
    }
    .faq-card.expanded .faq-q { color: var(--primary); font-weight: 700; }

    .arrow-icon {
      color: var(--text-tertiary);
      transition: transform 0.3s ease;
    }
    .faq-card.expanded .arrow-icon {
      transform: rotate(180deg);
      color: var(--secondary);
    }

    .faq-body {
      padding: 0 1.5rem 1.25rem 4rem;
      color: var(--text-secondary);
      font-size: 0.92rem;
      line-height: 1.7;
      animation: fadeIn 0.3s ease;
    }
    [dir="rtl"] .faq-body {
      padding: 0 4rem 1.25rem 1.5rem;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `]
})
export class FaqComponent {
  lang = inject(LanguageService);
  expandedIndex = signal<number | null>(null);

  toggle(i: number): void {
    this.expandedIndex.update((curr) => (curr === i ? null : i));
  }
}
