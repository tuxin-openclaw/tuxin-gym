import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BodyPart } from '../../entities/body-part.entity';

@Injectable()
export class BodyPartService {
  constructor(
    @InjectRepository(BodyPart)
    private bodyPartRepository: Repository<BodyPart>
  ) {}

  findAll(): Promise<BodyPart[]> {
    return this.bodyPartRepository.find({ order: { id: 'ASC' } });
  }

  findOne(id: number): Promise<BodyPart | null> {
    return this.bodyPartRepository.findOneBy({ id });
  }
}
