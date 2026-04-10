import { Controller, Get, Param, Query } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { Exercise } from '../../entities/exercise.entity';
import { ApiResponse, ExerciseFilter } from '@tuxin-gym/shared';

@Controller('exercises')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Get()
  async findAll(
    @Query('bodyPartId') bodyPartId?: string,
    @Query('equipmentTypeId') equipmentTypeId?: string
  ): Promise<ApiResponse<Exercise[]>> {
    const filter: ExerciseFilter = {};

    if (bodyPartId) {
      filter.bodyPartId = parseInt(bodyPartId, 10);
    }

    if (equipmentTypeId) {
      filter.equipmentTypeId = parseInt(equipmentTypeId, 10);
    }

    const data = await this.exerciseService.findAll(
      Object.keys(filter).length > 0 ? filter : undefined
    );
    return { data };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ApiResponse<Exercise | null>> {
    const data = await this.exerciseService.findOne(+id);
    return { data };
  }
}
