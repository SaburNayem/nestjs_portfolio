import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { Testimonial } from './entities/testimonial.entity';

@Injectable()
export class TestimonialsService {
  constructor(
    @InjectRepository(Testimonial)
    private readonly testimonialsRepo: Repository<Testimonial>,
  ) {}

  findAll() {
    return this.testimonialsRepo.find();
  }

  create(dto: CreateTestimonialDto) {
    return this.testimonialsRepo.save(this.testimonialsRepo.create(dto));
  }

  async update(id: string, dto: UpdateTestimonialDto) {
    const item = await this.testimonialsRepo.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException('Testimonial not found');
    }

    Object.assign(item, dto);
    return this.testimonialsRepo.save(item);
  }

  async remove(id: string) {
    const item = await this.testimonialsRepo.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException('Testimonial not found');
    }

    await this.testimonialsRepo.remove(item);
    return { deleted: true };
  }
}
