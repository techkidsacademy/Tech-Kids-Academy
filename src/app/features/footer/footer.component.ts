import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { LogoComponent } from '../../shared/logo/logo.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, LogoComponent],
  template: `
    <footer id="contact" class="footer-section">
      <div class="container footer-container">
        <!-- Column 1: Brand & Socials -->
        <div class="footer-col brand-col">
          <app-logo [iconSize]="42" [fontSize]="20" [isDark]="true" [showSlogan]="true"></app-logo>
          <p class="tagline">{{ lang.t().footer.tagline }}</p>

          <div class="social-row">
            <a href="https://facebook.com" target="_blank" class="social-btn">
              <span class="material-icons-round">facebook</span>
            </a>
            <a href="https://linkedin.com" target="_blank" class="social-btn">
              <span class="material-icons-round">link</span>
            </a>
            <a href="https://github.com" target="_blank" class="social-btn">
              <span class="material-icons-round">code</span>
            </a>
            <a href="https://youtube.com" target="_blank" class="social-btn">
              <span class="material-icons-round">play_circle_fill</span>
            </a>
          </div>
        </div>

        <!-- Column 2: Quick Links -->
        <div class="footer-col">
          <h4 class="col-title">{{ lang.t().footer.quickLinks }}</h4>
          <ul class="links-list">
            @for (link of lang.t().footer.quickLinksList; track link) {
              <li><a href="#">{{ link }}</a></li>
            }
          </ul>
        </div>

        <!-- Column 3: Courses -->
        <div class="footer-col">
          <h4 class="col-title">{{ lang.t().footer.coursesTitle }}</h4>
          <ul class="links-list">
            @for (c of lang.t().footer.coursesList; track c) {
              <li><a href="#courses">{{ c }}</a></li>
            }
          </ul>
        </div>

        <!-- Column 4: Contact Us -->
        <div class="footer-col">
          <h4 class="col-title">{{ lang.t().footer.contactTitle }}</h4>
          <div class="contact-list">
            <div class="contact-item">
              <span class="material-icons-round icon">email</span>
              <span>hello&#64;techkidsacademy.com</span>
            </div>
            <a href="https://wa.me/201108464037" target="_blank" class="contact-item contact-link">
              <span class="material-icons-round icon">phone</span>
              <span>+20 1108464037</span>
            </a>
            <div class="contact-item">
              <span class="material-icons-round icon">location_on</span>
              <span>{{ lang.t().footer.location }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Copyright Bar -->
      <div class="copyright-bar">
        <div class="container">
          <p>{{ lang.t().footer.copyright }}</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer-section {
      background: linear-gradient(180deg, #0A192F 0%, #071325 100%);
      color: #FFFFFF;
      padding-top: 4.5rem;
      position: relative;
    }
    .footer-container {
      display: grid;
      grid-template-columns: 3fr 2fr 2fr 2fr;
      gap: 2.5rem;
      padding-bottom: 4rem;
    }
    @media (max-width: 992px) {
      .footer-container {
        grid-template-columns: 1fr 1fr;
      }
    }
    @media (max-width: 640px) {
      .footer-container {
        grid-template-columns: 1fr;
        text-align: center;
      }
    }
    .brand-col {
      display: flex;
      flex-direction: column;
    }
    @media (max-width: 640px) {
      .brand-col { align-items: center; }
    }
    .tagline {
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.7);
      line-height: 1.6;
      margin-top: 1rem;
      margin-bottom: 1.5rem;
      max-width: 320px;
    }

    .social-row {
      display: flex;
      gap: 10px;
    }
    .social-btn {
      width: 40px; height: 40px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.08);
      color: rgba(255, 255, 255, 0.8);
      display: flex; align-items: center; justify-content: center;
      transition: all 0.25s ease;
      border: 1px solid rgba(255, 255, 255, 0.12);
    }
    .social-btn:hover {
      background: var(--secondary);
      border-color: var(--secondary);
      color: #FFFFFF;
      transform: translateY(-3px);
      box-shadow: 0 4px 15px rgba(0, 136, 255, 0.3);
    }
    .social-btn span { font-size: 20px; }

    .col-title {
      font-size: 1.05rem;
      font-weight: 700;
      color: #FFFFFF;
      margin-bottom: 1.25rem;
      letter-spacing: 0.3px;
    }
    .links-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .links-list a {
      font-size: 0.88rem;
      color: rgba(255, 255, 255, 0.65);
      transition: all 0.2s ease;
    }
    .links-list a:hover {
      color: #FFFFFF;
      padding-inline-start: 4px;
    }

    .contact-list {
      display: flex;
      flex-direction: column;
      gap: 0.9rem;
    }
    .contact-item {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.88rem;
      color: rgba(255, 255, 255, 0.65);
      transition: color 0.2s ease;
    }
    @media (max-width: 640px) {
      .contact-item { justify-content: center; }
    }
    .contact-item .icon {
      color: var(--secondary-light);
      font-size: 18px;
    }
    .contact-link:hover {
      color: #FFFFFF;
    }

    .copyright-bar {
      background: #050E1B;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding: 1.25rem 0;
      text-align: center;
      font-size: 0.82rem;
      color: rgba(255, 255, 255, 0.5);
    }
  `]
})
export class FooterComponent {
  lang = inject(LanguageService);
}
