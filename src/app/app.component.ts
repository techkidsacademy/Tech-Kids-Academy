import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LanguageService } from './core/services/language.service';
import { NavbarComponent } from './features/navbar/navbar.component';
import { FooterComponent } from './features/footer/footer.component';
import { WhatsappWidgetComponent } from './shared/whatsapp-widget/whatsapp-widget.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    WhatsappWidgetComponent,
  ],
  template: `
    <div [attr.dir]="lang.textDir()" [class.rtl-mode]="lang.isArabic()">
      <!-- Sticky Glassmorphic Navbar -->
      <app-navbar></app-navbar>

      <!-- Routed Page Content -->
      <main>
        <router-outlet></router-outlet>
      </main>

      <!-- Footer -->
      <app-footer></app-footer>

      <!-- Floating WhatsApp Widget -->
      <app-whatsapp-widget></app-whatsapp-widget>
    </div>
  `
})
export class AppComponent {
  lang = inject(LanguageService);
}

