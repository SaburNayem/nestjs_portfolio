import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill } from './entities/skill.entity';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillsRepo: Repository<Skill>,
  ) {}

  findAll() {
    return this.skillsRepo.find({ order: { category: 'ASC', proficiency: 'DESC' } });
  }

  create(dto: CreateSkillDto) {
    return this.skillsRepo.save(this.skillsRepo.create(dto));
  }

  async update(id: string, dto: UpdateSkillDto) {
    const skill = await this.skillsRepo.findOne({ where: { id } });
    if (!skill) {
      throw new NotFoundException('Skill not found');
    }

    Object.assign(skill, dto);
    return this.skillsRepo.save(skill);
  }

  async remove(id: string) {
    const skill = await this.skillsRepo.findOne({ where: { id } });
    if (!skill) {
      throw new NotFoundException('Skill not found');
    }

    await this.skillsRepo.remove(skill);
    return { deleted: true };
  }
}
