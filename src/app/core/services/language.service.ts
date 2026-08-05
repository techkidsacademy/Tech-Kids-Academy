import { Injectable, signal, computed, effect } from '@angular/core';
import { EN_TRANSLATIONS } from '../i18n/en';
import { AR_TRANSLATIONS } from '../i18n/ar';

export type LanguageCode = 'en' | 'ar';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  // Read initial language preference from localStorage, default to Arabic 'ar'
  private getSavedLang(): LanguageCode {
    if (typeof window !== 'undefined' && localStorage) {
      const saved = localStorage.getItem('app_lang');
      if (saved === 'ar' || saved === 'en') {
        return saved;
      }
    }
    return 'ar';
  }

  // Current language signal
  readonly currentLang = signal<LanguageCode>(this.getSavedLang());

  // Active translation dictionary
  readonly t = computed(() => (this.currentLang() === 'ar' ? AR_TRANSLATIONS : EN_TRANSLATIONS));

  // Direction & locale properties
  readonly isArabic = computed(() => this.currentLang() === 'ar');
  readonly textDir = computed(() => (this.isArabic() ? 'rtl' : 'ltr'));

  constructor() {
    // Automatically update HTML attributes and save preference on change
    effect(() => {
      const dir = this.textDir();
      const lang = this.currentLang();
      if (typeof window !== 'undefined' && localStorage) {
        localStorage.setItem('app_lang', lang);
      }
      document.documentElement.setAttribute('dir', dir);
      document.documentElement.setAttribute('lang', lang);
      document.title = this.t().appTitle;
    });
  }

  toggleLanguage(): void {
    this.currentLang.update((lang) => (lang === 'en' ? 'ar' : 'en'));
  }

  setLanguage(lang: LanguageCode): void {
    this.currentLang.set(lang);
  }
}
