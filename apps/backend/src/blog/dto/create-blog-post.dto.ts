import { IsArray, IsString } from 'class-validator';

export class CreateBlogPostDto {
  @IsString()
  title: string;

  @IsString()
  slug: string;

  @IsString()
  excerpt: string;

  @IsString()
  content: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];
}
