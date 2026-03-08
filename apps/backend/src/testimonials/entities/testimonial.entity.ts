import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('testimonials')
export class Testimonial {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  clientName: string;

  @Column()
  role: string;

  @Column('text')
  quote: string;

  @Column({ default: 5 })
  rating: number;
}
