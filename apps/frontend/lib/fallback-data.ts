import { BlogPost, Project, Skill, Testimonial } from './types';

export const fallbackProjects: Project[] = [
  {
    id: 'p1',
    title: 'FitTrack Pro',
    slug: 'fittrack-pro',
    description: 'A Flutter fitness tracker with real-time health analytics and social challenges.',
    technologies: ['Flutter', 'Dart', 'Firebase', 'NestJS'],
    imageUrl: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=900',
    playStoreUrl: 'https://play.google.com/store',
    githubUrl: 'https://github.com',
    demoVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    featured: true,
  },
  {
    id: 'p2',
    title: 'Foodly Delivery',
    slug: 'foodly-delivery',
    description: 'High-performance food delivery app with order tracking and in-app wallet.',
    technologies: ['Flutter', 'Dart', 'PostgreSQL', 'NestJS'],
    imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=900',
    playStoreUrl: 'https://play.google.com/store',
    githubUrl: 'https://github.com',
    demoVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    featured: true,
  },
];

export const fallbackSkills: Skill[] = [
  { id: 's1', name: 'Flutter', category: 'Mobile Development', proficiency: 95 },
  { id: 's2', name: 'Dart', category: 'Mobile Development', proficiency: 92 },
  { id: 's3', name: 'NestJS', category: 'Backend', proficiency: 88 },
  { id: 's4', name: 'REST API', category: 'Backend', proficiency: 90 },
  { id: 's5', name: 'MongoDB', category: 'Database', proficiency: 84 },
  { id: 's6', name: 'PostgreSQL', category: 'Database', proficiency: 83 },
  { id: 's7', name: 'Docker', category: 'Tools', proficiency: 80 },
  { id: 's8', name: 'Figma', category: 'Tools', proficiency: 82 },
];

export const fallbackBlogPosts: BlogPost[] = [
  {
    id: 'b1',
    title: 'Flutter Performance Checklist for Production Apps',
    slug: 'flutter-performance-checklist',
    excerpt: 'A practical checklist to optimize startup time and frame stability.',
    content: 'Use const widgets, profile in release mode, and defer heavy I/O.',
    tags: ['Flutter', 'Performance'],
    createdAt: new Date().toISOString(),
  },
];

export const fallbackTestimonials: Testimonial[] = [
  {
    id: 't1',
    clientName: 'Sarah Ahmed',
    role: 'Startup Founder',
    quote: 'Delivered a clean Flutter app with great communication and speed.',
    rating: 5,
  },
];
