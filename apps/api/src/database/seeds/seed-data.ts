import { DataSource } from 'typeorm';
import { BodyPart } from '../../entities/body-part.entity';
import { EquipmentType } from '../../entities/equipment-type.entity';
import { Exercise } from '../../entities/exercise.entity';

export const bodyPartsData = [
  { name: '胸部', nameEn: 'Chest' },
  { name: '背部', nameEn: 'Back' },
  { name: '肩部', nameEn: 'Shoulders' },
  { name: '肱二头肌', nameEn: 'Biceps' },
  { name: '肱三头肌', nameEn: 'Triceps' },
  { name: '前臂', nameEn: 'Forearms' },
  { name: '腹肌', nameEn: 'Abs' },
  { name: '臀部', nameEn: 'Glutes' },
  { name: '大腿', nameEn: 'Quads' },
  { name: '腘绳肌', nameEn: 'Hamstrings' },
  { name: '小腿', nameEn: 'Calves' },
];

export const equipmentTypesData = [
  { name: '哑铃', nameEn: 'Dumbbell' },
  { name: '杠铃', nameEn: 'Barbell' },
  { name: '徒手', nameEn: 'Bodyweight' },
  { name: '器械', nameEn: 'Machine' },
  { name: '弹力带', nameEn: 'Resistance Band' },
  { name: '壶铃', nameEn: 'Kettlebell' },
];

export const exercisesData = [
  {
    name: '哑铃卧推',
    nameEn: 'Dumbbell Bench Press',
    bodyPartId: 1,
    equipmentTypeId: 1,
    description: '平板哑铃卧推是锻炼胸肌的经典动作',
  },
  {
    name: '上斜哑铃卧推',
    nameEn: 'Incline Dumbbell Press',
    bodyPartId: 1,
    equipmentTypeId: 1,
    description: '上斜哑铃卧推侧重锻炼上胸',
  },
  {
    name: '杠铃卧推',
    nameEn: 'Barbell Bench Press',
    bodyPartId: 1,
    equipmentTypeId: 2,
    description: '平板杠铃卧推是力量训练的基础动作',
  },
  {
    name: '俯卧撑',
    nameEn: 'Push Up',
    bodyPartId: 1,
    equipmentTypeId: 3,
    description: '俯卧撑是经典的自重训练动作',
  },
  {
    name: '蝴蝶机夹胸',
    nameEn: 'Machine Fly',
    bodyPartId: 1,
    equipmentTypeId: 4,
    description: '蝴蝶机夹胸可以很好地孤立胸肌',
  },

  {
    name: '哑铃划船',
    nameEn: 'Dumbbell Row',
    bodyPartId: 2,
    equipmentTypeId: 1,
    description: '单臂哑铃划船锻炼背阔肌',
  },
  {
    name: '杠铃划船',
    nameEn: 'Barbell Row',
    bodyPartId: 2,
    equipmentTypeId: 2,
    description: '俯身杠铃划船是锻炼背部的黄金动作',
  },
  {
    name: '引体向上',
    nameEn: 'Pull Up',
    bodyPartId: 2,
    equipmentTypeId: 3,
    description: '引体向上是锻炼背部的最佳自重动作',
  },
  {
    name: '高位下拉',
    nameEn: 'Lat Pulldown',
    bodyPartId: 2,
    equipmentTypeId: 4,
    description: '高位下拉适合初学者锻炼背阔肌',
  },

  {
    name: '哑铃推肩',
    nameEn: 'Dumbbell Shoulder Press',
    bodyPartId: 3,
    equipmentTypeId: 1,
    description: '坐姿哑铃推肩锻炼肩部整体',
  },
  {
    name: '杠铃推肩',
    nameEn: 'Barbell Overhead Press',
    bodyPartId: 3,
    equipmentTypeId: 2,
    description: '站姿杠铃推肩是锻炼肩部的经典动作',
  },
  {
    name: '哑铃侧平举',
    nameEn: 'Dumbbell Lateral Raise',
    bodyPartId: 3,
    equipmentTypeId: 1,
    description: '哑铃侧平举侧重锻炼中束',
  },
  {
    name: '俯身哑铃飞鸟',
    nameEn: 'Bent-over Dumbbell Fly',
    bodyPartId: 3,
    equipmentTypeId: 1,
    description: '俯身哑铃飞鸟锻炼后束',
  },

  {
    name: '哑铃弯举',
    nameEn: 'Dumbbell Curl',
    bodyPartId: 4,
    equipmentTypeId: 1,
    description: '哑铃弯举锻炼肱二头肌',
  },
  {
    name: '杠铃弯举',
    nameEn: 'Barbell Curl',
    bodyPartId: 4,
    equipmentTypeId: 2,
    description: '杠铃弯举是锻炼二头肌的经典动作',
  },
  {
    name: '锤式弯举',
    nameEn: 'Hammer Curl',
    bodyPartId: 4,
    equipmentTypeId: 1,
    description: '锤式弯举锻炼肱肌和肱二头肌',
  },

  {
    name: '哑铃颈后臂屈伸',
    nameEn: 'Dumbbell Tricep Extension',
    bodyPartId: 5,
    equipmentTypeId: 1,
    description: '颈后臂屈伸锻炼肱三头肌长头',
  },
  {
    name: '杠铃窄推',
    nameEn: 'Close-grip Bench Press',
    bodyPartId: 5,
    equipmentTypeId: 2,
    description: '窄握卧推锻炼肱三头肌',
  },
  {
    name: '绳索下压',
    nameEn: 'Tricep Pushdown',
    bodyPartId: 5,
    equipmentTypeId: 4,
    description: '绳索下压是锻炼三头肌的常用动作',
  },
  {
    name: '俯卧撑',
    nameEn: 'Tricep Push Up',
    bodyPartId: 5,
    equipmentTypeId: 3,
    description: '窄距俯卧撑侧重锻炼三头肌',
  },

  {
    name: '哑铃腕弯举',
    nameEn: 'Dumbbell Wrist Curl',
    bodyPartId: 6,
    equipmentTypeId: 1,
    description: '腕弯举锻炼前臂屈肌',
  },
  {
    name: '反握腕弯举',
    nameEn: 'Reverse Wrist Curl',
    bodyPartId: 6,
    equipmentTypeId: 1,
    description: '反握腕弯举锻炼前臂伸肌',
  },

  {
    name: '卷腹',
    nameEn: 'Crunch',
    bodyPartId: 7,
    equipmentTypeId: 3,
    description: '卷腹是锻炼腹肌的基础动作',
  },
  {
    name: '仰卧起坐',
    nameEn: 'Sit Up',
    bodyPartId: 7,
    equipmentTypeId: 3,
    description: '仰卧起坐锻炼整个腹部',
  },
  {
    name: '悬垂举腿',
    nameEn: 'Hanging Leg Raise',
    bodyPartId: 7,
    equipmentTypeId: 3,
    description: '悬垂举腿侧重锻炼下腹部',
  },
  {
    name: '平板支撑',
    nameEn: 'Plank',
    bodyPartId: 7,
    equipmentTypeId: 3,
    description: '平板支撑锻炼核心稳定性',
  },

  {
    name: '哑铃深蹲',
    nameEn: 'Dumbbell Squat',
    bodyPartId: 9,
    equipmentTypeId: 1,
    description: '哑铃深蹲锻炼大腿前侧',
  },
  {
    name: '杠铃深蹲',
    nameEn: 'Barbell Squat',
    bodyPartId: 9,
    equipmentTypeId: 2,
    description: '杠铃深蹲是锻炼腿部的黄金动作',
  },
  {
    name: '腿举',
    nameEn: 'Leg Press',
    bodyPartId: 9,
    equipmentTypeId: 4,
    description: '腿举是锻炼大腿的安全有效动作',
  },
  {
    name: '腿屈伸',
    nameEn: 'Leg Extension',
    bodyPartId: 9,
    equipmentTypeId: 4,
    description: '腿屈伸孤立锻炼股四头肌',
  },

  {
    name: '哑铃硬拉',
    nameEn: 'Dumbbell Deadlift',
    bodyPartId: 10,
    equipmentTypeId: 1,
    description: '哑铃硬拉锻炼腘绳肌和臀部',
  },
  {
    name: '杠铃硬拉',
    nameEn: 'Barbell Deadlift',
    bodyPartId: 10,
    equipmentTypeId: 2,
    description: '硬拉是锻炼后链的经典动作',
  },
  {
    name: '腿弯举',
    nameEn: 'Leg Curl',
    bodyPartId: 10,
    equipmentTypeId: 4,
    description: '腿弯举孤立锻炼腘绳肌',
  },
  {
    name: '罗马尼亚硬拉',
    nameEn: 'Romanian Deadlift',
    bodyPartId: 10,
    equipmentTypeId: 2,
    description: '罗马尼亚硬拉侧重锻炼腘绳肌',
  },

  {
    name: '臀推',
    nameEn: 'Hip Thrust',
    bodyPartId: 8,
    equipmentTypeId: 3,
    description: '臀推是锻炼臀部的最佳动作',
  },
  {
    name: '哑铃臀桥',
    nameEn: 'Dumbbell Glute Bridge',
    bodyPartId: 8,
    equipmentTypeId: 1,
    description: '哑铃臀桥锻炼臀部',
  },
  {
    name: '保加利亚深蹲',
    nameEn: 'Bulgarian Split Squat',
    bodyPartId: 8,
    equipmentTypeId: 1,
    description: '保加利亚深蹲锻炼臀部和腿部',
  },

  {
    name: '提踵',
    nameEn: 'Calf Raise',
    bodyPartId: 11,
    equipmentTypeId: 3,
    description: '提踵锻炼小腿肌肉',
  },
  {
    name: '坐姿提踵',
    nameEn: 'Seated Calf Raise',
    bodyPartId: 11,
    equipmentTypeId: 4,
    description: '坐姿提踵孤立锻炼小腿',
  },
  {
    name: '站立提踵',
    nameEn: 'Standing Calf Raise',
    bodyPartId: 11,
    equipmentTypeId: 4,
    description: '站立提踵锻炼小腿',
  },
];

export async function seedDatabase(dataSource: DataSource) {
  const bodyPartRepo = dataSource.getRepository(BodyPart);
  const equipmentTypeRepo = dataSource.getRepository(EquipmentType);
  const exerciseRepo = dataSource.getRepository(Exercise);

  const existingBodyParts = await bodyPartRepo.count();
  const existingEquipmentTypes = await equipmentTypeRepo.count();
  const existingExercises = await exerciseRepo.count();

  if (existingBodyParts === 0) {
    await bodyPartRepo.save(bodyPartsData);
    console.log('Body parts seeded');
  }

  if (existingEquipmentTypes === 0) {
    await equipmentTypeRepo.save(equipmentTypesData);
    console.log('Equipment types seeded');
  }

  if (existingExercises === 0) {
    await exerciseRepo.save(exercisesData);
    console.log('Exercises seeded');
  }
}
