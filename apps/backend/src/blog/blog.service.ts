import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { BlogPost } from './entities/blog-post.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogPost)
    private readonly blogRepo: Repository<BlogPost>,
  ) {}

  findAll() {
    return this.blogRepo.find({ order: { createdAt: 'DESC' } });
  }

  findBySlug(slug: string) {
    return this.blogRepo.findOne({ where: { slug } });
  }

  create(dto: CreateBlogPostDto) {
    return this.blogRepo.save(this.blogRepo.create(dto));
  }

  async update(id: string, dto: UpdateBlogPostDto) {
    const post = await this.blogRepo.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException('Blog post not found');
    }

    Object.assign(post, dto);
    return this.blogRepo.save(post);
  }

  async remove(id: string) {
    const post = await this.blogRepo.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException('Blog post not found');
    }

    await this.blogRepo.remove(post);
    return { deleted: true };
  }
}
