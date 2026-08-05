import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="logo-container" [class.dark]="isDark">
      <!-- Mascot Avatar -->
      <div class="mascot-frame" [style.width.px]="iconSize" [style.height.px]="iconSize">
        <img
          src="assets/images/logo.png"
          alt="Tech Kids Academy"
          class="mascot-img"
          (error)="onImgError($event)"
        />
      </div>

      <!-- Text Logo Image -->
      <div class="logo-text-group">
        <img
          src="assets/images/logo_text.png"
          alt="Tech Kids Academy"
          class="brand-text-img"
          [style.height.px]="iconSize * 0.8"
        />
        @if (showSlogan) {
          <div class="slogan-row" [style.font-size.px]="fontSize * 0.32">
            <span class="bracket">&lt; </span>
            <span class="code-word">{{ lang.t().logoSlogan.code }} </span>
            <span class="today-word">{{ lang.t().logoSlogan.today }} </span>
            <span class="create-word">{{ lang.t().logoSlogan.create }} </span>
            <span class="tomorrow-word">{{ lang.t().logoSlogan.tomorrow }}</span>
            <span class="bracket"> /&gt;</span>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .logo-container {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      user-select: none;
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
    }
    .mascot-frame {
      border-radius: 0;
      overflow: visible;
      box-shadow: none !important;
      border: none !important;
      background: transparent !important;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .mascot-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      background: transparent !important;
    }
    .logo-text-group {
      display: flex;
      flex-direction: column;
      justify-content: center;
      background: transparent !important;
      margin-inline-start: 0;
    }
    .brand-text-img {
      width: auto;
      object-fit: contain;
      display: block;
      transition: filter 0.3s ease;
      background: transparent !important;
    }
    .dark .brand-text-img {
      filter: brightness(0) invert(1);
    }
    .slogan-row {
      font-weight: 700;
      margin-top: 3px;
      line-height: 1;
    }
    .bracket { color: #6BCB77; }
    .code-word { color: #A259FF; }
    .today-word { color: var(--primary); }
    .dark .today-word { color: #FFFFFF; }
    .create-word { color: #FF8C00; }
    .tomorrow-word { color: var(--primary); }
    .dark .tomorrow-word { color: #FFFFFF; }
  `]
})
export class LogoComponent {
  @Input() iconSize = 40;
  @Input() fontSize = 20;
  @Input() showSlogan = false;
  @Input() isDark = false;

  lang = inject(LanguageService);

  onImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/logo.png';
  }
}
