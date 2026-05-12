import { View, Text } from '@tarojs/components';

import AppTabBar from '../../components/AppTabBar';
import { userProfile, weeklyTrend } from '../../data/mock';

import './index.scss';

export default function StatisticsPage() {
  return (
    <View className='app-page app-page--plain statistics-page'>
      <Text className='statistics-page__eyebrow'>简单统计</Text>
      <Text className='statistics-page__title'>你正在稳定变好</Text>
      <View className='stats-grid'>
        <View className='app-card stat-tile'>
          <Text className='stat-tile__value'>{userProfile.totalCount}</Text>
          <Text className='stat-tile__label'>累计训练</Text>
        </View>
        <View className='app-card stat-tile'>
          <Text className='stat-tile__value'>{userProfile.totalMinutes}</Text>
          <Text className='stat-tile__label'>累计分钟</Text>
        </View>
      </View>
      <View className='app-card stats-panel'>
        <Text className='section-title'>本周节奏</Text>
        <View className='stats-bars'>
          {weeklyTrend.map((value, index) => (
            <View key={`${value}-${index}`} className='stats-bars__item'>
              <View className='stats-bars__track'>
                <View className='stats-bars__bar' style={{ height: `${22 + value * 20}rpx` }} />
              </View>
              <Text>{['一', '二', '三', '四', '五', '六', '日'][index]}</Text>
            </View>
          ))}
        </View>
      </View>
      <View className='app-card stats-note'>
        <Text className='stats-note__title'>最近一次训练：05/12</Text>
        <Text className='stats-note__body'>本周已经练了 3 次，离目标还差 1 次。今天不急，安排一个舒服的节奏就好。</Text>
      </View>
      <AppTabBar active='statistics' />
    </View>
  );
}
