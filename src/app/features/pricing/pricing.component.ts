import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { SectionTitleComponent } from '../../shared/section-title/section-title.component';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, RouterLink, SectionTitleComponent],
  template: `
    <section id="pricing" class="section-padding pricing-section">
      <div class="container">
        <app-section-title
          [title]="lang.t().pricingSection.title"
          [subtitle]="lang.t().pricingSection.subtitle"
          accentColor="#0A192F">
        </app-section-title>

        <div class="pricing-grid">
          @for (plan of lang.t().pricingSection.plans; track plan.name; let i = $index) {
            <div class="pricing-card" [class.popular]="i === 1">
              @if (i === 1) {
                <div class="popular-badge">{{ lang.t().pricingSection.mostPopular }}</div>
              }

              <h3 class="plan-name">{{ plan.name }}</h3>
              <p class="plan-desc">{{ plan.desc }}</p>

              <div class="price-row">
                <span class="price-val">{{ prices[i] }}</span>
                <span class="price-period">{{ lang.t().pricingSection.perMonth }}</span>
              </div>

              <ul class="features-list">
                @for (feat of plan.features; track feat) {
                  <li>
                    <span class="material-icons-round check-icon">check</span>
                    <span>{{ feat }}</span>
                  </li>
                }
              </ul>

              <a [routerLink]="['/roadmap']" [queryParams]="{ level: i + 1 }" class="btn-plan" [class.btn-popular]="i === 1">
                <span class="material-icons-round btn-ic">alt_route</span>
                <span>{{ plan.cta }}</span>
              </a>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .pricing-section { background: var(--bg-soft); }
    .pricing-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      margin-top: 3.5rem;
      align-items: center;
    }
    @media (max-width: 992px) {
      .pricing-grid { grid-template-columns: 1fr; max-width: 440px; margin-left: auto; margin-right: auto; }
    }
    .pricing-card {
      background: #FFFFFF;
      border-radius: 24px;
      border: 1.5px solid var(--border-color);
      padding: 2.5rem 2rem;
      position: relative;
      display: flex;
      flex-direction: column;
      box-shadow: 0 8px 24px rgba(10, 25, 47, 0.04);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .pricing-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(10, 25, 47, 0.1);
    }
    .pricing-card.popular {
      background: var(--primary);
      color: #FFFFFF;
      border-color: transparent;
      box-shadow: 0 16px 40px rgba(10, 25, 47, 0.25);
    }
    .popular-badge {
      position: absolute;
      top: -14px; left: 2rem;
      padding: 4px 14px;
      border-radius: 8px;
      background: var(--accent);
      color: #FFFFFF;
      font-size: 0.78rem;
      font-weight: 700;
    }
    .plan-name {
      font-size: 1.35rem;
      font-weight: 800;
      margin-bottom: 0.4rem;
    }
    .pricing-card.popular .plan-name { color: #FFFFFF; }
    .plan-desc {
      font-size: 0.85rem;
      color: var(--text-secondary);
      margin-bottom: 1.75rem;
    }
    .pricing-card.popular .plan-desc { color: rgba(255, 255, 255, 0.7); }

    .price-row {
      display: flex;
      align-items: baseline;
      gap: 4px;
      margin-bottom: 2rem;
    }
    .price-val {
      font-size: 2.5rem;
      font-weight: 900;
      line-height: 1;
      color: #0088FF;
    }
    .price-period {
      font-size: 0.9rem;
      color: var(--text-tertiary);
    }
    .pricing-card.popular .price-period { color: rgba(255, 255, 255, 0.6); }

    .features-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.9rem;
      margin-bottom: 2rem;
    }
    .features-list li {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.88rem;
      color: var(--text-secondary);
    }
    .pricing-card.popular .features-list li { color: rgba(255, 255, 255, 0.9); }

    .check-icon {
      width: 22px; height: 22px;
      border-radius: 7px;
      background: rgba(0, 136, 255, 0.1);
      color: var(--secondary);
      display: flex; align-items: center; justify-content: center;
      font-size: 14px;
    }
    .pricing-card.popular .check-icon {
      background: rgba(255, 255, 255, 0.15);
    }

    .btn-plan {
      width: 100%;
      padding: 14px;
      border-radius: 14px;
      background: var(--primary);
      color: #FFFFFF;
      font-weight: 700;
      font-size: 0.9rem;
      margin-top: auto;
      transition: all 0.25s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      text-decoration: none;
      box-shadow: 0 4px 14px rgba(10, 25, 47, 0.15);
      cursor: pointer;
    }
    .btn-plan:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(10, 25, 47, 0.25);
    }
    .btn-plan.btn-popular {
      background: var(--accent);
      box-shadow: 0 4px 14px rgba(255, 87, 34, 0.3);
    }
    .btn-plan.btn-popular:hover {
      background: #E64A19;
      box-shadow: 0 8px 20px rgba(255, 87, 34, 0.45);
    }
    .btn-ic { font-size: 20px; }
  `]
})
export class PricingComponent {
  lang = inject(LanguageService);
  prices = ['$49', '$99', '$149'];
}
