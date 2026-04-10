import { Controller, Get, Param } from '@nestjs/common';
import { BodyPartService } from './body-part.service';
import { BodyPart } from '../../entities/body-part.entity';
import { ApiResponse } from '@tuxin-gym/shared';

@Controller('body-parts')
export class BodyPartController {
  constructor(private readonly bodyPartService: BodyPartService) {}

  @Get()
  async findAll(): Promise<ApiResponse<BodyPart[]>> {
    const data = await this.bodyPartService.findAll();
    return { data };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ApiResponse<BodyPart | null>> {
    const data = await this.bodyPartService.findOne(+id);
    return { data };
  }
}
