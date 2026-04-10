import { Controller, Get, Param } from '@nestjs/common';
import { EquipmentTypeService } from './equipment-type.service';
import { EquipmentType } from '../../entities/equipment-type.entity';
import { ApiResponse } from '@tuxin-gym/shared';

@Controller('equipment-types')
export class EquipmentTypeController {
  constructor(private readonly equipmentTypeService: EquipmentTypeService) {}

  @Get()
  async findAll(): Promise<ApiResponse<EquipmentType[]>> {
    const data = await this.equipmentTypeService.findAll();
    return { data };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ApiResponse<EquipmentType | null>> {
    const data = await this.equipmentTypeService.findOne(+id);
    return { data };
  }
}
