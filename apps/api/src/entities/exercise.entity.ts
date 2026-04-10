import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BodyPart } from './body-part.entity';
import { EquipmentType } from './equipment-type.entity';

@Entity('exercises')
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'name_en' })
  nameEn: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'body_part_id' })
  bodyPartId: number;

  @Column({ name: 'equipment_type_id' })
  equipmentTypeId: number;

  @ManyToOne(() => BodyPart, (bodyPart) => bodyPart.exercises)
  @JoinColumn({ name: 'body_part_id' })
  bodyPart: BodyPart;

  @ManyToOne(() => EquipmentType, (equipmentType) => equipmentType.exercises)
  @JoinColumn({ name: 'equipment_type_id' })
  equipmentType: EquipmentType;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
