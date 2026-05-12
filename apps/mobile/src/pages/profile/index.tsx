import { View, Text, Image } from '@tarojs/components';

import AppTabBar from '../../components/AppTabBar';
import coachDog from '../../assets/coach-dog.png';
import { userProfile, weeklyGoal } from '../../data/mock';

import './index.scss';

export default function ProfilePage() {
  return (
    <View className='app-page app-page--plain profile-page'>
      <View className='app-card profile-card'>
        <Image className='profile-card__avatar' src={coachDog} mode='aspectFill' />
        <View className='profile-card__main'>
          <Text className='profile-card__name'>{userProfile.name}</Text>
          <Text className='profile-card__goal'>{userProfile.goal}</Text>
        </View>
      </View>
      <View className='profile-stats'>
        <View className='app-card profile-stat'>
          <Text>{userProfile.totalCount}</Text>
          <Text>累计训练</Text>
        </View>
        <View className='app-card profile-stat'>
          <Text>{userProfile.totalMinutes}</Text>
          <Text>累计分钟</Text>
        </View>
        <View className='app-card profile-stat'>
          <Text>{weeklyGoal}</Text>
          <Text>每周目标</Text>
        </View>
      </View>
      <View className='app-card setting-list'>
        {['训练目标', '提醒设置', '数据导出', '关于图新健身'].map((item) => (
          <View key={item} className='setting-item'>
            <Text>{item}</Text>
            <Text>›</Text>
          </View>
        ))}
      </View>
      <AppTabBar active='profile' />
    </View>
  );
}
