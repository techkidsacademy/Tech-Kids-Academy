import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="stats-section">
      <div class="container">
        <div class="stats-card">
          <div class="stat-item">
            <div class="stat-icon-box primary">
              <span class="material-icons-round">school</span>
            </div>
            <div class="stat-content">
              <span class="stat-number">150+</span>
              <span class="stat-label">{{ lang.t().stats.students }}</span>
            </div>
          </div>

          <div class="stat-divider"></div>

          <div class="stat-item">
            <div class="stat-icon-box secondary">
              <span class="material-icons-round">menu_book</span>
            </div>
            <div class="stat-content">
              <span class="stat-number">3+</span>
              <span class="stat-label">{{ lang.t().stats.courses }}</span>
            </div>
          </div>

          <div class="stat-divider"></div>

          <div class="stat-item">
            <div class="stat-icon-box accent">
              <span class="material-icons-round">person</span>
            </div>
            <div class="stat-content">
              <span class="stat-number">6+</span>
              <span class="stat-label">{{ lang.t().stats.teachers }}</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  `,
  styles: [`
    .stats-section {
      margin-top: -40px;
      position: relative;
      z-index: 10;
    }
    .stats-card {
      background: #FFFFFF;
      border-radius: 24px;
      padding: 2rem 2.5rem;
      box-shadow: 0 16px 40px rgba(10, 25, 47, 0.06);
      border: 1px solid rgba(226, 232, 240, 0.8);
      display: flex;
      align-items: center;
      justify-content: space-around;
      gap: 1.5rem;
    }
    @media (max-width: 768px) {
      .stats-card {
        display: grid;
        grid-template-columns: 1fr 1fr;
        padding: 1.5rem;
        gap: 1.5rem;
      }
    }
    .stat-item {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .stat-icon-box {
      width: 52px; height: 52px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .stat-icon-box.primary { background: rgba(10, 25, 47, 0.08); color: var(--primary); }
    .stat-icon-box.secondary { background: rgba(0, 136, 255, 0.1); color: var(--secondary); }
    .stat-icon-box.accent { background: rgba(255, 87, 34, 0.1); color: var(--accent); }
    .stat-icon-box.red { background: rgba(239, 68, 68, 0.1); color: #EF4444; }

    .stat-content {
      display: flex;
      flex-direction: column;
    }
    .stat-number {
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--primary);
      line-height: 1.1;
    }
    .stat-label {
      font-size: 0.85rem;
      color: var(--text-secondary);
      font-weight: 600;
    }
    .stat-divider {
      width: 1px; height: 40px;
      background: var(--border-color);
    }
    @media (max-width: 768px) {
      .stat-divider { display: none; }
    }
  `]
})
export class StatsComponent {
  lang = inject(LanguageService);
}
