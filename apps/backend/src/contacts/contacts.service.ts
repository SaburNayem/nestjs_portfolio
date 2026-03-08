import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';
import { ContactMessage } from './entities/contact-message.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(ContactMessage)
    private readonly contactsRepo: Repository<ContactMessage>,
  ) {}

  create(dto: CreateContactMessageDto) {
    return this.contactsRepo.save(this.contactsRepo.create(dto));
  }

  findAll() {
    return this.contactsRepo.find({ order: { createdAt: 'DESC' } });
  }

  async remove(id: string) {
    const message = await this.contactsRepo.findOne({ where: { id } });
    if (!message) {
      throw new NotFoundException('Message not found');
    }

    await this.contactsRepo.remove(message);
    return { deleted: true };
  }
}
