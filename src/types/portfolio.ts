export type ProjectCategory = 'Cliente' | 'Spec & Concept' | 'Acadêmico' | string;

export interface CaseStudySection {
  title: string;
  subtitle?: string;
  description: string;
  keyPoints?: string[];
  images?: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  client?: string;
  credits?: string;
  externalUrl?: string;
  year: string;

  role: string;
  summary: string;
  tags: string[];
  featured: boolean;
  hideFromGallery?: boolean; // If true, exclude from all project grids and featured sections
  coverImage: string;
  images: string[];
  videoUrl?: string; // Continuous loop video / GIF if present
  embedUrl?: string; // External video iframe embed URL
  colorPalette?: string[];
  challenge: {
    problem: string;
    objectives: string[];
  };
  concept: {
    theme: string;
    narrative: string;
    visualElements: string[];
  };
  process: {
    steps: string[];
    details: string;
    toolsUsed: string[];
  };
  results: {
    metrics?: string[];
    impact: string;
    deliverables: string[];
  };
}
