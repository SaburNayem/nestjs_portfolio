import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { BlogPost } from '../blog/entities/blog-post.entity';
import { ContactMessage } from '../contacts/entities/contact-message.entity';
import { Project } from '../projects/entities/project.entity';
import { Skill } from '../skills/entities/skill.entity';
import { Testimonial } from '../testimonials/entities/testimonial.entity';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Project, Skill, BlogPost, Testimonial, ContactMessage]),
  ],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
