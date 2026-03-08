import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('blog_posts')
export class BlogPost {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column('text')
  excerpt: string;

  @Column('text')
  content: string;

  @Column('simple-array')
  tags: string[];

  @CreateDateColumn()
  createdAt: Date;
}
