import { Component, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { LogoComponent } from '../../shared/logo/logo.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, LogoComponent, RouterLink, RouterLinkActive],
  template: `
    <header class="sticky-header" [class.scrolled]="isScrolled()">
      <div class="container header-container">
        <!-- Logo pinned to far left / start -->
        <a routerLink="/" class="logo-link">
          <app-logo [iconSize]="38" [fontSize]="18"></app-logo>
        </a>

        <!-- Desktop Menu -->
        <nav class="desktop-nav">
          <a routerLink="/" routerLinkActive="active-link" [routerLinkActiveOptions]="{exact: true}" class="nav-link">{{ lang.t().nav.home }}</a>
          <a routerLink="/roadmap" routerLinkActive="active-link" class="nav-link">{{ lang.t().nav.roadmap }}</a>
          <a routerLink="/instructors" routerLinkActive="active-link" class="nav-link">{{ lang.t().nav.instructors }}</a>
          <a routerLink="/projects" routerLinkActive="active-link" class="nav-link">{{ lang.t().nav.projects }}</a>
          <a routerLink="/faq" routerLinkActive="active-link" class="nav-link">{{ lang.t().nav.faq }}</a>

          <!-- Contact Us (WhatsApp) & Start Journey CTA -->
          <a href="https://wa.me/201108464037" target="_blank" class="btn-text-link">{{ lang.t().nav.contact }}</a>
          <a routerLink="/roadmap" class="btn-gradient">
            <span class="material-icons-round">rocket_launch</span>
            <span>{{ lang.t().nav.bookTrial }}</span>
          </a>

          <!-- Circular Language Toggle at the end -->
          <button 
            class="lang-circle-btn" 
            (click)="lang.toggleLanguage()" 
            [attr.title]="lang.t().langToggle" 
            [attr.aria-label]="lang.t().langToggle"
          >
            <span class="material-icons-round">language</span>
          </button>
        </nav>

        <!-- Mobile Header Actions -->
        <div class="mobile-actions">
          <button class="mobile-menu-btn" (click)="drawerOpen.set(true)">
            <span class="material-icons-round">menu</span>
          </button>
          <button 
            class="lang-circle-btn" 
            (click)="lang.toggleLanguage()" 
            [attr.title]="lang.t().langToggle" 
            [attr.aria-label]="lang.t().langToggle"
          >
            <span class="material-icons-round">language</span>
          </button>
        </div>
      </div>

      <!-- Mobile Drawer Overlay -->
      @if (drawerOpen()) {
        <div class="mobile-drawer-backdrop" (click)="drawerOpen.set(false)">
          <div class="mobile-drawer" (click)="$event.stopPropagation()">
            <div class="drawer-header">
              <app-logo [iconSize]="32" [fontSize]="16"></app-logo>
              <button class="close-btn" (click)="drawerOpen.set(false)">
                <span class="material-icons-round">close</span>
              </button>
            </div>
            
            <div class="drawer-links">
              <a routerLink="/" routerLinkActive="active-link" [routerLinkActiveOptions]="{exact: true}" (click)="drawerOpen.set(false)">{{ lang.t().nav.home }}</a>
              <a routerLink="/roadmap" routerLinkActive="active-link" (click)="drawerOpen.set(false)">{{ lang.t().nav.roadmap }}</a>
              <a routerLink="/instructors" routerLinkActive="active-link" (click)="drawerOpen.set(false)">{{ lang.t().nav.instructors }}</a>
              <a routerLink="/projects" routerLinkActive="active-link" (click)="drawerOpen.set(false)">{{ lang.t().nav.projects }}</a>
              <a routerLink="/faq" routerLinkActive="active-link" (click)="drawerOpen.set(false)">{{ lang.t().nav.faq }}</a>
            </div>

            <div class="drawer-footer">
              <button class="btn-outlined-full" (click)="lang.toggleLanguage()">
                <span class="material-icons-round icon">language</span>
                <span>{{ lang.t().langToggle }}</span>
              </button>
              <a href="https://wa.me/201108464037" target="_blank" class="btn-outlined-full" (click)="drawerOpen.set(false)">{{ lang.t().nav.contact }}</a>
              <a routerLink="/roadmap" class="btn-gradient-full" (click)="drawerOpen.set(false)">{{ lang.t().nav.bookTrial }}</a>
            </div>
          </div>
        </div>
      }
    </header>
  `,
  styles: [`
    .sticky-header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      height: 72px;
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(226, 232, 240, 0.6);
      transition: all 0.3s ease;
    }
    .sticky-header.scrolled {
      background: rgba(255, 255, 255, 0.95);
      box-shadow: 0 4px 20px rgba(10, 25, 47, 0.08);
    }
    .header-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
    }
    .desktop-nav {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .nav-link {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-secondary);
      padding: 0.25rem 0.25rem;
      position: relative;
      transition: color 0.2s ease;
      text-decoration: none;
    }
    .nav-link:hover {
      color: var(--primary);
    }
    .nav-link.active-link {
      color: var(--secondary);
      font-weight: 700;
    }
    .nav-link.active-link::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      right: 0;
      height: 2.5px;
      background: var(--secondary);
      border-radius: 2px;
    }
    .lang-circle-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: rgba(10, 25, 47, 0.05);
      border: 1.5px solid rgba(10, 25, 47, 0.15);
      color: var(--primary);
      font-size: 0.82rem;
      font-weight: 800;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      flex-shrink: 0;
      line-height: 1;
      margin-inline-start: 4px;
    }
    .lang-circle-btn span.material-icons-round {
      font-size: 20px;
    }
    .lang-circle-btn:hover {
      background-color: var(--primary);
      color: #FFFFFF;
      border-color: var(--primary);
      transform: scale(1.08);
      box-shadow: 0 4px 12px rgba(10, 25, 47, 0.2);
    }

    .btn-text-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      padding: 0 18px;
      border-radius: 12px;
      background: #25D366 !important;
      color: #FFFFFF !important;
      border: 1.5px solid #25D366;
      font-size: 0.85rem;
      font-weight: 700;
      text-decoration: none;
      transition: all 0.25s ease;
      box-shadow: none !important;
    }
    .btn-text-link:hover {
      background: #128C7E !important;
      border-color: #128C7E;
      color: #FFFFFF !important;
      transform: translateY(-2px);
      box-shadow: none !important;
    }

    .btn-gradient {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      height: 42px;
      padding: 0 20px;
      border-radius: 12px;
      background: linear-gradient(135deg, #0066FF 0%, #0052CC 100%);
      color: #FFFFFF;
      border: none;
      font-size: 0.85rem;
      font-weight: 700;
      box-shadow: none !important;
      transition: all 0.25s ease;
      text-decoration: none;
    }
    .btn-gradient span.material-icons-round {
      color: #FFFFFF;
      font-size: 18px;
    }
    .btn-gradient:hover {
      transform: translateY(-2px);
      background: linear-gradient(135deg, #0052CC 0%, #003D99 100%);
      box-shadow: none !important;
    }

    .mobile-actions {
      display: none;
      align-items: center;
      gap: 8px;
    }
    .mobile-menu-btn {
      color: var(--primary);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4px;
    }

    @media (max-width: 1050px) {
      .desktop-nav { display: none; }
      .mobile-actions { display: flex; }
    }

    /* Mobile Drawer */
    .mobile-drawer-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 2000;
      display: flex;
      justify-content: flex-end;
    }
    .mobile-drawer {
      width: 80%;
      max-width: 320px;
      height: 100%;
      background: #FFFFFF;
      display: flex;
      flex-direction: column;
      padding: 1.5rem;
      box-shadow: -10px 0 30px rgba(0,0,0,0.15);
      animation: slideDrawer 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes slideDrawer {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }
    [dir="rtl"] .mobile-drawer {
      animation: slideDrawerRtl 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes slideDrawerRtl {
      from { transform: translateX(-100%); }
      to { transform: translateX(0); }
    }
    .drawer-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--border-color);
    }
    .drawer-links {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding-top: 1.5rem;
    }
    .drawer-links a {
      font-size: 1.05rem;
      font-weight: 600;
      color: var(--text-primary);
      text-decoration: none;
    }
    .drawer-links a.active-link {
      color: var(--secondary);
      font-weight: 700;
    }
    .drawer-footer {
      margin-top: auto;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .btn-outlined-full {
      width: 100%;
      padding: 10px;
      border-radius: 12px;
      border: 1px solid var(--border-color);
      color: var(--primary);
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      text-decoration: none;
    }
    .btn-outlined-full.btn-wa-drawer {
      background: #25D366 !important;
      color: #FFFFFF !important;
      border-color: #25D366 !important;
    }
    .btn-gradient-full {
      width: 100%;
      padding: 12px;
      border-radius: 12px;
      background: var(--grad-accent);
      color: #FFFFFF;
      font-weight: 700;
    }
  `]
})
export class NavbarComponent {
  lang = inject(LanguageService);
  isScrolled = signal(false);
  drawerOpen = signal(false);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 40);
  }
}
