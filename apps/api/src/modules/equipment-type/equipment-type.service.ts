import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EquipmentType } from '../../entities/equipment-type.entity';

@Injectable()
export class EquipmentTypeService {
  constructor(
    @InjectRepository(EquipmentType)
    private equipmentTypeRepository: Repository<EquipmentType>
  ) {}

  findAll(): Promise<EquipmentType[]> {
    return this.equipmentTypeRepository.find({ order: { id: 'ASC' } });
  }

  findOne(id: number): Promise<EquipmentType | null> {
    return this.equipmentTypeRepository.findOneBy({ id });
  }
}
