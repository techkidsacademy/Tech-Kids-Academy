import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home-page.component').then(m => m.HomePageComponent),
  },
  {
    path: 'programs',
    loadComponent: () =>
      import('./pages/programs-page.component').then(m => m.ProgramsPageComponent),
  },
  {
    path: 'instructors',
    loadComponent: () =>
      import('./pages/instructors-page.component').then(m => m.InstructorsPageComponent),
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./pages/projects-page.component').then(m => m.ProjectsPageComponent),
  },

  {
    path: 'courses',
    loadComponent: () =>
      import('./pages/courses-page.component').then(m => m.CoursesPageComponent),
  },
  {
    path: 'program-details/:id',
    loadComponent: () =>
      import('./pages/program-details-page.component').then(m => m.ProgramDetailsPageComponent),
  },
  {
    path: 'program-details',
    redirectTo: 'program-details/1',
    pathMatch: 'full',
  },
  {
    path: 'faq',
    loadComponent: () =>
      import('./pages/faq-page.component').then(m => m.FaqPageComponent),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact-page.component').then(m => m.ContactPageComponent),
  },
  {
    path: 'roadmap',
    loadComponent: () =>
      import('./pages/roadmap-page.component').then(m => m.RoadmapPageComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
