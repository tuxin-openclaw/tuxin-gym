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
