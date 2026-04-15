// 健身部位
export interface BodyPart {
  id: number;
  name: string;
  nameEn: string;
  createdAt: Date;
  updatedAt: Date;
}

// 器械类型
export interface EquipmentType {
  id: number;
  name: string;
  nameEn: string;
  createdAt: Date;
  updatedAt: Date;
}

// 健身动作
export interface Exercise {
  id: number;
  name: string;
  nameEn: string;
  description?: string;
  bodyPartId: number;
  equipmentTypeId: number;
  bodyPart?: BodyPart;
  equipmentType?: EquipmentType;
  createdAt: Date;
  updatedAt: Date;
}

// 筛选条件
export interface ExerciseFilter {
  bodyPartId?: number;
  equipmentTypeId?: number;
}

// API 响应
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

// 列表响应
export interface ListResponse<T> {
  items: T[];
  total: number;
}

// 训练计划周期类型
export type ScheduleType = 'daily' | 'weekly';

// 训练计划
export interface TrainingPlan {
  id: number;
  name: string;
  scheduleType: ScheduleType;
  weekDays?: number[]; // 0-6, 0=周日
  reminderTime: string; // HH:mm 格式
  enabled: boolean;
  exercises?: TrainingPlanExercise[];
  createdAt: Date;
  updatedAt: Date;
}

// 训练计划与动作关联
export interface TrainingPlanExercise {
  id: number;
  trainingPlanId: number;
  exerciseId: number;
  exercise?: Exercise;
  order: number;
  sets?: number;
  reps?: number;
  createdAt: Date;
  updatedAt: Date;
}

// 创建训练计划 DTO
export interface CreateTrainingPlanDto {
  name: string;
  scheduleType: ScheduleType;
  weekDays?: number[];
  reminderTime: string;
  exerciseIds: number[];
}
