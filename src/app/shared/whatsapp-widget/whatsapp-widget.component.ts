import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-whatsapp-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="wa-container" [class.is-rtl]="lang.isArabic()">
      <!-- Direct Floating Link Button (Far Right, Green, No Popup) -->
      <div class="wa-button-wrapper">
        <a 
          [href]="getWhatsappUrl()" 
          target="_blank" 
          rel="noopener noreferrer"
          class="wa-float-btn" 
          [attr.title]="lang.t().whatsapp.tooltip"
          aria-label="WhatsApp Contact"
        >
          <!-- SVG Original WhatsApp Icon -->
          <svg class="wa-btn-icon" viewBox="0 0 32 32" width="26" height="26" fill="#FFFFFF">
            <path d="M16 2a13 13 0 0 0-11.26 19.5L3 29l7.73-1.68A13 13 0 1 0 16 2zm0 24a10.92 10.92 0 0 1-5.57-1.52l-.4-.24-4.58 1 1.22-4.46-.26-.42A10.91 10.91 0 1 1 16 26zm6-8.15c-.33-.16-1.95-.96-2.25-1.07s-.52-.17-.74.16-.86 1.07-1.05 1.29-.39.24-.72.08a9.09 9.09 0 0 1-2.67-1.65 10.06 10.06 0 0 1-1.85-2.3c-.19-.33 0-.5.16-.66s.33-.39.5-.58a2.26 2.26 0 0 0 .33-.55.61.61 0 0 0 0-.58c-.08-.16-.74-1.78-1.02-2.44s-.54-.56-.74-.57h-.63a1.21 1.21 0 0 0-.88.41A3.7 3.7 0 0 0 9 12.33a6.43 6.43 0 0 0 1.35 3.42A14.77 14.77 0 0 0 16 21.08a16.64 16.64 0 0 0 1.88.7c.8.25 1.53.21 2.11.13a3.46 3.46 0 0 0 2.27-1.6 2.8 2.8 0 0 0 .2-1.6c-.09-.16-.33-.25-.66-.41z"/>
          </svg>
        </a>

        <!-- Tooltip Label on Hover -->
        <span class="wa-tooltip-label">
          {{ lang.t().whatsapp.chatPrompt }}
        </span>
      </div>
    </div>
  `,
  styles: [`
    .wa-container {
      position: fixed;
      bottom: 20px;
      right: 20px !important;
      left: auto !important;
      z-index: 99999;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      font-family: inherit;
    }

    .wa-container.is-rtl {
      right: 20px !important;
      left: auto !important;
      align-items: flex-end;
    }

    /* Floating Button */
    .wa-button-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      gap: 12px;
      flex-direction: row-reverse;
    }

    .wa-float-btn {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: #25D366;
      border: none;
      box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      transition: transform 0.25s ease, box-shadow 0.25s ease;
      text-decoration: none;
      outline: none;
    }

    .wa-float-btn:hover {
      transform: scale(1.08);
      box-shadow: 0 10px 25px rgba(37, 211, 102, 0.6);
    }

    .wa-float-btn:active {
      transform: scale(0.95);
    }

    .wa-btn-icon {
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.12));
      position: relative;
      z-index: 2;
    }

    /* Tooltip label */
    .wa-tooltip-label {
      background: rgba(15, 23, 42, 0.88);
      backdrop-filter: blur(12px);
      color: #FFFFFF;
      font-size: 0.82rem;
      font-weight: 600;
      padding: 7px 14px;
      border-radius: 20px;
      white-space: nowrap;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.1);
      opacity: 0;
      pointer-events: none;
      transform: translateX(10px);
      transition: opacity 0.3s ease, transform 0.3s ease;
    }

    .wa-button-wrapper:hover .wa-tooltip-label {
      opacity: 1;
      transform: translateX(0);
    }
  `]
})
export class WhatsappWidgetComponent {
  lang = inject(LanguageService);

  readonly whatsappNumber = '201108464037';

  getWhatsappUrl(): string {
    const text = this.lang.isArabic() 
      ? 'مرحباً، أود الاستفسار عن كورس/برنامج في أكاديمية تيك كيدز'
      : 'Hello, I would like to inquire about courses at Tech Kids Academy';
    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(text)}`;
  }
}
