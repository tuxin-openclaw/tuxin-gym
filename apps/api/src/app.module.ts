import { Controller, Get, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Controller()
export class AppController {
  @Get()
  healthCheck() {
    return { status: 'ok', message: 'Service is running' };
  }
}
import { BodyPartModule } from './modules/body-part/body-part.module';
import { EquipmentTypeModule } from './modules/equipment-type/equipment-type.module';
import { ExerciseModule } from './modules/exercise/exercise.module';
import { TrainingPlanModule } from './modules/training-plan/training-plan.module';
import { BodyPart } from './entities/body-part.entity';
import { EquipmentType } from './entities/equipment-type.entity';
import { Exercise } from './entities/exercise.entity';
import { TrainingPlan } from './entities/training-plan.entity';
import { TrainingPlanExercise } from './entities/training-plan-exercise.entity';

@Module({
  controllers: [AppController],
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './data/gym.db',
      entities: [BodyPart, EquipmentType, Exercise, TrainingPlan, TrainingPlanExercise],
      synchronize: true,
      logging: false,
    }),
    BodyPartModule,
    EquipmentTypeModule,
    ExerciseModule,
    TrainingPlanModule,
  ],
})
export class AppModule {}
