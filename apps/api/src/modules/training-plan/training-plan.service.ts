import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrainingPlan } from '../../entities/training-plan.entity';
import { TrainingPlanExercise } from '../../entities/training-plan-exercise.entity';
import type { CreateTrainingPlanDto } from '@tuxin-gym/shared';

@Injectable()
export class TrainingPlanService {
  constructor(
    @InjectRepository(TrainingPlan)
    private trainingPlanRepository: Repository<TrainingPlan>,
    @InjectRepository(TrainingPlanExercise)
    private trainingPlanExerciseRepository: Repository<TrainingPlanExercise>,
  ) {}

  async findAll(): Promise<TrainingPlan[]> {
    return this.trainingPlanRepository.find({
      relations: ['exercises', 'exercises.exercise'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<TrainingPlan | null> {
    return this.trainingPlanRepository.findOne({
      where: { id },
      relations: ['exercises', 'exercises.exercise'],
    });
  }

  async create(createDto: CreateTrainingPlanDto): Promise<TrainingPlan> {
    const plan = this.trainingPlanRepository.create({
      name: createDto.name,
      scheduleType: createDto.scheduleType,
      weekDays: createDto.weekDays,
      reminderTime: createDto.reminderTime,
      enabled: true,
    });

    const savedPlan = await this.trainingPlanRepository.save(plan);

    if (createDto.exerciseIds && createDto.exerciseIds.length > 0) {
      const exercises = createDto.exerciseIds.map((exerciseId, index) =>
        this.trainingPlanExerciseRepository.create({
          trainingPlanId: savedPlan.id,
          exerciseId,
          order: index,
        }),
      );
      await this.trainingPlanExerciseRepository.save(exercises);
    }

    return this.findOne(savedPlan.id) as Promise<TrainingPlan>;
  }

  async update(
    id: number,
    updateDto: Partial<CreateTrainingPlanDto>,
  ): Promise<TrainingPlan | null> {
    const plan = await this.findOne(id);
    if (!plan) {
      return null;
    }

    if (updateDto.name !== undefined) plan.name = updateDto.name;
    if (updateDto.scheduleType !== undefined)
      plan.scheduleType = updateDto.scheduleType;
    if (updateDto.weekDays !== undefined) plan.weekDays = updateDto.weekDays;
    if (updateDto.reminderTime !== undefined)
      plan.reminderTime = updateDto.reminderTime;

    await this.trainingPlanRepository.save(plan);

    if (updateDto.exerciseIds) {
      await this.trainingPlanExerciseRepository.delete({ trainingPlanId: id });

      const exercises = updateDto.exerciseIds.map((exerciseId, index) =>
        this.trainingPlanExerciseRepository.create({
          trainingPlanId: id,
          exerciseId,
          order: index,
        }),
      );
      await this.trainingPlanExerciseRepository.save(exercises);
    }

    return this.findOne(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.trainingPlanRepository.delete(id);
    return result.affected !== 0;
  }
}
