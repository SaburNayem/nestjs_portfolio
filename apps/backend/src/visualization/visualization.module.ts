import { Module } from '@nestjs/common';
import { VisualizationController } from './visualization.controller';

@Module({
  controllers: [VisualizationController],
})
export class VisualizationModule {}
