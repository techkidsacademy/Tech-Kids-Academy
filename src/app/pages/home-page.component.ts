import { Component } from '@angular/core';
import { HeroComponent } from '../features/hero/hero.component';
import { StatsComponent } from '../features/stats/stats.component';
import { JourneyComponent } from '../features/journey/journey.component';
import { RoadmapComponent } from '../features/roadmap/roadmap.component';
import { InstructorsComponent } from '../features/instructors/instructors.component';
import { ProjectsComponent } from '../features/projects/projects.component';
import { FaqComponent } from '../features/faq/faq.component';
import { CtaComponent } from '../features/cta/cta.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HeroComponent,
    StatsComponent,
    JourneyComponent,
    RoadmapComponent,
    InstructorsComponent,
    ProjectsComponent,
    FaqComponent,
    CtaComponent,
  ],
  template: `
    <app-hero></app-hero>
    <app-stats></app-stats>
    <app-journey></app-journey>
    <app-roadmap></app-roadmap>
    <app-instructors></app-instructors>
    <app-projects></app-projects>
    <app-faq></app-faq>
    <app-cta></app-cta>
  `,
})
export class HomePageComponent {}
