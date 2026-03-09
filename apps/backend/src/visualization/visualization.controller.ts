import { Controller, Get } from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';

@Controller('portfolio')
export class VisualizationController {
  @Public()
  @Get()
  render() {
    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Flutter Portfolio Visualization</title>
  <style>
    :root {
      --bg: #081520;
      --panel: #122636;
      --text: #e8f5ff;
      --subtle: #93aabc;
      --primary: #22d3ee;
      --accent: #ff8a65;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: Segoe UI, Arial, sans-serif;
      background: radial-gradient(circle at 5% 10%, #14324a, var(--bg));
      color: var(--text);
    }
    .wrap { max-width: 1100px; margin: 0 auto; padding: 22px; }
    .hero {
      background: linear-gradient(130deg, rgba(34,211,238,0.12), rgba(255,138,101,0.12));
      border: 1px solid rgba(34,211,238,0.25);
      border-radius: 18px;
      padding: 22px;
      margin-bottom: 18px;
    }
    h1,h2,h3 { margin: 0 0 10px; }
    p { margin: 0; color: var(--subtle); }
    .grid { display: grid; gap: 14px; }
    .g2 { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
    .card {
      background: var(--panel);
      border: 1px solid rgba(34,211,238,0.2);
      border-radius: 14px;
      padding: 14px;
    }
    .tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
    .tag {
      font-size: 12px;
      padding: 3px 8px;
      border: 1px solid rgba(34,211,238,0.35);
      border-radius: 999px;
      color: #c9f6ff;
    }
    .links { margin-top: 10px; display: flex; gap: 10px; }
    a { color: var(--primary); text-decoration: none; }
    .section { margin-top: 16px; }
    .muted { color: var(--subtle); font-size: 13px; }
    .bar { height: 8px; background: rgba(255,255,255,.08); border-radius: 999px; overflow: hidden; }
    .fill { height: 100%; background: linear-gradient(90deg, var(--primary), #6ee7b7); }
    .err { color: #fecaca; }
  </style>
</head>
<body>
  <div class="wrap">
    <section class="hero">
      <h1>Sabur Nayem</h1>
      <h2>Flutter Mobile App Developer</h2>
      <p>Live portfolio visualization powered by your NestJS API.</p>
      <p class="muted" style="margin-top:8px">Endpoints: /api/projects, /api/skills, /api/blog-posts, /api/testimonials</p>
    </section>

    <section class="section">
      <h3>Projects</h3>
      <div id="projects" class="grid g2"></div>
    </section>

    <section class="section">
      <h3>Skills</h3>
      <div id="skills" class="grid g2"></div>
    </section>

    <section class="section">
      <h3>Blog</h3>
      <div id="blogs" class="grid g2"></div>
    </section>

    <section class="section">
      <h3>Testimonials</h3>
      <div id="testimonials" class="grid g2"></div>
    </section>
  </div>

  <script>
    const qs = (s) => document.querySelector(s);
    const esc = (v) => String(v ?? '').replace(/[&<>\"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));

    const api = {
      projects: '/api/projects',
      skills: '/api/skills',
      blogs: '/api/blog-posts',
      testimonials: '/api/testimonials'
    };

    function card(html) {
      return '<article class="card">' + html + '</article>';
    }

    async function load() {
      try {
        const [projects, skills, blogs, testimonials] = await Promise.all([
          fetch(api.projects).then(r => r.json()),
          fetch(api.skills).then(r => r.json()),
          fetch(api.blogs).then(r => r.json()),
          fetch(api.testimonials).then(r => r.json())
        ]);

        qs('#projects').innerHTML = projects.map(p => card(
          '<h3>' + esc(p.title) + '</h3>' +
          '<p>' + esc(p.description) + '</p>' +
          '<div class="tags">' + (p.technologies || []).map(t => '<span class="tag">' + esc(t) + '</span>').join('') + '</div>' +
          '<div class="links">' +
            (p.playStoreUrl ? '<a href="' + esc(p.playStoreUrl) + '" target="_blank">Play Store</a>' : '') +
            (p.githubUrl ? '<a href="' + esc(p.githubUrl) + '" target="_blank">GitHub</a>' : '') +
            (p.demoVideoUrl ? '<a href="' + esc(p.demoVideoUrl) + '" target="_blank">Demo</a>' : '') +
          '</div>'
        )).join('') || card('<p class="muted">No projects found.</p>');

        const skillsByCategory = skills.reduce((acc, s) => {
          (acc[s.category] ||= []).push(s);
          return acc;
        }, {});

        qs('#skills').innerHTML = Object.entries(skillsByCategory).map(([cat, items]) => card(
          '<h3>' + esc(cat) + '</h3>' +
          items.map(i =>
            '<div style="margin-top:8px">' +
              '<div class="muted">' + esc(i.name) + ' - ' + esc(i.proficiency) + '%</div>' +
              '<div class="bar"><div class="fill" style="width:' + Math.max(0, Math.min(100, Number(i.proficiency) || 0)) + '%"></div></div>' +
            '</div>'
          ).join('')
        )).join('') || card('<p class="muted">No skills found.</p>');

        qs('#blogs').innerHTML = blogs.map(b => card(
          '<h3>' + esc(b.title) + '</h3>' +
          '<p>' + esc(b.excerpt) + '</p>' +
          '<div class="tags">' + (b.tags || []).map(t => '<span class="tag">#' + esc(t) + '</span>').join('') + '</div>'
        )).join('') || card('<p class="muted">No blog posts found.</p>');

        qs('#testimonials').innerHTML = testimonials.map(t => card(
          '<h3>' + esc(t.clientName) + '</h3>' +
          '<p class="muted">' + esc(t.role) + '</p>' +
          '<p style="margin-top:8px">"' + esc(t.quote) + '"</p>'
        )).join('') || card('<p class="muted">No testimonials found.</p>');
      } catch (e) {
        const msg = '<article class="card err"><p>Failed to load data from API.</p></article>';
        qs('#projects').innerHTML = msg;
        qs('#skills').innerHTML = msg;
        qs('#blogs').innerHTML = msg;
        qs('#testimonials').innerHTML = msg;
      }
    }

    load();
  </script>
</body>
</html>`;
  }
}
