import type { Exercise, ExerciseFilter, BodyPart, EquipmentType } from '@tuxin-gym/shared';
import { request } from '../utils/request';

export async function getExercises(filter?: ExerciseFilter): Promise<Exercise[]> {
  const params: Record<string, string> = {};
  if (filter?.bodyPartId) {
    params.bodyPartId = String(filter.bodyPartId);
  }
  if (filter?.equipmentTypeId) {
    params.equipmentTypeId = String(filter.equipmentTypeId);
  }

  const queryString = new URLSearchParams(params).toString();
  const url = queryString ? `/exercises?${queryString}` : '/exercises';

  return request<Exercise[]>({ url });
}

export async function getExercise(id: number): Promise<Exercise | null> {
  return request<Exercise | null>({ url: `/exercises/${id}` });
}

export async function getBodyParts(): Promise<BodyPart[]> {
  return request<BodyPart[]>({ url: '/body-parts' });
}

export async function getEquipmentTypes(): Promise<EquipmentType[]> {
  return request<EquipmentType[]>({ url: '/equipment-types' });
}
