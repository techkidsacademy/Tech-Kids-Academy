import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { SectionTitleComponent } from '../../shared/section-title/section-title.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent],
  template: `
    <section id="projects" class="section-padding projects-section">
      <div class="container">
        <app-section-title
          [title]="lang.t().projectsSection.title"
          [subtitle]="lang.t().projectsSection.subtitle"
          accentColor="#0088FF">
        </app-section-title>

        <div class="projects-grid">
          @for (proj of lang.t().projectsSection.items; track $index) {
            <div class="project-card" [style.background]="meta[$index].grad" [style.height.px]="$index % 2 === 0 ? 230 : 270">
              <!-- Background Icon Overlay -->
              <span class="material-icons-round bg-icon">{{ meta[$index].icon }}</span>

              <!-- Content Overlay -->
              <div class="card-content">
                <span class="category-badge">{{ proj.category }}</span>
                <h3 class="proj-title">{{ proj.title }}</h3>
              </div>

              <!-- Hover Action Overlay -->
              <div class="hover-overlay">
                <span class="material-icons-round icon-open">open_in_new</span>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .projects-section {
      background-color: rgba(10, 25, 47, 0.02);
    }
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
      margin-top: 3.5rem;
      align-items: end;
    }
    @media (max-width: 1024px) {
      .projects-grid { grid-template-columns: repeat(3, 1fr); }
    }
    @media (max-width: 640px) {
      .projects-grid { grid-template-columns: repeat(2, 1fr); }
    }
    .project-card {
      position: relative;
      border-radius: 20px;
      padding: 1.5rem;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
      cursor: pointer;
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
    }
    .project-card:hover {
      transform: scale(1.03);
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.18);
    }
    .bg-icon {
      position: absolute;
      right: -20px; bottom: -20px;
      font-size: 110px;
      color: rgba(255, 255, 255, 0.12);
      pointer-events: none;
    }
    .card-content {
      position: relative;
      z-index: 2;
    }
    .category-badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.2);
      color: #FFFFFF;
      font-size: 0.72rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    .proj-title {
      font-size: 1.05rem;
      font-weight: 700;
      color: #FFFFFF;
      line-height: 1.3;
    }
    .hover-overlay {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.25);
      backdrop-filter: blur(2px);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.2s ease;
      z-index: 3;
    }
    .project-card:hover .hover-overlay {
      opacity: 1;
    }
    .icon-open {
      color: #FFFFFF;
      font-size: 32px;
    }
  `]
})
export class ProjectsComponent {
  lang = inject(LanguageService);

  meta = [
    { icon: 'rocket_launch', grad: 'linear-gradient(135deg, #6366F1, #818CF8)' },
    { icon: 'cloud', grad: 'linear-gradient(135deg, #0EA5E9, #38BDF8)' },
    { icon: 'smart_toy', grad: 'linear-gradient(135deg, #F97316, #FB923C)' },
    { icon: 'language', grad: 'linear-gradient(135deg, #8B5CF6, #A78BFA)' },
    { icon: 'chat', grad: 'linear-gradient(135deg, #14B8A6, #2DD4BF)' },
    { icon: 'videogame_asset', grad: 'linear-gradient(135deg, #22C55E, #4ADE80)' },
    { icon: 'image_search', grad: 'linear-gradient(135deg, #EC4899, #F472B6)' },
    { icon: 'precision_manufacturing', grad: 'linear-gradient(135deg, #EF4444, #F87171)' },
  ];
}
