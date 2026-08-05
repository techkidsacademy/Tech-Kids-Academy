import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { Instructor } from '../../core/models/models';

@Component({
  selector: 'app-instructors',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="instructors" class="instructors-section section-padding">
      <div class="container">
        <!-- Header -->
        <div class="section-header">
          <div class="badge">
            <span class="material-icons-round icon">stars</span>
            <span>{{ lang.t().instructorsSection.badge }}</span>
          </div>
          <h2 class="headline">{{ lang.t().instructorsSection.headline }}</h2>
          <p class="subtitle">{{ lang.t().instructorsSection.subtitle }}</p>
        </div>

        <!-- Grid -->
        <div class="instructors-grid">
          @for (inst of instructors(); track inst.id) {
            <div class="instructor-card">
              <!-- Avatar Stack -->
              <div class="avatar-stack">
                <div class="avatar-frame">
                  <img [src]="inst.imagePath" [alt]="inst.name" class="avatar-img" (error)="onAvatarError($event)" />
                </div>
                <div class="verified-badge">
                  <span class="material-icons-round">verified</span>
                </div>
              </div>

              <!-- Content -->
              <h3 class="inst-name">{{ inst.name }}</h3>
              <p class="inst-title">{{ inst.title }}</p>
              <p class="inst-headline">{{ inst.headline }}</p>

              <!-- Action & Social Buttons -->
              <div class="card-actions">
                <button class="btn-portfolio" (click)="activeInstructor.set(inst)">
                  <span class="material-icons-round">badge</span>
                  <span>{{ lang.t().instructorsSection.viewPortfolio }}</span>
                </button>

                <div class="social-links">
                  @if (inst.linkedInUrl) {
                    <a [href]="inst.linkedInUrl" target="_blank" class="social-icon-btn linkedin" title="LinkedIn">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.78a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z"/></svg>
                    </a>
                  }
                  @if (inst.githubUrl) {
                    <a [href]="inst.githubUrl" target="_blank" class="social-icon-btn github" title="GitHub">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
                    </a>
                  }
                </div>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- Instructor Portfolio Modal Dialog -->
      @if (activeInstructor()) {
        <div class="modal-backdrop" (click)="activeInstructor.set(null)">
          <div class="modal-card" (click)="$event.stopPropagation()">
            <!-- Modal Header -->
            <div class="modal-top">
              <h3>{{ lang.t().instructorsSection.dialogTitle }}</h3>
              <button class="btn-close" (click)="activeInstructor.set(null)">
                <span class="material-icons-round">close</span>
              </button>
            </div>

            <!-- Modal Content -->
            <div class="modal-body">
              <!-- Profile Header Card -->
              <div class="profile-header-card">
                <img [src]="activeInstructor()!.imagePath" [alt]="activeInstructor()!.name" class="header-avatar" (error)="onAvatarError($event)" />
                <div class="header-details">
                  <h2>{{ activeInstructor()!.name }}</h2>
                  <span class="title-pill">{{ activeInstructor()!.title }}</span>
                  <p class="headline-text">{{ activeInstructor()!.headline }}</p>

                  <div class="stats-row">
                    <span class="stat-badge star">
                      <span class="material-icons-round">star</span>
                      <span>{{ activeInstructor()!.rating }} {{ lang.t().instructorsSection.ratingLabel }}</span>
                    </span>
                    <span class="stat-badge">
                      <span class="material-icons-round">people_alt</span>
                      <span>{{ activeInstructor()!.studentsCount }}+ {{ lang.t().instructorsSection.studentsLabel }}</span>
                    </span>
                    <span class="stat-badge">
                      <span class="material-icons-round">school</span>
                      <span>{{ activeInstructor()!.coursesCount }} {{ lang.t().instructorsSection.coursesLabel }}</span>
                    </span>
                  </div>

                  <!-- Modal Social Badges -->
                  <div class="modal-social-row">
                    @if (activeInstructor()!.linkedInUrl) {
                      <a [href]="activeInstructor()!.linkedInUrl" target="_blank" class="social-link-badge linkedin">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.78a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z"/></svg>
                        <span>LinkedIn</span>
                      </a>
                    }
                    @if (activeInstructor()!.githubUrl) {
                      <a [href]="activeInstructor()!.githubUrl" target="_blank" class="social-link-badge github">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
                        <span>GitHub</span>
                      </a>
                    }
                  </div>
                </div>
              </div>

              <!-- About -->
              <div class="info-block">
                <div class="block-title">
                  <span class="material-icons-round icon">person_pin</span>
                  <span>{{ lang.t().instructorsSection.about }}</span>
                </div>
                <div class="block-box">
                  <p>{{ activeInstructor()!.bio }}</p>
                </div>
              </div>

              <!-- Core Technical Skills -->
              @if (activeInstructor()!.skillCategories && activeInstructor()!.skillCategories.length > 0) {
                <div class="info-block">
                  <div class="block-title">
                    <span class="material-icons-round icon">psychology</span>
                    <span>{{ lang.t().instructorsSection.skills }}</span>
                  </div>
                  <div class="skills-grid">
                    @for (cat of activeInstructor()!.skillCategories; track cat.categoryName) {
                      <div class="skill-category-card">
                        <h4 class="category-name">{{ cat.categoryName }}</h4>
                        <div class="skill-tags">
                          @for (skill of cat.skills; track skill) {
                            <span class="skill-tag">{{ skill }}</span>
                          }
                        </div>
                      </div>
                    }
                  </div>
                </div>
              }

              <!-- Featured Projects -->
              @if (activeInstructor()!.projects && activeInstructor()!.projects.length > 0) {
                <div class="info-block">
                  <div class="block-title">
                    <span class="material-icons-round icon">folder_special</span>
                    <span>{{ lang.t().instructorsSection.projects }}</span>
                  </div>
                  <div class="projects-list">
                    @for (proj of activeInstructor()!.projects; track proj.title) {
                      <div class="project-card-modal">
                        <div class="project-header">
                          <h4>{{ proj.title }}</h4>
                          @if (proj.appType) {
                            <span class="app-type-badge">{{ proj.appType }}</span>
                          }
                        </div>
                        <p class="project-desc">{{ proj.description }}</p>
                        <div class="tech-stack-row">
                          @for (tech of proj.techStack; track tech) {
                            <span class="tech-chip">{{ tech }}</span>
                          }
                        </div>
                      </div>
                    }
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      }
    </section>
  `,
  styles: [`
    .instructors-section {
      background: #FFFFFF;
    }
    .section-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      margin-bottom: 3.5rem;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 16px;
      border-radius: 30px;
      background: rgba(0, 136, 255, 0.1);
      color: var(--secondary);
      font-size: 0.85rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }
    .badge .icon { font-size: 16px; }
    .headline {
      font-size: 2.25rem;
      font-weight: 800;
      color: var(--primary);
      margin-bottom: 1rem;
      white-space: pre-line;
    }
    .subtitle {
      font-size: 1rem;
      color: var(--text-secondary);
      max-width: 680px;
      line-height: 1.6;
    }

    .instructors-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }
    @media (max-width: 992px) {
      .instructors-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 640px) {
      .instructors-grid { grid-template-columns: 1fr; }
    }

    .instructor-card {
      background: #FFFFFF;
      border-radius: 24px;
      border: 1px solid var(--border-color);
      padding: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      transition: all 0.3s ease;
    }
    .instructor-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 16px 36px rgba(10, 25, 47, 0.12);
      border-color: rgba(0, 136, 255, 0.4);
    }
    .avatar-stack {
      position: relative;
      margin-bottom: 1.25rem;
    }
    .avatar-frame {
      width: 96px; height: 96px;
      border-radius: 50%;
      border: 2.5px solid var(--secondary);
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(10, 25, 47, 0.1);
    }
    .avatar-img {
      width: 100%; height: 100%;
      object-fit: cover;
    }
    .verified-badge {
      position: absolute;
      bottom: 0; right: 0;
      background: var(--secondary);
      color: #FFFFFF;
      border-radius: 50%;
      width: 22px; height: 22px;
      display: flex; align-items: center; justify-content: center;
    }
    .verified-badge span { font-size: 14px; }

    .inst-name {
      font-size: 1.2rem;
      font-weight: 800;
      color: var(--primary);
      margin-bottom: 0.25rem;
    }
    .inst-title {
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--secondary);
      margin-bottom: 0.75rem;
    }
    .inst-headline {
      font-size: 0.85rem;
      color: var(--text-secondary);
      line-height: 1.4;
      margin-bottom: 1.25rem;
    }

    /* Card Actions & Socials */
    .card-actions {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      margin-top: auto;
    }
    .btn-portfolio {
      flex: 1;
      padding: 12px;
      border-radius: 12px;
      background: var(--primary);
      color: #FFFFFF;
      font-weight: 700;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: background 0.2s ease;
      border: none;
      cursor: pointer;
    }
    .instructor-card:hover .btn-portfolio {
      background: var(--secondary);
    }
    .social-links {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .social-icon-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 42px;
      height: 42px;
      border-radius: 12px;
      transition: all 0.2s ease;
      text-decoration: none;
    }
    .social-icon-btn.linkedin {
      background: rgba(10, 102, 194, 0.1);
      color: #0A66C2;
      border: 1px solid rgba(10, 102, 194, 0.25);
    }
    .social-icon-btn.linkedin:hover {
      background: #0A66C2;
      color: #FFFFFF;
      transform: translateY(-2px);
    }
    .social-icon-btn.github {
      background: rgba(36, 41, 47, 0.08);
      color: #24292F;
      border: 1px solid rgba(36, 41, 47, 0.25);
    }
    .social-icon-btn.github:hover {
      background: #24292F;
      color: #FFFFFF;
      transform: translateY(-2px);
    }

    /* Modal Styling */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(10, 25, 47, 0.6);
      backdrop-filter: blur(4px);
      z-index: 3000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
    }
    .modal-card {
      width: 100%;
      max-width: 800px;
      max-height: 90vh;
      background: #FFFFFF;
      border-radius: 28px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 20px 60px rgba(10, 25, 47, 0.2);
      overflow: hidden;
      animation: popModal 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes popModal {
      from { opacity: 0; transform: scale(0.92); }
      to { opacity: 1; transform: scale(1); }
    }
    .modal-top {
      padding: 1.25rem 1.75rem;
      background: var(--primary);
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .modal-top h3 { font-size: 1.1rem; color: #FFFFFF; }
    .btn-close { color: #FFFFFF; display: flex; background: none; border: none; cursor: pointer; }

    .modal-body {
      padding: 1.75rem;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .profile-header-card {
      background: var(--grad-primary);
      border-radius: 20px;
      padding: 1.75rem;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }
    @media (max-width: 640px) {
      .profile-header-card {
        flex-direction: column;
        text-align: center;
      }
    }
    .header-avatar {
      width: 110px; height: 110px;
      border-radius: 50%;
      border: 3px solid #FFFFFF;
      object-fit: cover;
      flex-shrink: 0;
    }
    .header-details h2 { font-size: 1.5rem; color: #FFFFFF; margin-bottom: 4px; }
    .title-pill {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 20px;
      background: rgba(255, 255, 255, 0.15);
      color: #64B5F6;
      font-size: 0.8rem;
      font-weight: 600;
      margin-bottom: 8px;
    }
    .headline-text { font-size: 0.88rem; color: rgba(255, 255, 255, 0.85); margin-bottom: 12px; }
    .stats-row {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    .stat-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 0.8rem;
      font-weight: 600;
    }
    .stat-badge.star { color: #FFD700; }
    .stat-badge span.material-icons-round { font-size: 16px; }

    /* Modal Social Badges */
    .modal-social-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 14px;
    }
    @media (max-width: 640px) {
      .modal-social-row { justify-content: center; }
    }
    .social-link-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 0.82rem;
      font-weight: 700;
      text-decoration: none;
      transition: all 0.2s ease;
    }
    .social-link-badge.linkedin {
      background: rgba(255, 255, 255, 0.9);
      color: #0A66C2;
    }
    .social-link-badge.linkedin:hover {
      background: #FFFFFF;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    .social-link-badge.github {
      background: rgba(255, 255, 255, 0.9);
      color: #24292F;
    }
    .social-link-badge.github:hover {
      background: #FFFFFF;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .info-block { display: flex; flex-direction: column; gap: 0.75rem; }
    .block-title {
      display: flex; align-items: center; gap: 8px;
      font-size: 1.05rem; font-weight: 800; color: var(--primary);
    }
    .block-title .icon {
      background: rgba(0, 136, 255, 0.1);
      color: var(--secondary);
      padding: 6px; border-radius: 10px; font-size: 18px;
    }
    .block-box {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 14px;
      padding: 1.25rem;
      font-size: 0.92rem;
      color: var(--text-secondary);
      line-height: 1.6;
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
    @media (max-width: 640px) {
      .skills-grid { grid-template-columns: 1fr; }
    }
    .skill-category-card {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 14px;
      padding: 1rem;
    }
    .category-name {
      font-size: 0.9rem;
      font-weight: 700;
      color: var(--primary);
      margin-bottom: 0.75rem;
    }
    .skill-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .skill-tag {
      background: #FFFFFF;
      border: 1px solid #CBD5E1;
      color: var(--primary);
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 0.78rem;
      font-weight: 600;
    }

    .projects-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .project-card-modal {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 14px;
      padding: 1.25rem;
    }
    .project-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      margin-bottom: 0.5rem;
    }
    .project-header h4 {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--primary);
    }
    .app-type-badge {
      background: rgba(0, 136, 255, 0.1);
      color: var(--secondary);
      padding: 3px 10px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 700;
    }
    .project-desc {
      font-size: 0.85rem;
      color: var(--text-secondary);
      line-height: 1.5;
      margin-bottom: 0.75rem;
    }
    .tech-stack-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .tech-chip {
      background: rgba(10, 25, 47, 0.06);
      color: var(--primary);
      padding: 2px 8px;
      border-radius: 6px;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .modal-footer {
      padding: 1.25rem;
      border-top: 1px solid var(--border-color);
      display: flex; justify-content: center;
    }
    .btn-back {
      padding: 12px 24px; border-radius: 14px;
      background: var(--primary); color: #FFFFFF;
      font-weight: 700; font-size: 0.9rem;
      display: inline-flex; align-items: center; gap: 6px;
      border: none; cursor: pointer;
    }
  `]
})
export class InstructorsComponent {
  lang = inject(LanguageService);
  activeInstructor = signal<Instructor | null>(null);

  instructors = computed<Instructor[]>(() => {
    const isAr = this.lang.isArabic();
    return [
      {
        id: 'alaa_gehad',
        name: isAr ? 'م. علاء جهاد' : 'Eng. Alaa Gehad',
        title: isAr ? 'مهندس برمجيات ومطور تطبيقات الجوال' : 'Software Engineer & Mobile developer',
        headline: isAr ? 'مهندس برمجيات متخصص في Flutter وبناء المعماريات عالية الأداء.' : 'Software Engineer specializing in Flutter & High-Performance Architecture.',
        bio: isAr
          ? 'م. علاء جهاد مهندس برمجيات خبير ومعماري تطبيقات جوال. قام بتدريب وإرشاد أكثر من 1200 طالب لبناء تطبيقات جوال متكاملة متعددة المنصات باستخدام Clean Architecture وإدارة الحالات وأنماط التصميم البرمجي الحديثة.'
          : 'Eng. Alaa Gehad is an experienced Software Engineer and Mobile Application Architect. He has mentored over 1,200 students in building real-world cross-platform applications with clean architecture, state management, and modern software design patterns.',
        imagePath: 'assets/images/alaa_gehad.jpg',
        rating: 4.9,
        studentsCount: 1200,
        coursesCount: 12,
        linkedInUrl: 'https://linkedin.com',
        githubUrl: 'https://github.com',
        skillCategories: [
          {
            categoryName: isAr ? 'تطوير تطبيقات الجوال والواجهات' : 'Mobile & Frontend Development',
            skills: ['Flutter', 'Dart', 'State Management (Bloc/Provider)', 'Clean Architecture', 'REST APIs & GraphQL', 'UI/UX Implementation']
          },
          {
            categoryName: isAr ? 'هندسة البرمجيات والمعمارية' : 'Software Engineering & Architecture',
            skills: ['OOP & SOLID Principles', 'Git & GitHub', 'CI/CD Pipelines', 'App Performance Optimization', 'Firebase & Cloud Services']
          }
        ],
        projects: [
          {
            title: isAr ? 'تطبيق منصة التعليم الإلكتروني' : 'Educational E-Learning Platform App',
            description: isAr ? 'تطبيق جوال متكامل للتعلم التفاعلي المباشر وتسليم الواجبات ومتابعة التقدم.' : 'A comprehensive cross-platform mobile app built for interactive live learning, assignment submissions, and progress tracking.',
            appType: isAr ? 'تطبيق جوال' : 'Mobile App',
            techStack: ['Flutter', 'Dart', 'Firebase', 'Provider']
          },
          {
            title: isAr ? 'لوحة تحكم أولياء الأمور' : 'Smart Kids Academy Parent Dashboard',
            description: isAr ? 'لوحة تحكم عبر الويب تتيح لأولياء الأمور متابعة تقدم الطلاب والحضور وتقييمات المدرسين.' : 'Web dashboard allowing parents to view real-time student progress, attendance, and instructor feedback.',
            appType: isAr ? 'بوابة ويب' : 'Web Portal',
            techStack: ['Flutter Web', 'REST APIs', 'Clean Architecture']
          }
        ]
      },
      {
        id: 'mahmoud_al_ashry',
        name: isAr ? 'م. محمود العشري' : 'Eng. Mahmoud Al-Ashry',
        title: isAr ? 'مدرب Full-Stack .NET & Angular' : 'Full-Stack (.NET & Angular) Developer',
        headline: isAr ? 'مطور Full-Stack .NET متخصص في ASP.NET Core وAngular وبناء الأنظمة البرمجية للمؤسسات.' : 'Full-Stack .NET Developer specializing in ASP.NET Core, Angular, Web API & Enterprise Solutions.',
        bio: isAr
          ? 'م. محمود العشري مهندس برمجيات ومطور Full-Stack متخصص في .NET وAngular مع خبرة عملية في تصميم وتطوير حلول البرمجيات المؤسسية وواجهات REST APIs وقواعد البيانات. يمتلك شغفاً كبيراً بتدريب الطلاب على قواعد البرمجة السليمة ومبادئ OOP وSOLID وأنماط التصميم (Design Patterns).'
          : 'Eng. Mahmoud Al-Ashry is a Full-Stack .NET & Angular Developer with hands-on experience designing enterprise web applications, RESTful APIs, and scalable software solutions using ASP.NET Core and Angular. He is passionate about mentoring aspiring coders in OOP, SOLID principles, design patterns, and C# software architecture.',
        imagePath: 'assets/images/mahmoud_al_ashry.jpg',
        rating: 4.9,
        studentsCount: 850,
        coursesCount: 8,
        linkedInUrl: 'https://www.linkedin.com/in/mahmoud-al-ashry-4a535b284/',
        githubUrl: 'https://github.com/mahmoud-al-ashry',
        skillCategories: [
          {
            categoryName: isAr ? 'تطوير الخلفية والـ .NET' : 'Backend & .NET Development',
            skills: ['C#', 'ASP.NET Core MVC', 'ASP.NET Web API', 'Entity Framework Core', 'LINQ', 'RESTful APIs', 'GraphQL']
          },
          {
            categoryName: isAr ? 'تطوير الواجهات وقواعد البيانات' : 'Frontend & Database Technologies',
            skills: ['Angular', 'TypeScript', 'HTML5 / CSS3', 'MSSQL Server', 'Oracle', 'Redis', 'OOP & SOLID Principles']
          }
        ],
        projects: [
          {
            title: isAr ? 'نظام SoftPrograms المؤسسي للويب' : 'SoftPrograms Enterprise Web System',
            description: isAr ? 'تطوير وصيانة تطبيقات ويب مؤسسية باستخدام ASP.NET Core API وAngular وبنية ABP Framework وقواعد بيانات SQL Server.' : 'Developed and maintained enterprise web applications using ASP.NET Core API, Angular, ABP Framework, SQL Server, and GraphQL.',
            appType: isAr ? 'تطبيق مؤسسي' : 'Enterprise App',
            techStack: ['ASP.NET Core API', 'Angular', 'ABP Framework', 'SQL Server', 'GraphQL']
          },
          {
            title: isAr ? 'مشروع Full Stack متكامل - ITI' : 'Full Stack Web Development Project - ITI',
            description: isAr ? 'مشروع متكامل لتطوير تطبيقات الويب باستخدام مضمار Dot Net C# وتطبيق مفاهيم OOP وLINQ وEntity Framework Core.' : 'Full stack web development project leveraging Dot Net C#, OOP, ASP.NET MVC, Entity Framework Core, LINQ, and MSSQL Server.',
            appType: isAr ? 'مشروع متكامل' : 'Full Stack Project',
            techStack: ['C#', 'ASP.NET MVC', 'Entity Framework', 'LINQ', 'MSSQL']
          }
        ]
      }
    ];
  });

  onAvatarError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/logo_mascot_clean.png';
  }
}

