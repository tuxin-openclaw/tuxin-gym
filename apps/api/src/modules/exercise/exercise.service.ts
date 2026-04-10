import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Exercise } from '../../entities/exercise.entity';
import { ExerciseFilter } from '@tuxin-gym/shared';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>
  ) {}

  findAll(filter?: ExerciseFilter): Promise<Exercise[]> {
    const where: FindOptionsWhere<Exercise> = {};

    if (filter?.bodyPartId) {
      where.bodyPartId = filter.bodyPartId;
    }

    if (filter?.equipmentTypeId) {
      where.equipmentTypeId = filter.equipmentTypeId;
    }

    return this.exerciseRepository.find({
      where,
      relations: ['bodyPart', 'equipmentType'],
      order: { id: 'ASC' },
    });
  }

  findOne(id: number): Promise<Exercise | null> {
    return this.exerciseRepository.findOne({
      where: { id },
      relations: ['bodyPart', 'equipmentType'],
    });
  }
}
