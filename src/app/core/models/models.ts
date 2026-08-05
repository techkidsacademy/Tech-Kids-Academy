export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  ageRange: string;
  icon: string;
  color: string;
  lightColor: string;
}

export interface SkillCategory {
  categoryName: string;
  skills: string[];
}

export interface InstructorProject {
  title: string;
  description: string;
  appType?: string;
  techStack: string[];
}

export interface Instructor {
  id: string;
  name: string;
  title: string;
  headline: string;
  bio: string;
  imagePath: string;
  rating: number;
  studentsCount: number;
  coursesCount: number;
  linkedInUrl?: string;
  githubUrl?: string;
  skillCategories: SkillCategory[];
  projects: InstructorProject[];
}

export interface StudentProject {
  title: string;
  category: string;
  icon: string;
  color: string;
  gradientEnd: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface JourneyStep {
  stepNumber: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}
