import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepo: Repository<Project>,
  ) {}

  findAll() {
    return this.projectsRepo.find({ order: { createdAt: 'DESC' } });
  }

  findBySlug(slug: string) {
    return this.projectsRepo.findOne({ where: { slug } });
  }

  create(dto: CreateProjectDto) {
    return this.projectsRepo.save(this.projectsRepo.create(dto));
  }

  async update(id: string, dto: UpdateProjectDto) {
    const item = await this.projectsRepo.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException('Project not found');
    }

    Object.assign(item, dto);
    return this.projectsRepo.save(item);
  }

  async remove(id: string) {
    const item = await this.projectsRepo.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException('Project not found');
    }

    await this.projectsRepo.remove(item);
    return { deleted: true };
  }
}
