import { fallbackBlogPosts, fallbackProjects, fallbackSkills, fallbackTestimonials } from './fallback-data';
import { BlogPost, ContactPayload, Project, Skill, Testimonial } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

async function safeFetch<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${API_URL}${path}`, { cache: 'no-store' });
    if (!res.ok) {
      return fallback;
    }
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}

export function getProjects() {
  return safeFetch<Project[]>('/projects', fallbackProjects);
}

export function getSkills() {
  return safeFetch<Skill[]>('/skills', fallbackSkills);
}

export function getBlogPosts() {
  return safeFetch<BlogPost[]>('/blog-posts', fallbackBlogPosts);
}

export function getTestimonials() {
  return safeFetch<Testimonial[]>('/testimonials', fallbackTestimonials);
}

export async function sendContactMessage(payload: ContactPayload) {
  const res = await fetch(`${API_URL}/contact-messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Failed to send message');
  }

  return res.json();
}

export async function adminLogin(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error('Invalid credentials');
  }

  return res.json() as Promise<{ accessToken: string }>;
}

export async function getAdminMessages(token: string) {
  const res = await fetch(`${API_URL}/contact-messages`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to load messages');
  }

  return res.json();
}

export async function createAdminProject(token: string, payload: Omit<Project, 'id'>) {
  const res = await fetch(`${API_URL}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Failed to create project');
  }

  return res.json();
}
