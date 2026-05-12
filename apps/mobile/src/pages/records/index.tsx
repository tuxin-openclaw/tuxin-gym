import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

import AppTabBar from '../../components/AppTabBar';
import { workoutRecords } from '../../data/mock';

import './index.scss';

export default function RecordsPage() {
  return (
    <View className='app-page app-page--plain records-page'>
      <View className='records-page__header'>
        <View>
          <Text className='records-page__eyebrow'>历史记录</Text>
          <Text className='records-page__title'>每一次动起来都算数</Text>
        </View>
        <View className='records-page__add' onClick={() => Taro.navigateTo({ url: '/pages/record-create/index' })}>+</View>
      </View>
      <View className='filter-row'>
        {['全部', '力量训练', '有氧训练', '拉伸恢复'].map((label, index) => (
          <View key={label} className={`filter-chip ${index === 0 ? 'is-active' : ''}`}>{label}</View>
        ))}
      </View>
      {workoutRecords.map((record) => (
        <View key={record.id} className='app-card record-card'>
          <View className='record-card__top'>
            <Text className='record-card__date'>{record.date}</Text>
            <Text className='record-card__feeling'>{record.feeling}</Text>
          </View>
          <Text className='record-card__title'>{record.title}</Text>
          <Text className='record-card__meta'>{record.duration} 分钟 · {record.type}</Text>
          <View className='record-card__parts'>
            {record.parts.map((part) => (
              <Text key={part} className='soft-tag'>{part}</Text>
            ))}
          </View>
          <Text className='record-card__note'>{record.note}</Text>
        </View>
      ))}
      <AppTabBar active='records' />
    </View>
  );
}
