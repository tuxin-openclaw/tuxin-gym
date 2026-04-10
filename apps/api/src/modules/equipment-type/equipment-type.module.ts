import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipmentType } from '../../entities/equipment-type.entity';
import { EquipmentTypeService } from './equipment-type.service';
import { EquipmentTypeController } from './equipment-type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EquipmentType])],
  providers: [EquipmentTypeService],
  controllers: [EquipmentTypeController],
  exports: [EquipmentTypeService],
})
export class EquipmentTypeModule {}
