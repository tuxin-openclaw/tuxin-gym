import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { TrainingPlanExercise } from './training-plan-exercise.entity';

export type ScheduleType = 'daily' | 'weekly';

@Entity('training_plans')
export class TrainingPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'varchar',
    name: 'schedule_type',
  })
  scheduleType: ScheduleType;

  @Column({
    type: 'simple-json',
    name: 'week_days',
    nullable: true,
  })
  weekDays?: number[];

  @Column({ name: 'reminder_time' })
  reminderTime: string;

  @Column({ default: true })
  enabled: boolean;

  @OneToMany(
    () => TrainingPlanExercise,
    (planExercise) => planExercise.trainingPlan,
    { cascade: true }
  )
  exercises: TrainingPlanExercise[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
