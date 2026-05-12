import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';

import AppTabBar from '../../components/AppTabBar';
import coachDog from '../../assets/coach-dog.png';
import {
  calendarWeek,
  quickActions,
  userProfile,
  weeklyGoal,
  weeklyTrend,
  workoutRecords,
} from '../../data/mock';

import './index.scss';

const latestRecord = workoutRecords[0];

export default function HomePage() {
  const goCreate = () => Taro.navigateTo({ url: '/pages/record-create/index' });

  return (
    <View className='app-page home-page'>
      <View className='home-hero'>
        <View className='home-hero__copy'>
          <Text className='home-hero__title'>
            {userProfile.greeting}，{userProfile.name} 👋
          </Text>
          <Text className='home-hero__subtitle'>今天也要动一动呀！</Text>
        </View>
        <View className='home-bell'>
          <View className='home-bell__dot' />
        </View>
      </View>

      <View className='coach-zone'>
        <Image className='coach-zone__dog' src={coachDog} mode='aspectFill' />
        <View className='coach-zone__bubble'>坚持记录，你会看到更好的自己！</View>
        <View className='coach-zone__shape shape-a' />
        <View className='coach-zone__shape shape-b' />
      </View>

      <View className='app-card summary-card'>
        <View className='summary-block'>
          <Text className='summary-block__label'>本周训练</Text>
          <View className='summary-block__number'>
            <Text>3</Text>
            <Text className='summary-block__unit'>次</Text>
          </View>
          <Text className='summary-block__hint'>目标 {weeklyGoal} 次</Text>
          <View className='summary-progress'>
            <View className='summary-progress__bar' />
          </View>
        </View>

        <View className='summary-block'>
          <Text className='summary-block__label'>本月训练</Text>
          <View className='summary-block__number'>
            <Text>8</Text>
            <Text className='summary-block__unit'>次</Text>
          </View>
          <Text className='summary-block__hint'>累计时长 360 分钟</Text>
        </View>

        <View className='summary-trend'>
          <Text className='summary-block__label'>本周趋势</Text>
          <View className='trend-bars'>
            {weeklyTrend.map((value, index) => (
              <View key={`${value}-${index}`} className='trend-bars__item'>
                <View
                  className={`trend-bars__bar ${value === 0 ? 'is-empty' : ''}`}
                  style={{ height: `${28 + value * 18}rpx` }}
                />
                <Text className='trend-bars__label'>{['一', '二', '三', '四', '五', '六', '日'][index]}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View className='app-card latest-card'>
        <View className='latest-card__content'>
          <Text className='section-title latest-card__heading'>最近一次训练</Text>
          <View className='latest-card__body'>
            <View className='workout-icon workout-icon--strength'>
              <Text />
            </View>
            <View className='latest-card__text'>
              <Text className='latest-card__title'>{latestRecord.title}</Text>
              <Text className='latest-card__meta'>
                {latestRecord.duration} 分钟 · {latestRecord.type}
              </Text>
              <Text className='soft-tag'>{latestRecord.feeling}</Text>
            </View>
          </View>
        </View>
        <Image className='latest-card__dog' src={coachDog} mode='aspectFill' />
        <View className='latest-card__date'>
          <Text>{latestRecord.date}</Text>
          <Text className='latest-card__chevron'>›</Text>
        </View>
      </View>

      <View className='app-card week-card'>
        <View className='week-card__header'>
          <Text className='section-title'>本周训练日历</Text>
          <Text className='week-card__link'>查看日历 ›</Text>
        </View>
        <View className='week-calendar'>
          {calendarWeek.map((day) => (
            <View key={day.label} className={`week-day week-day--${day.state}`}>
              <Text className='week-day__label'>{day.label}</Text>
              <View className='week-day__mark'>{day.state === 'done' ? '✓' : ''}</View>
            </View>
          ))}
        </View>
      </View>

      <View className='record-button primary-gradient' onClick={goCreate}>
        <Text className='record-button__plus'>+</Text>
        <Text>记录一次训练</Text>
        <Image className='record-button__dog' src={coachDog} mode='aspectFill' />
      </View>

      <View className='app-card quick-card'>
        <Text className='section-title quick-card__title'>快速记录</Text>
        <View className='quick-grid'>
          {quickActions.map((action) => (
            <View key={action.label} className={`quick-action quick-action--${action.tone}`}>
              <View className='quick-action__icon' />
              <Text>{action.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <AppTabBar active='home' />
    </View>
  );
}
