import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BodyPart } from '../../entities/body-part.entity';
import { BodyPartService } from './body-part.service';
import { BodyPartController } from './body-part.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BodyPart])],
  providers: [BodyPartService],
  controllers: [BodyPartController],
  exports: [BodyPartService],
})
export class BodyPartModule {}
