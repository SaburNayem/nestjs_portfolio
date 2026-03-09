import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { ContactsModule } from './contacts/contacts.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { ProjectsModule } from './projects/projects.module';
import { SeedModule } from './seed/seed.module';
import { SkillsModule } from './skills/skills.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { VisualizationModule } from './visualization/visualization.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const dbType = config.get<string>('DB_TYPE') || 'sqljs';

        if (dbType === 'postgres') {
          return {
            type: 'postgres' as const,
            host: config.get<string>('DB_HOST'),
            port: config.get<number>('DB_PORT'),
            username: config.get<string>('DB_USER'),
            password: config.get<string>('DB_PASS'),
            database: config.get<string>('DB_NAME'),
            autoLoadEntities: true,
            synchronize: true,
          };
        }

        return {
          type: 'sqljs' as const,
          location: 'portfolio.sqlite',
          autoSave: true,
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    AuthModule,
    ProjectsModule,
    SkillsModule,
    BlogModule,
    TestimonialsModule,
    ContactsModule,
    SeedModule,
    VisualizationModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
