import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateSkillDto {
  @IsString()
  name: string;

  @IsString()
  category: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  proficiency?: number;
}
