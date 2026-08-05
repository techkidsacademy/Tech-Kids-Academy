import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { LanguageService } from '../core/services/language.service';
import { ROADMAP_LEVELS, RoadmapLevel, PathCourseNode } from '../core/services/roadmap-data';

@Component({
  selector: 'app-program-details-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page-wrapper">
      <section class="details-section section-padding">
        <div class="container">
          <!-- Top Nav Control -->
          <div class="top-nav-bar">
            <a routerLink="/roadmap" class="btn-back">
              <span class="material-icons-round icon">{{ lang.isArabic() ? 'arrow_forward' : 'arrow_back' }}</span>
              <span>{{ lang.isArabic() ? 'العودة إلى خريطة البرامج' : 'Back to Programs Roadmap' }}</span>
            </a>
          </div>

          <!-- 3 Standalone Level Cards Grid -->
          <div class="levels-cards-grid">
            @for (lvl of levels; track lvl.id) {
              <div 
                class="level-card-item"
                [class.active]="activeLevel().id === lvl.id"
                (click)="switchLevel(lvl.id)"
              >
                <!-- Badge Pill -->
                <div class="level-card-badge" [style.background-color]="lvl.color + '1A'" [style.color]="lvl.color">
                  <span class="material-icons-round">{{ lvl.icon }}</span>
                  <span>{{ lang.isArabic() ? lvl.levelNumberAr : lvl.levelNumberEn }}</span>
                </div>

                <!-- Level Title -->
                <h3 class="level-card-title">{{ lang.isArabic() ? lvl.levelNumberAr : lvl.levelNumberEn }}</h3>

                <!-- Duration & Price -->
                <div class="level-card-meta">
                  <div class="card-duration">
                    <span class="material-icons-round icon">schedule</span>
                    <span>{{ lang.isArabic() ? lvl.durationAr : lvl.durationEn }}</span>
                  </div>

                  <div class="card-price">
                    <strong class="price-val">{{ lvl.priceEn.split(' ')[0] }}</strong>
                    <span class="currency-text">{{ lang.isArabic() ? 'ج.م' : 'EGP' }}</span>
                    @if (lvl.originalPriceEn) {
                      <span class="strike-price">{{ lvl.originalPriceEn.split(' ')[0] }}</span>
                    }
                  </div>
                </div>

                <!-- Downward Arrow Flow Indicator when Active -->
                @if (activeLevel().id === lvl.id) {
                  <div class="active-card-indicator" [style.background-color]="lvl.color">
                    <span class="material-icons-round">keyboard_arrow_down</span>
                  </div>
                }
              </div>
            }
          </div>

          <!-- Tree Flowchart Container for Selected Level -->
          <div class="tree-flowchart-wrapper">
            <!-- Level Goal Banner -->
            <div class="level-goal-header" [style.border-inline-start-color]="activeLevel().color">
              <div class="goal-icon-box" [style.background-color]="activeLevel().color + '18'" [style.color]="activeLevel().color">
                <span class="material-icons-round">flag</span>
              </div>
              <div class="goal-text-content">
                <p class="goal-desc">{{ lang.isArabic() ? activeLevel().goalAr : activeLevel().goalEn }}</p>
              </div>
            </div>

            <!-- 3 Main Month Branches Grid -->
            <div class="months-branches-grid">
              @for (course of activeLevel().coursePath; track course.stepNumber) {
                <div class="month-branch-card">
                  <!-- Branch Header: Month Title & Duration -->
                  <div class="branch-header-pill" [style.background-color]="activeLevel().color">
                    <div class="branch-step-num">{{ course.stepNumber }}</div>
                    <div class="branch-title-text">
                      <h4>{{ lang.isArabic() ? course.titleAr : course.titleEn }}</h4>
                      <span>{{ lang.isArabic() ? course.durationAr : course.durationEn }}</span>
                    </div>
                  </div>

                  <!-- Month Description -->
                  <p class="branch-month-desc">{{ lang.isArabic() ? course.descAr : course.descEn }}</p>
                </div>
              }
            </div>
          </div>

          <!-- Course Outcomes & Fixed Activities Footer Grid -->
          <div class="outcomes-routine-grid">
            <!-- Course Outcomes Box -->
            @if (activeLevel().outcomesAr || activeLevel().outcomesEn) {
              <div class="outcomes-card-box">
                <div class="box-header">
                  <span class="material-icons-round icon">verified_user</span>
                  <h4>{{ lang.isArabic() ? 'مخرجات ومكاسب هذا المستوى:' : 'Key Level Learning Outcomes:' }}</h4>
                </div>
                <div class="outcomes-list">
                  @for (outc of (lang.isArabic() ? activeLevel().outcomesAr : activeLevel().outcomesEn); track outc) {
                    <div class="outcome-item">
                      <span class="material-icons-round check-ic">task_alt</span>
                      <span>{{ outc }}</span>
                    </div>
                  }
                </div>
              </div>
            }

            <!-- Fixed Routine Activities Box -->
            @if (activeLevel().routineAr || activeLevel().routineEn) {
              <div class="routine-card-box">
                <div class="box-header">
                  <span class="material-icons-round icon">auto_awesome</span>
                  <h4>{{ lang.isArabic() ? 'أنشطة ثابتة في الدورة:' : 'Continuous Student Activities:' }}</h4>
                </div>
                <div class="routine-chips-grid">
                  @for (rout of (lang.isArabic() ? activeLevel().routineAr : activeLevel().routineEn); track rout) {
                    <div class="routine-chip">
                      <span class="material-icons-round star-ic">star</span>
                      <span>{{ rout }}</span>
                    </div>
                  }
                </div>
              </div>
            }
          </div>

          <!-- Page Footer WhatsApp CTA -->
          <div class="page-footer-cta">
            <a href="https://wa.me/201108464037" target="_blank" class="btn-enroll-wa">
              <span>{{ lang.isArabic() ? 'تواصل معنا' : 'Contact Us' }}</span>
            </a>
          </div>

        </div>
      </section>
    </div>
  `,
  styles: [`
    .page-wrapper {
      padding-top: 72px;
      background: var(--bg-soft);
      min-height: 100vh;
    }

    .top-nav-bar {
      margin-bottom: 1.5rem;
    }
    .btn-back {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 18px;
      border-radius: 14px;
      background: #FFFFFF;
      border: 1.5px solid var(--border-color);
      color: var(--primary);
      font-weight: 700;
      font-size: 0.9rem;
      transition: all 0.25s ease;
      box-shadow: 0 2px 8px rgba(10, 25, 47, 0.04);
      text-decoration: none;
    }
    .btn-back:hover {
      border-color: #0066FF;
      color: #0066FF;
      transform: translateY(-2px);
      box-shadow: 0 4px 14px rgba(10, 25, 47, 0.08);
    }

    /* 3 Standalone Level Cards Grid */
    .levels-cards-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
      margin-bottom: 2.5rem;
    }
    @media (max-width: 992px) {
      .levels-cards-grid {
        grid-template-columns: 1fr;
      }
    }
    .level-card-item {
      background: #FFFFFF;
      border-radius: 20px;
      padding: 1.75rem;
      border: 2px solid var(--border-color);
      box-shadow: 0 4px 16px rgba(10, 25, 47, 0.03);
      cursor: pointer;
      transition: all 0.25s ease;
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
    }
    .level-card-item:hover {
      border-color: #0066FF;
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 102, 255, 0.1);
    }
    .level-card-item.active {
      border-color: #0066FF;
      background: #FFFFFF;
      box-shadow: 0 10px 30px rgba(0, 102, 255, 0.15);
    }
    .level-card-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 14px;
      border-radius: 50px;
      font-weight: 800;
      font-size: 0.82rem;
      margin-bottom: 1rem;
      align-self: flex-start;
    }
    .level-card-title {
      font-size: 1.3rem;
      font-weight: 800;
      color: var(--primary);
      margin-bottom: 1rem;
      line-height: 1.3;
    }
    .level-card-meta {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-top: auto;
    }
    .card-duration {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.88rem;
      color: var(--text-secondary);
      font-weight: 600;
    }
    .card-duration .icon {
      font-size: 18px;
      color: #0066FF;
    }
    .card-price {
      display: flex;
      align-items: baseline;
      gap: 6px;
      margin-top: 4px;
    }
    .card-price .price-val {
      font-size: 1.3rem;
      font-weight: 800;
      color: #0066FF;
    }
    .card-price .currency-text {
      font-size: 0.85rem;
      font-weight: 700;
      color: #0066FF;
    }
    .card-price .strike-price {
      font-size: 0.88rem;
      text-decoration: line-through;
      color: #94A3B8;
      margin-inline-start: 4px;
    }

    .active-card-indicator {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 32px;
      height: 18px;
      border-radius: 12px 12px 0 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FFFFFF;
    }
    .active-card-indicator span {
      font-size: 20px;
    }

    /* Tree Flowchart Section */
    .tree-flowchart-wrapper {
      background: #FFFFFF;
      border-radius: 24px;
      padding: 2.25rem;
      border: 1.5px solid var(--border-color);
      box-shadow: 0 6px 24px rgba(10, 25, 47, 0.04);
      margin-bottom: 2.5rem;
    }

    .level-goal-header {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      background: var(--bg-soft);
      padding: 1.25rem 1.75rem;
      border-radius: 16px;
      border-inline-start: 5px solid #0066FF;
      margin-bottom: 2rem;
    }
    .goal-icon-box {
      width: 48px;
      height: 48px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .goal-icon-box span { font-size: 26px; }
    .goal-badge {
      font-size: 0.78rem;
      font-weight: 800;
      color: #0066FF;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .goal-desc {
      font-size: 1.05rem;
      font-weight: 800;
      color: var(--primary);
      margin: 4px 0 0 0;
    }

    .flowchart-title-block {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 2rem;
    }
    .flowchart-title-block .icon {
      font-size: 30px;
    }
    .flowchart-title-block h3 {
      font-size: 1.3rem;
      font-weight: 800;
      color: var(--primary);
      margin: 0;
    }

    /* Month Branches Grid */
    .months-branches-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      align-items: start;
    }
    @media (max-width: 992px) {
      .months-branches-grid {
        grid-template-columns: 1fr;
      }
    }

    .month-branch-card {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .branch-header-pill {
      width: 100%;
      padding: 1.25rem 1.5rem;
      border-radius: 18px;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      gap: 1rem;
      box-shadow: 0 8px 20px rgba(0, 102, 255, 0.2);
    }
    .branch-month-desc {
      font-size: 0.94rem;
      color: var(--text-secondary);
      line-height: 1.65;
      margin: 1.25rem 0 0.5rem 0;
      text-align: start;
      width: 100%;
      background: var(--bg-soft);
      padding: 1rem 1.25rem;
      border-radius: 14px;
      border: 1px solid var(--border-color);
    }
    .branch-step-num {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.22);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 900;
      font-size: 1.1rem;
      flex-shrink: 0;
    }
    .branch-title-text h4 {
      font-size: 1rem;
      font-weight: 800;
      color: #FFFFFF;
      margin-bottom: 2px;
      line-height: 1.3;
    }
    .branch-title-text span {
      font-size: 0.78rem;
      opacity: 0.9;
      font-weight: 600;
    }

    .branch-down-connector {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 8px 0;
      color: #0066FF;
    }
    .branch-down-connector .line {
      width: 2px;
      height: 16px;
      background: #0066FF;
      opacity: 0.4;
    }
    .branch-down-connector .arrow {
      font-size: 18px;
      margin-top: -4px;
    }

    /* Weeks Tree List */
    .weeks-tree-list {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .week-node-item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      width: 100%;
    }
    .week-node-connector {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 12px;
    }
    .week-node-connector .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .week-node-card {
      width: 100%;
      background: var(--bg-soft);
      border: 1px solid var(--border-color);
      border-radius: 14px;
      padding: 0.9rem 1.1rem;
      display: flex;
      align-items: flex-start;
      gap: 10px;
      transition: all 0.2s ease;
    }
    .week-node-card:hover {
      border-color: #0066FF;
      transform: translateX(-3px);
      box-shadow: 0 4px 12px rgba(0, 102, 255, 0.08);
    }
    .week-icon {
      font-size: 18px;
      color: #22C55E;
      margin-top: 2px;
      flex-shrink: 0;
    }
    .week-text {
      font-size: 0.88rem;
      font-weight: 700;
      color: var(--primary);
      line-height: 1.4;
    }

    /* Capstone Project Node */
    .capstone-node-box {
      width: 100%;
      background: #FFF7ED;
      border: 1.5px solid #FED7AA;
      border-radius: 16px;
      padding: 1rem 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .capstone-node-tag {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.75rem;
      font-weight: 800;
      color: #EA580C;
    }
    .capstone-node-tag .icon { font-size: 16px; }
    .capstone-node-name {
      font-size: 0.92rem;
      font-weight: 800;
      color: #9A3412;
      margin: 0;
      line-height: 1.45;
    }

    /* Course Outcomes & Routine Grid */
    .outcomes-routine-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.75rem;
      margin-bottom: 2.5rem;
    }
    @media (max-width: 850px) {
      .outcomes-routine-grid {
        grid-template-columns: 1fr;
      }
    }
    .outcomes-card-box, .routine-card-box {
      background: #FFFFFF;
      border-radius: 20px;
      padding: 1.75rem;
      border: 1.5px solid var(--border-color);
      box-shadow: 0 4px 16px rgba(10, 25, 47, 0.03);
    }
    .box-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 1.25rem;
    }
    .box-header .icon {
      font-size: 26px;
      color: #0066FF;
    }
    .box-header h4 {
      font-size: 1.15rem;
      font-weight: 800;
      color: var(--primary);
      margin: 0;
    }
    .outcomes-list {
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
    }
    .outcome-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-size: 0.92rem;
      font-weight: 700;
      color: var(--primary);
    }
    .outcome-item .check-ic {
      color: #22C55E;
      font-size: 20px;
      flex-shrink: 0;
      margin-top: 1px;
    }

    .routine-chips-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 0.75rem;
    }
    .routine-chip {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 14px;
      border-radius: 12px;
      background: var(--bg-soft);
      border: 1px solid var(--border-color);
      font-size: 0.86rem;
      font-weight: 700;
      color: var(--primary);
    }
    .routine-chip .star-ic {
      color: #F59E0B;
      font-size: 18px;
      flex-shrink: 0;
    }

    .page-footer-cta {
      display: flex;
      justify-content: center;
      margin-top: 1rem;
    }
    .btn-enroll-wa {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 14px 36px;
      border-radius: 14px;
      background: #25D366;
      color: #FFFFFF;
      font-weight: 800;
      font-size: 1rem;
      box-shadow: 0 8px 20px rgba(37, 211, 102, 0.3);
      transition: all 0.25s ease;
      text-decoration: none;
    }
    .btn-enroll-wa:hover {
      background: #128C7E;
      transform: translateY(-2px);
      box-shadow: 0 12px 26px rgba(37, 211, 102, 0.4);
    }
  `]
})
export class ProgramDetailsPageComponent implements OnInit {
  lang = inject(LanguageService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  levels = ROADMAP_LEVELS;
  activeLevel = signal<RoadmapLevel>(this.levels[0]);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = Number(params['id']) || 1;
      const found = this.levels.find(l => l.id === id) || this.levels[0];
      this.activeLevel.set(found);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  switchLevel(levelId: number): void {
    this.router.navigate(['/program-details', levelId]);
  }
}
