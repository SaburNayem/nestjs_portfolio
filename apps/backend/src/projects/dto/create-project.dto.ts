import { IsArray, IsBoolean, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsString()
  slug: string;

  @IsString()
  description: string;

  @IsArray()
  @IsString({ each: true })
  technologies: string[];

  @IsUrl()
  imageUrl: string;

  @IsOptional()
  @IsUrl()
  playStoreUrl?: string;

  @IsOptional()
  @IsUrl()
  githubUrl?: string;

  @IsOptional()
  @IsUrl()
  demoVideoUrl?: string;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;
}
