import { request } from '../utils/request';
import type {
  TrainingPlan,
  CreateTrainingPlanDto,
} from '@tuxin-gym/shared';

export async function getTrainingPlans(): Promise<TrainingPlan[]> {
  return request<TrainingPlan[]>({ url: '/training-plans' });
}

export async function getTrainingPlan(id: number): Promise<TrainingPlan | null> {
  return request<TrainingPlan | null>({ url: `/training-plans/${id}` });
}

export async function createTrainingPlan(
  data: CreateTrainingPlanDto,
): Promise<TrainingPlan> {
  return request<TrainingPlan>({
    url: '/training-plans',
    method: 'POST',
    data
  });
}

export async function updateTrainingPlan(
  id: number,
  data: Partial<CreateTrainingPlanDto>,
): Promise<TrainingPlan | null> {
  return request<TrainingPlan | null>({
    url: `/training-plans/${id}`,
    method: 'PUT',
    data
  });
}

export async function deleteTrainingPlan(id: number): Promise<boolean> {
  const result = await request<{ success: boolean }>({
    url: `/training-plans/${id}`,
    method: 'DELETE'
  });
  return result.success;
}
