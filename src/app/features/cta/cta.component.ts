import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="cta-section">
      <div class="container">
        <div class="cta-banner">
          <!-- Background Shapes -->
          <div class="cta-shape shape-1"></div>
          <div class="cta-shape shape-2"></div>

          <div class="cta-content">
            <div class="cta-icon-box">
              <span class="material-icons-round">rocket_launch</span>
            </div>

            <h2 class="cta-title">{{ lang.t().ctaSection.headline }}</h2>
            <p class="cta-desc">{{ lang.t().ctaSection.subtitle }}</p>

            <button class="btn-cta">
              <span class="material-icons-round">rocket_launch</span>
              <span>{{ lang.t().ctaSection.button }}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .cta-section {
      background: #FFFFFF;
    }
    .cta-card {
      background: linear-gradient(135deg, #0A192F 0%, #112240 100%);
      border-radius: 32px;
      padding: 4.5rem 2.5rem;
      text-align: center;
      position: relative;
      overflow: hidden;
      box-shadow: 0 20px 50px rgba(10, 25, 47, 0.15);
    }
    .cta-bg-glow {
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 50% 0%, rgba(0, 102, 255, 0.25) 0%, transparent 70%);
      pointer-events: none;
    }
    .cta-content {
      position: relative;
      z-index: 2;
      max-width: 680px;
      margin: 0 auto;
    }
    .cta-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 16px;
      border-radius: 20px;
      background: rgba(0, 102, 255, 0.2);
      border: 1px solid rgba(0, 102, 255, 0.3);
      color: #60A5FA;
      font-size: 0.82rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
    }
    .badge-icon { font-size: 16px; }
    .cta-title {
      font-size: 2.25rem;
      font-weight: 900;
      color: #FFFFFF;
      line-height: 1.25;
      margin-bottom: 1.25rem;
    }
    @media (max-width: 768px) {
      .cta-title { font-size: 1.75rem; }
    }
    .cta-desc {
      font-size: 1.05rem;
      color: #94A3B8;
      line-height: 1.6;
      margin-bottom: 2.25rem;
    }
    .btn-cta {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 16px 36px;
      border-radius: 16px;
      background: linear-gradient(135deg, #0066FF 0%, #0052CC 100%);
      color: #FFFFFF;
      border: none;
      font-size: 1.05rem;
      font-weight: 800;
      box-shadow: none;
      transition: all 0.25s ease;
      cursor: pointer;
    }
    .btn-cta span.material-icons-round {
      color: #FFFFFF;
      font-size: 22px;
    }
    .btn-cta:hover {
      transform: translateY(-3px);
      background: linear-gradient(135deg, #0052CC 0%, #003D99 100%);
      box-shadow: none;
    }
  `]
})
export class CtaComponent {
  lang = inject(LanguageService);
}
