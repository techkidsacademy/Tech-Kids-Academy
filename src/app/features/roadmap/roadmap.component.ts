import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { ROADMAP_LEVELS, RoadmapLevel } from '../../core/services/roadmap-data';

@Component({
  selector: 'app-roadmap',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section id="roadmap" class="roadmap-section section-padding">
      <div class="container">
        <!-- Header -->
        <div class="section-header text-center">
          <div class="roadmap-badge">
            <span class="material-icons-round icon">alt_route</span>
            <span>{{ lang.isArabic() ? 'خارطة البرامج' : 'Programs Roadmap' }}</span>
          </div>
          <p class="subtitle">
            {{ lang.isArabic() 
              ? 'خطة تعليمية متكاملة مقسمة إلى 3 مستويات رئيسية تضمن تحول طفلك من مستخدم للتكنولوجيا إلى صانع ومبتكر لها.' 
              : 'A structured 3-level roadmap designed to transform young learners into confident tech creators.' }}
          </p>
        </div>

        <!-- 3 Levels Timeline Grid -->
        <div class="roadmap-timeline">
          @for (lvl of levels; track lvl.id) {
            <div 
              class="roadmap-card" 
              [class.featured]="lvl.isFeatured"
              [routerLink]="['/program-details', lvl.id]"
            >
              @if (lvl.isFeatured) {
                <div class="ref-featured-badge">
                  <span>{{ lang.isArabic() ? lvl.featuredBadgeAr : lvl.featuredBadgeEn }}</span>
                </div>
              }

              <!-- Top Illustration Icon -->
              <div class="card-icon-wrap" [style.color]="lvl.iconColor || '#0066FF'">
                <span class="material-icons-round">{{ lvl.icon }}</span>
              </div>

              <!-- Title & Price Block -->
              <div class="card-header-block">
                <h3 class="level-title">{{ lang.isArabic() ? lvl.levelNumberAr : lvl.levelNumberEn }}</h3>
                
                <div class="price-main-row">
                  <span class="price-val">{{ lvl.priceEn.split(' ')[0] }}</span>
                  <span class="price-currency">{{ lang.isArabic() ? 'ج.م' : 'EGP' }}</span>
                  @if (lvl.originalPriceEn) {
                    <span class="original-price-strike">{{ lvl.originalPriceEn.split(' ')[0] }}</span>
                  }
                </div>

                <!-- Light Blue Duration Badge -->
                <div class="duration-badge-pill">
                  <span>{{ lang.isArabic() ? lvl.durationAr : lvl.durationEn }}</span>
                </div>
              </div>

              <div class="divider-line"></div>

              <!-- Features List -->
              <ul class="features-list">
                @for (feat of lvl.features; track feat.textEn) {
                  <li>
                    <span class="material-icons-round feat-icon">{{ feat.icon }}</span>
                    <span>{{ lang.isArabic() ? feat.textAr : feat.textEn }}</span>
                  </li>
                }
              </ul>

              <div class="path-button-wrapper">
                <a 
                  class="btn-ref-pill"
                  [routerLink]="['/program-details', lvl.id]"
                  (click)="$event.stopPropagation()"
                >
                  <span class="material-icons-round btn-ic">schema</span>
                  <span>{{ lang.isArabic() ? 'عرض خريطة الكورس والمحتوى' : 'View Course Roadmap & Content' }}</span>
                </a>
              </div>
            </div>
          }
        </div>

        <!-- Roadmap CTA Button -->
        <div class="roadmap-cta-wrap">
          <a href="https://wa.me/201108464037" target="_blank" class="btn-wa-cta">
            <span>{{ lang.isArabic() ? 'تواصل معنا' : 'Contact Us' }}</span>
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .roadmap-section {
      background: linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%);
      position: relative;
    }
    .section-header {
      margin-bottom: 3.5rem;
    }
    .roadmap-badge {
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
      margin-bottom: 1.25rem;
    }
    .subtitle {
      font-size: 1.05rem;
      color: var(--text-secondary);
      max-width: 680px;
      margin: 0 auto;
      line-height: 1.7;
    }

    /* 3 Columns Timeline Grid */
    .roadmap-timeline {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      margin-bottom: 4rem;
      align-items: stretch;
      padding-top: 1rem;
    }
    @media (max-width: 992px) {
      .roadmap-timeline { 
        grid-template-columns: 1fr; 
        max-width: 440px; 
        margin-left: auto; 
        margin-right: auto;
      }
    }

    /* Cards - Reference Styling */
    .roadmap-card {
      background: #FFFFFF;
      border-radius: 24px;
      border: 1.5px solid #E2E8F0;
      padding: 2.25rem 2rem;
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      cursor: pointer;
    }
    .roadmap-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 18px 40px rgba(0, 102, 255, 0.12);
      border-color: #0066FF;
    }

    /* Featured Highlight Card */
    .roadmap-card.featured {
      border: 2px solid #0066FF;
      box-shadow: 0 16px 45px rgba(0, 102, 255, 0.15);
    }
    .ref-featured-badge {
      position: absolute;
      top: 18px;
      inset-inline-end: 18px;
      background: #FF5722;
      color: #FFFFFF;
      font-size: 0.76rem;
      font-weight: 700;
      padding: 5px 14px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(255, 87, 34, 0.3);
      z-index: 5;
    }

    .card-icon-wrap {
      margin-bottom: 1.25rem;
      display: flex;
      align-items: center;
    }
    .card-icon-wrap span { font-size: 48px; }

    .card-header-block {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-bottom: 1.25rem;
    }

    .level-title {
      font-size: 1.3rem;
      font-weight: 800;
      color: #0F172A;
      margin: 0;
    }

    .price-main-row {
      display: flex;
      align-items: baseline;
      gap: 8px;
    }
    .price-val {
      font-size: 2.2rem;
      font-weight: 900;
      color: #0066FF;
      line-height: 1;
      letter-spacing: -0.5px;
    }
    .price-currency {
      font-size: 1rem;
      font-weight: 800;
      color: #0066FF;
    }
    .original-price-strike {
      font-size: 1.05rem;
      font-weight: 600;
      color: #9CA3AF;
      text-decoration: line-through;
      margin-inline-start: 4px;
    }

    .per-class-text {
      font-size: 0.82rem;
      color: #6B7280;
      font-weight: 500;
      margin-bottom: 4px;
    }

    /* Light Blue Duration Badge */
    .duration-badge-pill {
      background: #EFF6FF;
      color: #0066FF;
      font-size: 0.8rem;
      font-weight: 700;
      padding: 6px 14px;
      border-radius: 10px;
      width: fit-content;
      margin-top: 4px;
    }

    .divider-line {
      height: 1px;
      background: #F1F5F9;
      margin: 1.5rem 0;
    }

    /* Features List */
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
      color: #475569;
      font-weight: 600;
    }
    .feat-icon {
      font-size: 18px;
      color: #38BDF8;
      flex-shrink: 0;
    }

    /* Full Width Pill Action Button */
    .path-button-wrapper {
      margin-top: auto;
    }
    .btn-ref-pill {
      width: 100%;
      padding: 13px;
      border-radius: 30px;
      background: #0066FF;
      color: #FFFFFF;
      font-size: 0.95rem;
      font-weight: 700;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      box-shadow: 0 6px 18px rgba(0, 102, 255, 0.25);
      transition: all 0.25s ease;
    }
    .btn-ic { font-size: 20px; }
    .btn-ref-pill:hover {
      background: #0052CC;
      box-shadow: 0 10px 24px rgba(0, 102, 255, 0.35);
      transform: translateY(-2px);
    }

    /* Roadmap CTA Wrap */
    .roadmap-cta-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 3rem;
    }
    .cta-content h3 {
      font-size: 1.4rem;
      font-weight: 800;
      color: #FFFFFF;
      margin-bottom: 6px;
    }
    .cta-content p {
      font-size: 0.95rem;
      color: rgba(255, 255, 255, 0.85);
      max-width: 580px;
    }
    .btn-wa-cta {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 14px 28px;
      border-radius: 14px;
      background: #25D366;
      color: #FFFFFF;
      font-weight: 800;
      font-size: 0.95rem;
      text-decoration: none;
      white-space: nowrap;
      box-shadow: 0 8px 20px rgba(37, 211, 102, 0.3);
      transition: all 0.2s ease;
    }
    .btn-wa-cta:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 24px rgba(37, 211, 102, 0.4);
    }

    /* High-Tech Flowchart Modal Backdrop & Glass Container */
    .path-modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(10, 25, 47, 0.75);
      backdrop-filter: blur(12px);
      z-index: 3000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      animation: fadeIn 0.25s ease;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .path-modal {
      background: #FFFFFF;
      border-radius: 32px;
      width: 100%;
      max-width: 920px;
      max-height: 92vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      position: relative;
      box-shadow: 0 35px 80px rgba(10, 25, 47, 0.4);
      animation: popModal 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes popModal {
      from { transform: scale(0.9) translateY(20px); opacity: 0; }
      to { transform: scale(1) translateY(0); opacity: 1; }
    }
    .modal-close-btn {
      position: absolute;
      top: 16px;
      inset-inline-end: 16px;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: #F1F5F9;
      border: 1px solid #E2E8F0;
      color: #0F172A;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 10;
      transition: all 0.2s ease;
    }
    .modal-close-btn:hover {
      background: #E2E8F0;
      color: #000000;
      transform: rotate(90deg);
    }

    /* Modal Hero Header */
    .modal-header-section {
      padding: 2.25rem 2.5rem;
      color: #FFFFFF;
      position: relative;
      overflow: hidden;
    }
    .header-overlay-glow {
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 90% 10%, rgba(255, 255, 255, 0.15) 0%, transparent 60%);
      pointer-events: none;
    }
    .header-top-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    .modal-badge {
      display: inline-block;
      padding: 4px 14px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.2);
      font-size: 0.82rem;
      font-weight: 800;
      letter-spacing: 0.5px;
    }
    .level-price-tag {
      font-size: 0.9rem;
      font-weight: 800;
      background: rgba(0, 0, 0, 0.25);
      padding: 4px 14px;
      border-radius: 12px;
    }
    .modal-header-section h2 {
      font-size: 1.8rem;
      font-weight: 900;
      color: #FFFFFF;
      margin-bottom: 6px;
      line-height: 1.25;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .modal-icon { font-size: 32px; color: #60A5FA; }
    .modal-header-section p {
      font-size: 0.95rem;
      color: rgba(255, 255, 255, 0.88);
      line-height: 1.5;
      max-width: 720px;
    }

    .modal-body-content {
      padding: 2rem;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 1.75rem;
    }

    /* 3 Levels Interactive Selector Tabs */
    .level-tabs-container {
      background: #F8FAFC;
      border: 1.5px solid #E2E8F0;
      border-radius: 20px;
      padding: 1.15rem;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .tabs-label {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.85rem;
      font-weight: 800;
      color: #0F172A;
    }
    .tabs-label span.material-icons-round { color: #0066FF; font-size: 18px; }
    .tabs-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
    }
    @media (max-width: 700px) {
      .tabs-grid { grid-template-columns: 1fr; }
    }
    .tab-level-btn {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 14px;
      border-radius: 14px;
      background: #FFFFFF;
      border: 1.5px solid #CBD5E1;
      cursor: pointer;
      transition: all 0.25s ease;
      text-align: start;
    }
    .tab-level-btn:hover {
      border-color: #0066FF;
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 102, 255, 0.1);
    }
    .tab-level-btn.active {
      background: linear-gradient(135deg, #0066FF 0%, #2563EB 100%);
      border-color: #0066FF;
      color: #FFFFFF;
      box-shadow: 0 8px 20px rgba(0, 102, 255, 0.3);
    }
    .lvl-tab-icon {
      font-size: 24px;
      color: #0066FF;
    }
    .tab-level-btn.active .lvl-tab-icon {
      color: #FFFFFF;
    }
    .lvl-tab-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .lvl-tab-name {
      font-size: 0.88rem;
      font-weight: 800;
      color: #0F172A;
    }
    .tab-level-btn.active .lvl-tab-name {
      color: #FFFFFF;
    }
    .lvl-tab-dur {
      font-size: 0.75rem;
      font-weight: 600;
      color: #64748B;
    }
    .tab-level-btn.active .lvl-tab-dur {
      color: rgba(255, 255, 255, 0.85);
    }

    /* Dark High-Tech Flowchart Canvas Track */
    .flowchart-dark-canvas {
      background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
      border-radius: 24px;
      padding: 1.5rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 15px 35px rgba(15, 23, 42, 0.25);
    }
    .canvas-header-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.88rem;
      font-weight: 800;
      color: #94A3B8;
      margin-bottom: 1.25rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .canvas-header-title .icon { font-size: 20px; color: #38BDF8; }

    .flowchart-nodes-wrapper {
      display: flex;
      align-items: center;
      gap: 0;
      position: relative;
    }
    @media (max-width: 850px) {
      .flowchart-nodes-wrapper {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
      }
    }

    .flowchart-node-card {
      flex: 1;
      background: rgba(255, 255, 255, 0.05);
      border: 1.5px solid rgba(255, 255, 255, 0.12);
      border-radius: 18px;
      padding: 1.15rem 0.85rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      cursor: pointer;
      position: relative;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .flowchart-node-card:hover {
      transform: translateY(-5px);
      border-color: #38BDF8;
      background: rgba(255, 255, 255, 0.09);
      box-shadow: 0 12px 28px rgba(56, 189, 248, 0.2);
    }
    .flowchart-node-card.active {
      background: linear-gradient(135deg, #0066FF 0%, #2563EB 100%);
      border-color: #60A5FA;
      box-shadow: 0 14px 32px rgba(0, 102, 255, 0.45);
      transform: translateY(-6px);
    }
    .node-step-tag {
      font-size: 0.68rem;
      font-weight: 800;
      color: #38BDF8;
      background: rgba(56, 189, 248, 0.15);
      padding: 2px 10px;
      border-radius: 10px;
      margin-bottom: 8px;
    }
    .flowchart-node-card.active .node-step-tag {
      color: #FFFFFF;
      background: rgba(255, 255, 255, 0.25);
    }

    .node-icon-box {
      width: 42px;
      height: 42px;
      border-radius: 14px;
      background: rgba(255, 255, 255, 0.1);
      color: #38BDF8;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 8px;
    }
    .flowchart-node-card.active .node-icon-box {
      background: #FFFFFF;
      color: #0066FF;
    }
    .node-icon-box span { font-size: 22px; }

    .node-title {
      font-size: 0.85rem;
      font-weight: 800;
      color: #FFFFFF;
      line-height: 1.35;
      margin: 0 0 4px 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .node-dur {
      font-size: 0.7rem;
      color: #94A3B8;
      font-weight: 600;
    }
    .flowchart-node-card.active .node-dur {
      color: rgba(255, 255, 255, 0.85);
    }

    .flowchart-connector-line {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      width: 32px;
      flex-shrink: 0;
    }
    @media (max-width: 850px) {
      .flowchart-connector-line { display: none; }
    }
    .line-pulse {
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, #38BDF8, rgba(56, 189, 248, 0.3));
    }
    .connector-arrow {
      position: absolute;
      font-size: 16px;
      color: #38BDF8;
    }
    [dir="rtl"] .connector-arrow {
      transform: rotate(180deg);
    }

    /* Active Selected Course Detailed Pane */
    .active-course-details-pane {
      background: #FFFFFF;
      border: 1.5px solid #0066FF;
      border-radius: 24px;
      padding: 1.75rem;
      box-shadow: 0 16px 40px rgba(0, 102, 255, 0.12);
    }
    .animate-pop {
      animation: popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes popIn {
      from { transform: scale(0.96); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    /* Control Top Bar */
    .pane-control-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.25rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #F1F5F9;
    }
    .nav-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      border-radius: 12px;
      background: #F1F5F9;
      color: #334155;
      font-size: 0.85rem;
      font-weight: 700;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .nav-btn:hover:not(:disabled) {
      background: #0066FF;
      color: #FFFFFF;
    }
    .nav-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .step-progress-indicator {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.85rem;
      font-weight: 800;
      color: #0066FF;
      background: #EFF6FF;
      padding: 6px 14px;
      border-radius: 12px;
    }
    .step-progress-indicator .star-icon { font-size: 16px; }

    /* Course Info Box */
    .course-main-info-box {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    .info-header-row {
      display: flex;
      align-items: center;
      gap: 1.25rem;
    }
    .course-icon-badge {
      width: 58px;
      height: 58px;
      border-radius: 18px;
      background: linear-gradient(135deg, #0066FF 0%, #2563EB 100%);
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 20px rgba(0, 102, 255, 0.3);
      flex-shrink: 0;
    }
    .course-icon-badge span { font-size: 32px; }

    .course-title-block h3 {
      font-size: 1.3rem;
      font-weight: 800;
      color: #0F172A;
      margin: 0;
    }
    .dur-pill {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 0.78rem;
      font-weight: 700;
      color: #0066FF;
      margin-bottom: 4px;
    }
    .dur-pill .icon { font-size: 14px; }

    .course-desc {
      font-size: 0.92rem;
      color: #475569;
      line-height: 1.65;
      margin: 0;
    }

    .topics-container {
      margin-top: 0.5rem;
    }
    .section-sub-title {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.88rem;
      font-weight: 800;
      color: #0F172A;
      margin-bottom: 10px;
    }
    .section-sub-title .icon { font-size: 18px; color: #0066FF; }

    .topics-chips-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
    }
    @media (max-width: 600px) {
      .topics-chips-grid { grid-template-columns: 1fr; }
    }
    .chip-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border-radius: 12px;
      background: #EFF6FF;
      border: 1px solid #BFDBFE;
      color: #1E40AF;
      font-size: 0.85rem;
      font-weight: 700;
    }
    .chip-item .check { font-size: 16px; color: #0066FF; }

    .capstone-project-card {
      background: linear-gradient(135deg, #FFF7ED 0%, #EFF6FF 100%);
      border: 1.5px solid #FDBA74;
      border-radius: 18px;
      padding: 1.25rem 1.5rem;
      box-shadow: 0 8px 24px rgba(251, 146, 60, 0.1);
    }
    .capstone-badge {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.82rem;
      font-weight: 800;
      color: #C2410C;
      margin-bottom: 6px;
    }
    .capstone-badge .icon { font-size: 18px; color: #EA580C; }
    .project-name {
      font-size: 1.05rem;
      font-weight: 800;
      color: #0F172A;
      margin: 0;
    }

    /* Modal Footer WhatsApp CTA */
    .modal-footer-cta {
      display: flex;
      justify-content: center;
      padding-top: 0.5rem;
    }
    .btn-enroll-wa {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 14px 32px;
      border-radius: 18px;
      background: #25D366;
      color: #FFFFFF;
      font-size: 1rem;
      font-weight: 800;
      text-decoration: none;
      box-shadow: 0 8px 22px rgba(37, 211, 102, 0.35);
      transition: all 0.25s ease;
    }
    .btn-enroll-wa:hover {
      transform: translateY(-2px);
      box-shadow: 0 14px 28px rgba(37, 211, 102, 0.45);
    }
  `]
})
export class RoadmapComponent {
  lang = inject(LanguageService);
  levels = ROADMAP_LEVELS;
}
