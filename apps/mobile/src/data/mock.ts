export type WorkoutRecord = {
  id: number;
  date: string;
  weekLabel: string;
  title: string;
  type: string;
  duration: number;
  feeling: string;
  parts: string[];
  note: string;
};

export const weeklyGoal = 4;

export const userProfile = {
  name: 'Leo',
  greeting: '早上好',
  goal: '每周轻松动起来 4 次',
  totalCount: 28,
  totalMinutes: 1260,
};

export const workoutRecords: WorkoutRecord[] = [
  {
    id: 1,
    date: '05/12',
    weekLabel: '今天',
    title: '胸 + 肩训练',
    type: '力量训练',
    duration: 45,
    feeling: '状态不错',
    parts: ['胸', '肩'],
    note: '卧推和肩推都完成了，节奏刚好。',
  },
  {
    id: 2,
    date: '05/10',
    weekLabel: '周日',
    title: '有氧运动',
    type: '有氧训练',
    duration: 35,
    feeling: '正常完成',
    parts: ['有氧'],
    note: '慢跑 30 分钟，最后做了放松。',
  },
  {
    id: 3,
    date: '05/08',
    weekLabel: '周五',
    title: '腿部 + 核心',
    type: '力量训练',
    duration: 55,
    feeling: '有点累',
    parts: ['腿', '核心'],
    note: '深蹲重量保持，核心训练减少一组。',
  },
];

export const weeklyTrend = [1, 3, 4, 2, 6, 5, 0];

export const calendarWeek = [
  { label: '一', state: 'done' },
  { label: '二', state: 'done' },
  { label: '三', state: 'rest' },
  { label: '四', state: 'done' },
  { label: '五', state: 'done' },
  { label: '六', state: 'rest' },
  { label: '日', state: 'today' },
];

export const quickActions = [
  { label: '力量训练', tone: 'green' },
  { label: '有氧运动', tone: 'blue' },
  { label: '拉伸放松', tone: 'violet' },
  { label: '其他运动', tone: 'orange' },
];

export const bodyParts = ['胸', '背', '肩', '手臂', '腿', '核心', '全身', '有氧'];
export const workoutTypes = ['力量训练', '有氧训练', '拉伸恢复', '其他运动'];
export const feelings = ['状态很好', '正常完成', '有点累', '状态较差'];
