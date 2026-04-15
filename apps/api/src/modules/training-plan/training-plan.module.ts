import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingPlan } from '../../entities/training-plan.entity';
import { TrainingPlanExercise } from '../../entities/training-plan-exercise.entity';
import { TrainingPlanService } from './training-plan.service';
import { TrainingPlanController } from './training-plan.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TrainingPlan, TrainingPlanExercise])],
  providers: [TrainingPlanService],
  controllers: [TrainingPlanController],
  exports: [TrainingPlanService],
})
export class TrainingPlanModule {}
