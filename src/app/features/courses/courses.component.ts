import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { SectionTitleComponent } from '../../shared/section-title/section-title.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterLink, SectionTitleComponent],
  template: `
    <section id="courses" class="section-padding">
      <div class="container">
        <app-section-title
          [title]="lang.t().coursesSection.title"
          [subtitle]="lang.t().coursesSection.subtitle"
          accentColor="#0A192F">
        </app-section-title>

        <div class="courses-grid">
          @for (course of lang.t().coursesSection.items; track $index) {
            <div class="course-card">
              <!-- Header with light background & colored icon -->
              <div class="card-header" [style.background-color]="meta[$index].lightColor">
                <div class="icon-box" [style.background-color]="meta[$index].color">
                  <span class="material-icons-round">{{ meta[$index].icon }}</span>
                </div>
              </div>

              <!-- Body Content -->
              <div class="card-body">
                <h3 class="course-title">{{ course.title }}</h3>
                <p class="course-desc">{{ course.desc }}</p>

                <div class="tags-row">
                  <span class="tag" [style.color]="meta[$index].color" [style.background-color]="meta[$index].color + '14'">
                    <span class="material-icons-round">schedule</span>
                    <span>{{ course.duration }}</span>
                  </span>
                  <span class="tag" [style.color]="meta[$index].color" [style.background-color]="meta[$index].color + '14'">
                    <span class="material-icons-round">child_care</span>
                    <span>{{ course.age }}</span>
                  </span>
                </div>

                <a 
                  [routerLink]="['/program-details', ($index % 3) + 1]" 
                  class="btn-enroll"
                >
                  <span class="material-icons-round btn-icon">alt_route</span>
                  <span>{{ lang.t().coursesSection.learnMore }}</span>
                </a>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .courses-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
      margin-top: 3.5rem;
    }
    @media (max-width: 1100px) {
      .courses-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 640px) {
      .courses-grid { grid-template-columns: 1fr; }
    }
    .course-card {
      background: #FFFFFF;
      border-radius: 22px;
      border: 2px solid var(--primary);
      box-shadow: 0 4px 16px rgba(10, 25, 47, 0.08);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .course-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 16px 32px rgba(10, 25, 47, 0.18);
      border-color: #112240;
    }
    .card-header {
      padding: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .icon-box {
      width: 56px; height: 56px;
      border-radius: 18px;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 26px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      transition: transform 0.3s ease;
    }
    .course-card:hover .icon-box {
      transform: scale(1.1);
    }
    .card-body {
      padding: 1.25rem 1.5rem 1.5rem;
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    .course-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--primary);
      margin-bottom: 0.5rem;
    }
    .course-desc {
      font-size: 0.85rem;
      color: var(--text-secondary);
      line-height: 1.5;
      margin-bottom: 1.25rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .tags-row {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1.25rem;
      margin-top: auto;
    }
    .tag {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      border-radius: 8px;
      font-size: 0.72rem;
      font-weight: 600;
    }
    .tag span.material-icons-round { font-size: 13px; }
    .btn-enroll {
      width: 100%;
      padding: 11px;
      border-radius: 12px;
      border: 1.5px solid var(--primary);
      font-weight: 700;
      font-size: 0.88rem;
      background: var(--primary);
      color: #FFFFFF;
      box-shadow: 0 4px 12px rgba(10, 25, 47, 0.2);
      transition: all 0.25s ease;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      text-decoration: none;
    }
    .btn-enroll:hover {
      background: #112240;
      border-color: #112240;
      box-shadow: 0 6px 16px rgba(10, 25, 47, 0.35);
      transform: translateY(-1px);
    }
    .btn-icon { font-size: 18px; }
  `]
})
export class CoursesComponent {
  lang = inject(LanguageService);

  meta = [
    { icon: 'extension', color: '#F59E0B', lightColor: '#FEF3C7' },
    { icon: 'code', color: '#3B82F6', lightColor: '#DBEAFE' },
    { icon: 'phone_iphone', color: '#06B6D4', lightColor: '#CFFAFE' },
    { icon: 'language', color: '#8B5CF6', lightColor: '#EDE9FE' },
    { icon: 'psychology', color: '#EC4899', lightColor: '#FCE7F3' },
    { icon: 'security', color: '#10B981', lightColor: '#D1FAE5' },
    { icon: 'smart_toy', color: '#EF4444', lightColor: '#FEE2E2' },
    { icon: 'videogame_asset', color: '#22C55E', lightColor: '#DCFCE7' },
  ];
}
