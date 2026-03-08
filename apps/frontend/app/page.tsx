'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import ThemeToggle from '../components/theme-toggle';
import {
  getBlogPosts,
  getProjects,
  getSkills,
  getTestimonials,
  sendContactMessage,
} from '../lib/api';
import { BlogPost, Project, Skill, Testimonial } from '../lib/types';
import { fallbackBlogPosts, fallbackProjects, fallbackSkills, fallbackTestimonials } from '../lib/fallback-data';

const services = [
  'Flutter Mobile App Development',
  'Cross-platform App Development',
  'Backend API Development (NestJS)',
  'UI/UX for Mobile Apps',
];

const experiences = [
  { year: '2025 - Present', title: 'Freelance Flutter Developer', note: 'Shipped apps for startups and SMEs.' },
  { year: '2024 - 2025', title: 'Mobile Developer Intern', note: 'Built production widgets and backend integrations.' },
  { year: '2023 - 2024', title: 'Independent Projects', note: 'Designed and released Flutter showcase apps.' },
];

const education = [
  'BSc in Computer Science',
  'Flutter & Dart Advanced Certification',
  'NestJS Backend Architecture Certification',
];

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [skills, setSkills] = useState<Skill[]>(fallbackSkills);
  const [blogs, setBlogs] = useState<BlogPost[]>(fallbackBlogPosts);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);
  const [selectedTech, setSelectedTech] = useState<string>('All');
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', message: '' });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    Promise.all([getProjects(), getSkills(), getBlogPosts(), getTestimonials()]).then(
      ([p, s, b, t]) => {
        setProjects(p);
        setSkills(s);
        setBlogs(b);
        setTestimonials(t);
      },
    );
  }, []);

  const allTech = ['All', ...Array.from(new Set(projects.flatMap((p) => p.technologies)))];

  const filteredProjects =
    selectedTech === 'All'
      ? projects
      : projects.filter((project) => project.technologies.includes(selectedTech));

  const groupedSkills = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    acc[skill.category] ??= [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const submitContact = async (event: FormEvent) => {
    event.preventDefault();
    setSending(true);
    setStatus('');

    try {
      await sendContactMessage(formState);
      setStatus('Message sent successfully.');
      setFormState({ name: '', email: '', phone: '', message: '' });
    } catch {
      setStatus('Could not send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-4 pb-24 pt-8 md:px-8">
      <section className="section-shell relative overflow-hidden rounded-3xl p-6 shadow-neon md:p-10">
        <div className="absolute -right-8 top-10 h-40 w-40 animate-drift rounded-full bg-cyan/20 blur-2xl" />
        <div className="absolute -left-8 bottom-0 h-36 w-36 animate-drift rounded-full bg-ember/20 blur-2xl" />
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-[var(--subtle)]">Flutter Developer Workspace</p>
            <h1 className="mt-2 text-4xl font-bold md:text-6xl">Sabur Nayem</h1>
            <h2 className="mt-3 text-xl font-semibold text-cyan md:text-2xl">Flutter Mobile App Developer</h2>
            <p className="mt-4 max-w-xl text-[var(--subtle)]">
              I build polished cross-platform apps with Flutter and scalable APIs with NestJS. Focused on beautiful UX, speed, and maintainable architecture.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#apps" className="rounded-full bg-cyan px-5 py-3 text-sm font-bold text-ink">View Apps</a>
              <a href="#contact" className="rounded-full border border-cyan px-5 py-3 text-sm font-bold">Contact Me</a>
              <Link href="/resume.txt" className="rounded-full border border-ember px-5 py-3 text-sm font-bold">Download Resume</Link>
              <ThemeToggle />
            </div>
          </div>
          <div className="relative mx-auto h-64 w-44 rounded-[2.5rem] border border-cyan/40 bg-ink p-3">
            <div className="h-full rounded-[2rem] bg-gradient-to-b from-cyan/25 to-ember/25 p-4">
              <div className="mb-3 h-8 rounded-xl bg-white/15" />
              <div className="mb-3 h-16 rounded-2xl bg-white/10" />
              <div className="h-24 rounded-2xl bg-white/10" />
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section-shell mt-8 rounded-3xl p-6 md:p-8">
        <h3 className="text-2xl font-bold">About Me</h3>
        <p className="mt-3 text-[var(--subtle)]">
          My journey started with mobile-first product design and evolved into full-stack app delivery. I specialize in Flutter, craft clean interfaces, and build NestJS APIs that keep apps reliable at scale.
        </p>
      </section>

      <section id="skills" className="mt-8">
        <h3 className="mb-4 text-2xl font-bold">Skills</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(groupedSkills).map(([category, items]) => (
            <div key={category} className="section-shell rounded-2xl p-5">
              <h4 className="text-lg font-semibold text-cyan">{category}</h4>
              <div className="mt-4 space-y-3">
                {items.map((skill) => (
                  <div key={skill.id}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span>{skill.name}</span>
                      <span className="text-[var(--subtle)]">{skill.proficiency}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-gradient-to-r from-cyan to-emerald-300" style={{ width: `${skill.proficiency}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="apps" className="mt-8">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <h3 className="mr-4 text-2xl font-bold">Mobile Apps Portfolio</h3>
          {allTech.map((tech) => (
            <button
              key={tech}
              onClick={() => setSelectedTech(tech)}
              className={`rounded-full px-3 py-1 text-sm ${selectedTech === tech ? 'bg-cyan text-ink' : 'border border-cyan/40'}`}
            >
              {tech}
            </button>
          ))}
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {filteredProjects.map((project) => (
            <motion.article key={project.id} whileHover={{ y: -6 }} className="section-shell overflow-hidden rounded-2xl">
              <div className="relative h-52 w-full">
                <Image src={project.imageUrl} alt={project.title} fill className="object-cover" />
              </div>
              <div className="p-5">
                <h4 className="text-xl font-semibold">{project.title}</h4>
                <p className="mt-2 text-[var(--subtle)]">{project.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="rounded-full border border-cyan/40 px-2 py-1 text-xs">{tech}</span>
                  ))}
                </div>
                <div className="mt-4 flex gap-3 text-sm font-semibold text-cyan">
                  {project.playStoreUrl && <a href={project.playStoreUrl} target="_blank">Google Play</a>}
                  {project.githubUrl && <a href={project.githubUrl} target="_blank">GitHub</a>}
                  {project.demoVideoUrl && <a href={project.demoVideoUrl} target="_blank">Demo</a>}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="section-shell rounded-2xl p-6">
          <h3 className="text-2xl font-bold">Services</h3>
          <ul className="mt-3 space-y-2 text-[var(--subtle)]">
            {services.map((service) => (
              <li key={service}>- {service}</li>
            ))}
          </ul>
        </div>
        <div className="section-shell rounded-2xl p-6">
          <h3 className="text-2xl font-bold">Experience</h3>
          <div className="mt-4 space-y-4">
            {experiences.map((item) => (
              <div key={item.title} className="border-l-2 border-cyan/50 pl-4">
                <p className="text-sm text-cyan">{item.year}</p>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-[var(--subtle)]">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="section-shell rounded-2xl p-6">
          <h3 className="text-2xl font-bold">Education</h3>
          <ul className="mt-3 space-y-2 text-[var(--subtle)]">
            {education.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>
        <div className="section-shell rounded-2xl p-6">
          <h3 className="text-2xl font-bold">Testimonials</h3>
          <div className="no-scrollbar mt-4 flex gap-4 overflow-x-auto pb-2">
            {testimonials.map((item) => (
              <div key={item.id} className="min-w-[260px] rounded-xl border border-cyan/30 p-4">
                <p className="text-sm text-[var(--subtle)]">"{item.quote}"</p>
                <p className="mt-3 font-semibold">{item.clientName}</p>
                <p className="text-sm text-cyan">{item.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell mt-8 rounded-2xl p-6">
        <h3 className="text-2xl font-bold">Blog</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {blogs.map((post) => (
            <article key={post.id} className="rounded-xl border border-cyan/30 p-4">
              <h4 className="text-lg font-semibold">{post.title}</h4>
              <p className="mt-2 text-sm text-[var(--subtle)]">{post.excerpt}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-cyan/20 px-2 py-1 text-xs text-cyan">#{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="section-shell mt-8 rounded-2xl p-6">
        <h3 className="text-2xl font-bold">Contact</h3>
        <p className="mt-2 text-[var(--subtle)]">Email: sabur.dev@example.com | Phone: +1 555 010 0091</p>
        <form onSubmit={submitContact} className="mt-4 grid gap-3 md:grid-cols-2">
          <input
            required
            value={formState.name}
            onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Name"
            className="rounded-lg border border-cyan/30 bg-transparent p-3"
          />
          <input
            required
            type="email"
            value={formState.email}
            onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))}
            placeholder="Email"
            className="rounded-lg border border-cyan/30 bg-transparent p-3"
          />
          <input
            value={formState.phone}
            onChange={(e) => setFormState((prev) => ({ ...prev, phone: e.target.value }))}
            placeholder="Phone"
            className="rounded-lg border border-cyan/30 bg-transparent p-3 md:col-span-2"
          />
          <textarea
            required
            minLength={10}
            value={formState.message}
            onChange={(e) => setFormState((prev) => ({ ...prev, message: e.target.value }))}
            placeholder="Message"
            rows={5}
            className="rounded-lg border border-cyan/30 bg-transparent p-3 md:col-span-2"
          />
          <button disabled={sending} className="rounded-lg bg-cyan px-4 py-3 font-semibold text-ink md:col-span-2">
            {sending ? 'Sending...' : 'Send Message'}
          </button>
          {status && <p className="text-sm text-cyan md:col-span-2">{status}</p>}
        </form>
      </section>
    </main>
  );
}
