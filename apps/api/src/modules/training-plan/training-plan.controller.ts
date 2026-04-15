import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { TrainingPlanService } from './training-plan.service';
import type {
  TrainingPlan,
  CreateTrainingPlanDto,
  ApiResponse,
} from '@tuxin-gym/shared';

@Controller('training-plans')
export class TrainingPlanController {
  constructor(private readonly trainingPlanService: TrainingPlanService) {}

  @Get()
  async findAll(): Promise<ApiResponse<TrainingPlan[]>> {
    const data = await this.trainingPlanService.findAll();
    return { data };
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponse<TrainingPlan | null>> {
    const data = await this.trainingPlanService.findOne(id);
    return { data };
  }

  @Post()
  async create(
    @Body() createDto: CreateTrainingPlanDto,
  ): Promise<ApiResponse<TrainingPlan>> {
    const data = await this.trainingPlanService.create(createDto);
    return { data, message: '创建成功' };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: Partial<CreateTrainingPlanDto>,
  ): Promise<ApiResponse<TrainingPlan | null>> {
    const data = await this.trainingPlanService.update(id, updateDto);
    return { data, message: data ? '更新成功' : '计划不存在' };
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponse<{ success: boolean }>> {
    const success = await this.trainingPlanService.delete(id);
    return { data: { success }, message: success ? '删除成功' : '计划不存在' };
  }
}
