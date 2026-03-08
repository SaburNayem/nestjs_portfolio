export type Project = {
  id: string;
  title: string;
  slug: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  playStoreUrl?: string;
  githubUrl?: string;
  demoVideoUrl?: string;
  featured: boolean;
};

export type Skill = {
  id: string;
  name: string;
  category: string;
  proficiency: number;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  createdAt: string;
};

export type Testimonial = {
  id: string;
  clientName: string;
  role: string;
  quote: string;
  rating: number;
};

export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};
