import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { BlogPost } from '../blog/entities/blog-post.entity';
import { ContactMessage } from '../contacts/entities/contact-message.entity';
import { Project } from '../projects/entities/project.entity';
import { Skill } from '../skills/entities/skill.entity';
import { Testimonial } from '../testimonials/entities/testimonial.entity';

@Injectable()
export class SeedService {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
    @InjectRepository(Skill)
    private readonly skillRepo: Repository<Skill>,
    @InjectRepository(BlogPost)
    private readonly blogRepo: Repository<BlogPost>,
    @InjectRepository(Testimonial)
    private readonly testimonialRepo: Repository<Testimonial>,
    @InjectRepository(ContactMessage)
    private readonly contactRepo: Repository<ContactMessage>,
  ) {}

  async bootstrap() {
    await this.authService.createAdminIfNotExists(
      'admin@flutterfolio.dev',
      'Admin@12345',
      'Portfolio Admin',
    );

    if ((await this.skillRepo.count()) === 0) {
      await this.skillRepo.save([
        { name: 'Flutter', category: 'Mobile Development', proficiency: 95 },
        { name: 'Dart', category: 'Mobile Development', proficiency: 92 },
        { name: 'NestJS', category: 'Backend', proficiency: 88 },
        { name: 'Node.js', category: 'Backend', proficiency: 90 },
        { name: 'REST API', category: 'Backend', proficiency: 91 },
        { name: 'Firebase', category: 'Database', proficiency: 86 },
        { name: 'MongoDB', category: 'Database', proficiency: 84 },
        { name: 'PostgreSQL', category: 'Database', proficiency: 83 },
        { name: 'Git', category: 'Tools', proficiency: 93 },
        { name: 'Docker', category: 'Tools', proficiency: 80 },
        { name: 'Figma', category: 'Tools', proficiency: 82 },
        { name: 'Postman', category: 'Tools', proficiency: 89 },
      ]);
    }

    if ((await this.projectRepo.count()) === 0) {
      await this.projectRepo.save([
        {
          title: 'FitTrack Pro',
          slug: 'fittrack-pro',
          description:
            'A Flutter fitness tracker with workout plans, progress analytics, and Firebase auth.',
          technologies: ['Flutter', 'Dart', 'Firebase', 'NestJS'],
          imageUrl: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800',
          playStoreUrl: 'https://play.google.com/store',
          githubUrl: 'https://github.com',
          demoVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          featured: true,
        },
        {
          title: 'Foodly Delivery',
          slug: 'foodly-delivery',
          description:
            'Cross-platform food delivery app with real-time order updates and polished mobile UX.',
          technologies: ['Flutter', 'Dart', 'PostgreSQL', 'NestJS'],
          imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800',
          playStoreUrl: 'https://play.google.com/store',
          githubUrl: 'https://github.com',
          demoVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          featured: true,
        },
        {
          title: 'TaskPilot',
          slug: 'taskpilot',
          description:
            'Productivity app with Kanban boards, reminders, and offline-first sync capabilities.',
          technologies: ['Flutter', 'Hive', 'NestJS', 'MongoDB'],
          imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800',
          playStoreUrl: 'https://play.google.com/store',
          githubUrl: 'https://github.com',
          demoVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          featured: false,
        },
      ]);
    }

    if ((await this.blogRepo.count()) === 0) {
      await this.blogRepo.save([
        {
          title: 'State Management in Flutter: Practical Riverpod Patterns',
          slug: 'flutter-riverpod-patterns',
          excerpt: 'Battle-tested patterns to keep complex Flutter apps maintainable.',
          content:
            'Riverpod provides predictable state composition with minimal boilerplate. In production apps, structuring providers by domain and using immutable state models helps avoid side effects and improves testability.',
          tags: ['Flutter', 'Riverpod', 'Architecture'],
        },
        {
          title: 'Building Scalable APIs for Mobile Apps with NestJS',
          slug: 'nestjs-mobile-api-guide',
          excerpt: 'A backend architecture blueprint designed for Flutter clients.',
          content:
            'NestJS modules, DTO validation, and JWT auth make it straightforward to define clear API contracts. For mobile clients, design endpoints for pagination, resilient retries, and concise payloads.',
          tags: ['NestJS', 'API', 'Mobile'],
        },
      ]);
    }

    if ((await this.testimonialRepo.count()) === 0) {
      await this.testimonialRepo.save([
        {
          clientName: 'Sarah Ahmed',
          role: 'Startup Founder',
          quote:
            'Delivered a production-ready Flutter app faster than expected with excellent communication.',
          rating: 5,
        },
        {
          clientName: 'Michael Tan',
          role: 'Product Manager',
          quote:
            'Strong Flutter expertise and backend understanding. The app quality was outstanding.',
          rating: 5,
        },
      ]);
    }

    if ((await this.contactRepo.count()) === 0) {
      await this.contactRepo.save({
        name: 'Demo Client',
        email: 'client@example.com',
        phone: '+1 555 231 9911',
        message: 'We need a cross-platform app for our marketplace MVP.',
      });
    }

    return { seeded: true };
  }
}
