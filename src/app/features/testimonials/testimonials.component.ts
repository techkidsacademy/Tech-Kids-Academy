import { Component, inject, signal, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { SectionTitleComponent } from '../../shared/section-title/section-title.component';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent],
  template: `
    <section id="testimonials" class="section-padding testimonials-section">
      <div class="container">
        <app-section-title
          [title]="lang.t().testimonialsSection.title"
          [subtitle]="lang.t().testimonialsSection.subtitle"
          accentColor="#FF5722">
        </app-section-title>

        <!-- Carousel -->
        <div class="carousel-container">
          @for (item of sampleTestimonials; track item.parentName; let i = $index) {
            @if (i === activeIndex()) {
              <div class="testimonial-card">
                <!-- Rating Stars -->
                <div class="stars-row">
                  @for (star of [1,2,3,4,5]; track star) {
                    <span class="material-icons-round star">star</span>
                  }
                  <span class="rating-num">{{ item.rating }}</span>
                </div>

                <!-- Review Text -->
                <p class="review-text">"{{ item.review }}"</p>

                <!-- Parent Info -->
                <div class="author-row">
                  <div class="avatar-box">
                    <span>{{ item.initials }}</span>
                  </div>
                  <div class="author-meta">
                    <h4>{{ item.parentName }}</h4>
                    <span>{{ item.childName }}</span>
                  </div>
                </div>
              </div>
            }
          }

          <!-- Pagination Dots -->
          <div class="dots-row">
            @for (item of sampleTestimonials; track item.parentName; let i = $index) {
              <button
                class="dot"
                [class.active]="i === activeIndex()"
                (click)="setActive(i)">
              </button>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .testimonials-section { background: #FFFFFF; }
    .carousel-container {
      max-width: 760px;
      margin: 3.5rem auto 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .testimonial-card {
      width: 100%;
      background: #FFFFFF;
      border-radius: 24px;
      border: 1px solid var(--border-color);
      padding: 2.5rem;
      box-shadow: 0 12px 32px rgba(10, 25, 47, 0.06);
      animation: fadeIn 0.4s ease;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .stars-row {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-bottom: 1.25rem;
    }
    .star { color: var(--accent); font-size: 20px; }
    .rating-num { font-weight: 700; font-size: 0.9rem; margin-left: 6px; color: var(--text-primary); }

    .review-text {
      font-size: 1.05rem;
      font-style: italic;
      color: var(--text-secondary);
      line-height: 1.7;
      margin-bottom: 1.75rem;
    }

    .author-row {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .avatar-box {
      width: 46px; height: 46px;
      border-radius: 14px;
      background: var(--grad-primary);
      color: #FFFFFF;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
    }
    .author-meta h4 {
      font-size: 1rem;
      font-weight: 700;
      color: var(--primary);
    }
    .author-meta span {
      font-size: 0.82rem;
      color: var(--secondary);
      font-weight: 600;
    }

    .dots-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 2rem;
    }
    .dot {
      width: 10px; height: 10px;
      border-radius: 5px;
      background: rgba(10, 25, 47, 0.15);
      transition: all 0.3s ease;
    }
    .dot.active {
      width: 32px;
      background: var(--primary);
    }
  `]
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  lang = inject(LanguageService);
  activeIndex = signal(0);
  private timer: any;

  sampleTestimonials = [
    {
      parentName: 'Sarah Ahmed',
      childName: 'Omar, Age 10',
      review: 'Tech Kids Academy transformed my son\'s relationship with technology. He went from playing games all day to building his own! The instructors are incredibly patient and skilled.',
      rating: 5,
      initials: 'SA',
    },
    {
      parentName: 'Mohammad Hassan',
      childName: 'Layla, Age 12',
      review: 'My daughter now dreams of becoming a software engineer. The Python course gave her confidence to code independently. Worth every penny!',
      rating: 5,
      initials: 'MH',
    },
    {
      parentName: 'Fatima Al-Rashid',
      childName: 'Youssef, Age 8',
      review: 'The Scratch course was perfect for my 8-year-old. He creates amazing animations and can\'t wait for his next class. The curriculum is thoughtfully designed.',
      rating: 5,
      initials: 'FR',
    },
  ];

  ngOnInit(): void {
    this.timer = setInterval(() => {
      this.activeIndex.update((idx) => (idx + 1) % this.sampleTestimonials.length);
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  setActive(idx: number): void {
    this.activeIndex.set(idx);
  }
}
