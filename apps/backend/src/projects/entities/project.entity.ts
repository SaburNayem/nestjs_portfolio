import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column('text')
  description: string;

  @Column('simple-array')
  technologies: string[];

  @Column()
  imageUrl: string;

  @Column({ nullable: true })
  playStoreUrl?: string;

  @Column({ nullable: true })
  githubUrl?: string;

  @Column({ nullable: true })
  demoVideoUrl?: string;

  @Column({ default: false })
  featured: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
