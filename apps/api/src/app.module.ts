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
import { BodyPart } from './entities/body-part.entity';
import { EquipmentType } from './entities/equipment-type.entity';
import { Exercise } from './entities/exercise.entity';

@Module({
  controllers: [AppController],
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './data/gym.db',
      entities: [BodyPart, EquipmentType, Exercise],
      synchronize: true,
      logging: false,
    }),
    BodyPartModule,
    EquipmentTypeModule,
    ExerciseModule,
  ],
})
export class AppModule {}
