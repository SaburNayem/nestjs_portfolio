# NestJS + Next.js Flutter Developer Portfolio

Full-stack developer portfolio with:
- NestJS backend API + admin authentication
- Next.js frontend with modern Flutter-focused design
- PostgreSQL-ready TypeORM models
- Contact form persistence, blog, testimonials, and project management

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Configure backend env:
```bash
cp apps/backend/.env.example apps/backend/.env
```

3. Run both apps:
```bash
npm run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:4000/api
- Admin seed route (dev): POST http://localhost:4000/api/seed/bootstrap

Default admin (from seed):
- email: admin@flutterfolio.dev
- password: Admin@12345
