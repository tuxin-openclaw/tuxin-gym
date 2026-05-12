import { View, Text } from '@tarojs/components';

import AppTabBar from '../../components/AppTabBar';
import { workoutRecords } from '../../data/mock';

import './index.scss';

const days = Array.from({ length: 35 }, (_, index) => index + 1);
const trainedDays = [2, 5, 8, 10, 12, 16, 20, 24];

export default function CalendarPage() {
  return (
    <View className='app-page app-page--plain calendar-page'>
      <Text className='calendar-page__eyebrow'>训练日历</Text>
      <Text className='calendar-page__title'>5 月已经练了 8 次</Text>
      <View className='app-card month-card'>
        <View className='month-card__header'>
          <Text>2026 年 5 月</Text>
          <Text className='month-card__hint'>慢慢来，保持就好</Text>
        </View>
        <View className='month-week'>
          {['一', '二', '三', '四', '五', '六', '日'].map((label) => (
            <Text key={label}>{label}</Text>
          ))}
        </View>
        <View className='month-grid'>
          {days.map((day) => (
            <View key={day} className={`month-day ${trainedDays.includes(day) ? 'is-trained' : ''} ${day === 12 ? 'is-today' : ''}`}>
              <Text>{day}</Text>
              {trainedDays.includes(day) && <View className='month-day__dot' />}
            </View>
          ))}
        </View>
      </View>
      <View className='app-card calendar-list'>
        <Text className='section-title'>本月记录</Text>
        {workoutRecords.map((record) => (
          <View key={record.id} className='calendar-record'>
            <View className='calendar-record__date'>{record.date}</View>
            <View className='calendar-record__info'>
              <Text className='calendar-record__title'>{record.title}</Text>
              <Text className='calendar-record__meta'>{record.duration} 分钟 · {record.feeling}</Text>
            </View>
          </View>
        ))}
      </View>
      <AppTabBar active='calendar' />
    </View>
  );
}
