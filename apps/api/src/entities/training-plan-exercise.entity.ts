import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TrainingPlan } from './training-plan.entity';
import { Exercise } from './exercise.entity';

@Entity('training_plan_exercises')
export class TrainingPlanExercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'training_plan_id' })
  trainingPlanId: number;

  @Column({ name: 'exercise_id' })
  exerciseId: number;

  @Column({ default: 0 })
  order: number;

  @Column({ nullable: true })
  sets?: number;

  @Column({ nullable: true })
  reps?: number;

  @ManyToOne(() => TrainingPlan, (plan) => plan.exercises)
  @JoinColumn({ name: 'training_plan_id' })
  trainingPlan: TrainingPlan;

  @ManyToOne(() => Exercise)
  @JoinColumn({ name: 'exercise_id' })
  exercise: Exercise;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
