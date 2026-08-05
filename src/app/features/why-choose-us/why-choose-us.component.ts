import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { SectionTitleComponent } from '../../shared/section-title/section-title.component';

@Component({
  selector: 'app-why-choose-us',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent],
  template: `
    <section id="programs" class="section-padding">
      <div class="container">
        <app-section-title
          [title]="lang.t().why.title"
          [subtitle]="lang.t().why.subtitle"
          accentColor="#0088FF">
        </app-section-title>

        <div class="cards-grid">
          <!-- Card 1: Coding -->
          <div class="specialty-card">
            <div class="icon-box primary">
              <span class="material-icons-round">code</span>
            </div>
            <h3>{{ lang.t().why.codingTitle }}</h3>
            <p>{{ lang.t().why.codingDesc }}</p>
          </div>

          <!-- Card 2: AI -->
          <div class="specialty-card">
            <div class="icon-box secondary">
              <span class="material-icons-round">psychology</span>
            </div>
            <h3>{{ lang.t().why.aiTitle }}</h3>
            <p>{{ lang.t().why.aiDesc }}</p>
          </div>

          <!-- Card 3: Game Dev -->
          <div class="specialty-card">
            <div class="icon-box accent">
              <span class="material-icons-round">sports_esports</span>
            </div>
            <h3>{{ lang.t().why.gameTitle }}</h3>
            <p>{{ lang.t().why.gameDesc }}</p>
          </div>

          <!-- Card 4: Robotics -->
          <div class="specialty-card">
            <div class="icon-box purple">
              <span class="material-icons-round">precision_manufacturing</span>
            </div>
            <h3>{{ lang.t().why.roboticsTitle }}</h3>
            <p>{{ lang.t().why.roboticsDesc }}</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
      margin-top: 3.5rem;
    }
    @media (max-width: 1024px) {
      .cards-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 640px) {
      .cards-grid { grid-template-columns: 1fr; }
    }
    .specialty-card {
      background: #FFFFFF;
      border-radius: 22px;
      padding: 2rem;
      border: 1.5px solid var(--border-color);
      box-shadow: 0 6px 16px rgba(10, 25, 47, 0.04);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .specialty-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 16px 32px rgba(0, 136, 255, 0.12);
      border-color: rgba(0, 136, 255, 0.3);
    }
    .icon-box {
      width: 56px; height: 56px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.25rem;
      transition: background 0.3s ease, color 0.3s ease;
    }
    .icon-box.primary { background: rgba(10, 25, 47, 0.08); color: var(--primary); }
    .icon-box.secondary { background: rgba(0, 136, 255, 0.1); color: var(--secondary); }
    .icon-box.accent { background: rgba(255, 87, 34, 0.1); color: var(--accent); }
    .icon-box.purple { background: rgba(139, 92, 246, 0.1); color: #8B5CF6; }

    .specialty-card:hover .icon-box.primary { background: var(--primary); color: #FFFFFF; }
    .specialty-card:hover .icon-box.secondary { background: var(--secondary); color: #FFFFFF; }
    .specialty-card:hover .icon-box.accent { background: var(--accent); color: #FFFFFF; }
    .specialty-card:hover .icon-box.purple { background: #8B5CF6; color: #FFFFFF; }

    .specialty-card h3 {
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 0.75rem;
    }
    .specialty-card p {
      font-size: 0.9rem;
      color: var(--text-secondary);
      line-height: 1.6;
    }
  `]
})
export class WhyChooseUsComponent {
  lang = inject(LanguageService);
}
