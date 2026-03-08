'use client';

import { FormEvent, useState } from 'react';
import { adminLogin, createAdminProject, getAdminMessages } from '../../lib/api';

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: string;
};

const projectInitial = {
  title: '',
  slug: '',
  description: '',
  imageUrl: '',
  technologies: '',
  playStoreUrl: '',
  githubUrl: '',
  demoVideoUrl: '',
  featured: false,
};

export default function AdminPage() {
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('admin@flutterfolio.dev');
  const [password, setPassword] = useState('Admin@12345');
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [status, setStatus] = useState('');
  const [project, setProject] = useState(projectInitial);

  const login = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('');
    try {
      const res = await adminLogin(email, password);
      setToken(res.accessToken);
      const msg = await getAdminMessages(res.accessToken);
      setMessages(msg);
      setStatus('Logged in and messages loaded.');
    } catch {
      setStatus('Login failed.');
    }
  };

  const createProject = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) {
      setStatus('Login first.');
      return;
    }

    try {
      await createAdminProject(token, {
        title: project.title,
        slug: project.slug,
        description: project.description,
        imageUrl: project.imageUrl,
        technologies: project.technologies.split(',').map((x) => x.trim()),
        playStoreUrl: project.playStoreUrl || undefined,
        githubUrl: project.githubUrl || undefined,
        demoVideoUrl: project.demoVideoUrl || undefined,
        featured: project.featured,
      });
      setProject(projectInitial);
      setStatus('Project created successfully.');
    } catch {
      setStatus('Failed to create project.');
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 md:px-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="mt-2 text-sm text-[var(--subtle)]">Manage projects and review messages.</p>

      <section className="section-shell mt-6 rounded-2xl p-5">
        <h2 className="text-xl font-semibold">Admin Login</h2>
        <form className="mt-4 grid gap-3 md:grid-cols-2" onSubmit={login}>
          <input className="rounded-lg border border-cyan/30 bg-transparent p-3" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <input type="password" className="rounded-lg border border-cyan/30 bg-transparent p-3" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <button className="rounded-lg bg-cyan px-4 py-3 font-semibold text-ink md:col-span-2">Login</button>
        </form>
      </section>

      <section className="section-shell mt-6 rounded-2xl p-5">
        <h2 className="text-xl font-semibold">Create Project</h2>
        <form className="mt-4 grid gap-3 md:grid-cols-2" onSubmit={createProject}>
          <input required className="rounded-lg border border-cyan/30 bg-transparent p-3" placeholder="Title" value={project.title} onChange={(e) => setProject((p) => ({ ...p, title: e.target.value }))} />
          <input required className="rounded-lg border border-cyan/30 bg-transparent p-3" placeholder="Slug" value={project.slug} onChange={(e) => setProject((p) => ({ ...p, slug: e.target.value }))} />
          <input required className="rounded-lg border border-cyan/30 bg-transparent p-3 md:col-span-2" placeholder="Image URL" value={project.imageUrl} onChange={(e) => setProject((p) => ({ ...p, imageUrl: e.target.value }))} />
          <input required className="rounded-lg border border-cyan/30 bg-transparent p-3 md:col-span-2" placeholder="Technologies (comma separated)" value={project.technologies} onChange={(e) => setProject((p) => ({ ...p, technologies: e.target.value }))} />
          <textarea required className="rounded-lg border border-cyan/30 bg-transparent p-3 md:col-span-2" rows={4} placeholder="Description" value={project.description} onChange={(e) => setProject((p) => ({ ...p, description: e.target.value }))} />
          <input className="rounded-lg border border-cyan/30 bg-transparent p-3" placeholder="Play Store URL" value={project.playStoreUrl} onChange={(e) => setProject((p) => ({ ...p, playStoreUrl: e.target.value }))} />
          <input className="rounded-lg border border-cyan/30 bg-transparent p-3" placeholder="GitHub URL" value={project.githubUrl} onChange={(e) => setProject((p) => ({ ...p, githubUrl: e.target.value }))} />
          <input className="rounded-lg border border-cyan/30 bg-transparent p-3 md:col-span-2" placeholder="Demo Video URL" value={project.demoVideoUrl} onChange={(e) => setProject((p) => ({ ...p, demoVideoUrl: e.target.value }))} />
          <label className="md:col-span-2">
            <input type="checkbox" checked={project.featured} onChange={(e) => setProject((p) => ({ ...p, featured: e.target.checked }))} /> Featured project
          </label>
          <button className="rounded-lg bg-cyan px-4 py-3 font-semibold text-ink md:col-span-2">Save Project</button>
        </form>
      </section>

      <section className="section-shell mt-6 rounded-2xl p-5">
        <h2 className="text-xl font-semibold">Contact Messages</h2>
        <div className="mt-4 space-y-3">
          {messages.map((message) => (
            <article key={message.id} className="rounded-lg border border-cyan/30 p-3">
              <p className="font-semibold">{message.name} ({message.email})</p>
              <p className="text-sm text-[var(--subtle)]">{message.phone || 'No phone provided'}</p>
              <p className="mt-2 text-sm">{message.message}</p>
            </article>
          ))}
          {messages.length === 0 && <p className="text-sm text-[var(--subtle)]">No messages loaded.</p>}
        </div>
      </section>

      {status && <p className="mt-4 text-sm text-cyan">{status}</p>}
    </main>
  );
}
