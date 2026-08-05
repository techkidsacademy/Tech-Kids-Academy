import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section id="home" class="hero-section">
      <!-- Background Shapes -->
      <div class="bg-shape shape-1"></div>
      <div class="bg-shape shape-2"></div>

      <div class="container hero-container">
        <!-- Hero Text -->
        <div class="hero-text-col">
          <div class="hero-badge">
            <span class="badge-dot"></span>
            <span>{{ lang.t().hero.badge }}</span>
          </div>

          <h1 class="hero-title">{{ lang.t().hero.headline }}</h1>

          <p class="hero-subtitle">{{ lang.t().hero.subtitle }}</p>

          <div class="hero-cta-group">
            <a routerLink="/roadmap" class="btn-primary">
              <span class="material-icons-round">rocket_launch</span>
              <span>{{ lang.t().hero.ctaTrial }}</span>
            </a>
            <a href="https://wa.me/201108464037" target="_blank" class="btn-outlined">
              <span>{{ lang.t().hero.ctaExplore }}</span>
            </a>
          </div>
        </div>

        <!-- Hero Illustration -->
        <div class="hero-img-col">
          <div class="img-wrapper">
            <div class="glow-bg"></div>
            <div class="card-container">
              <img
                src="assets/images/hero_illustration.jpg"
                alt="Tech Kids Academy Hero"
                class="hero-img"
                (error)="onImgError($event)"
              />
            </div>

            <!-- Floating Badge Top Right -->
            <div class="floating-badge badge-top animate-float">
              <span class="material-icons-round icon-ai">auto_awesome</span>
              <span>{{ lang.t().hero.floatingAi }}</span>
            </div>

            <!-- Floating Badge Bottom Left -->
            <div class="floating-badge badge-bottom animate-float-delayed">
              <span class="material-icons-round icon-rocket">rocket_launch</span>
              <span>{{ lang.t().hero.floatingInteractive }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      position: relative;
      background: var(--grad-hero);
      padding-top: 8rem;
      padding-bottom: 5rem;
      overflow: hidden;
    }
    .bg-shape {
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
    }
    .shape-1 {
      width: 400px; height: 400px;
      top: -100px; right: -100px;
      background: rgba(0, 136, 255, 0.04);
    }
    .shape-2 {
      width: 250px; height: 250px;
      bottom: -60px; left: -60px;
      background: rgba(255, 87, 34, 0.05);
    }
    .hero-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3.5rem;
      align-items: center;
    }
    @media (max-width: 992px) {
      .hero-container {
        grid-template-columns: 1fr;
        text-align: center;
      }
    }
    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 18px;
      border-radius: 30px;
      background: rgba(0, 136, 255, 0.1);
      border: 1px solid rgba(0, 136, 255, 0.2);
      color: var(--secondary);
      font-size: 0.85rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
    }
    .badge-dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      background: var(--secondary);
    }
    .hero-title {
      font-size: 3.25rem;
      font-weight: 900;
      color: var(--primary);
      line-height: 1.15;
      margin-bottom: 1.25rem;
      white-space: pre-line;
    }
    @media (max-width: 768px) {
      .hero-title { font-size: 2.25rem; }
    }
    .hero-subtitle {
      font-size: 1.1rem;
      color: var(--text-secondary);
      line-height: 1.7;
      margin-bottom: 2.25rem;
      max-width: 540px;
    }
    @media (max-width: 992px) {
      .hero-subtitle { margin-left: auto; margin-right: auto; }
    }
    .hero-cta-group {
      display: flex;
      gap: 1rem;
      margin-bottom: 2.5rem;
    }
    @media (max-width: 992px) {
      .hero-cta-group { justify-content: center; }
    }
    .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 14px 30px;
      border-radius: 16px;
      background: linear-gradient(135deg, #0066FF 0%, #0052CC 100%);
      color: #FFFFFF;
      font-size: 0.98rem;
      font-weight: 700;
      border: none;
      box-shadow: none;
      transition: all 0.25s ease;
      text-decoration: none;
    }
    .btn-primary span.material-icons-round {
      color: #FFFFFF;
      font-size: 20px;
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      background: linear-gradient(135deg, #0052CC 0%, #003D99 100%);
      box-shadow: none;
    }
    .btn-outlined {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 14px 28px;
      border-radius: 14px;
      background: #25D366;
      border: 1.5px solid #25D366;
      color: #FFFFFF;
      font-size: 0.95rem;
      font-weight: 700;
      text-decoration: none;
      transition: all 0.25s ease;
    }
    .btn-outlined span.material-icons-round {
      color: #FFFFFF;
      font-size: 20px;
    }
    .btn-outlined:hover {
      background: #128C7E;
      border-color: #128C7E;
      color: #FFFFFF;
      transform: translateY(-2px);
    }
    .trust-row {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }
    @media (max-width: 992px) {
      .trust-row { justify-content: center; }
    }
    .trust-item {
      display: flex;
      flex-direction: column;
    }
    .trust-val {
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--primary);
    }
    .trust-lbl {
      font-size: 0.8rem;
      color: var(--text-tertiary);
    }
    .trust-divider {
      width: 1px; height: 36px;
      background: var(--border-color);
    }

    /* Illustration Col */
    .hero-img-col {
      display: flex;
      justify-content: center;
    }
    .img-wrapper {
      position: relative;
      width: 100%;
      max-width: 440px;
    }
    .glow-bg {
      position: absolute;
      inset: -20px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(0,136,255,0.18) 0%, rgba(10,25,47,0.05) 50%, transparent 70%);
      pointer-events: none;
    }
    .card-container {
      background: #FFFFFF;
      border-radius: 28px;
      padding: 8px;
      box-shadow: 0 20px 50px rgba(10, 25, 47, 0.12), 0 4px 20px rgba(0, 136, 255, 0.08);
      border: 3px solid rgba(255, 255, 255, 0.9);
      overflow: hidden;
    }
    .hero-img {
      width: 100%;
      height: auto;
      border-radius: 24px;
      display: block;
    }
    .floating-badge {
      position: absolute;
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      background: #FFFFFF;
      border-radius: 20px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--primary);
    }
    .badge-top {
      top: 15px; right: -10px;
      border: 1px solid rgba(255, 87, 34, 0.3);
    }
    .badge-bottom {
      bottom: 20px; left: -10px;
      border: 1px solid rgba(0, 136, 255, 0.3);
    }
    .icon-ai { color: var(--accent); font-size: 18px; }
    .icon-rocket { color: var(--secondary); font-size: 18px; }
  `]
})
export class HeroComponent {
  lang = inject(LanguageService);

  onImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/hero_illustration.png';
  }
}
