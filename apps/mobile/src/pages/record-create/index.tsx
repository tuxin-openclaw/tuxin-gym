import Taro from '@tarojs/taro';
import { View, Text, Input, Textarea } from '@tarojs/components';

import { bodyParts, feelings, workoutTypes } from '../../data/mock';

import './index.scss';

export default function RecordCreatePage() {
  return (
    <View className='app-page app-page--plain create-page'>
      <View className='create-page__nav'>
        <Text onClick={() => Taro.navigateBack()}>‹</Text>
        <Text>新增记录</Text>
        <Text />
      </View>
      <Text className='create-page__title'>今天也记录下来了</Text>
      <View className='app-card create-form'>
        <View className='form-row'>
          <Text className='form-label'>训练日期</Text>
          <Input className='form-input' value='2026-05-12' disabled />
        </View>
        <View className='form-group'>
          <Text className='form-label'>训练部位</Text>
          <View className='choice-grid'>
            {bodyParts.map((part, index) => (
              <View key={part} className={`choice-chip ${index < 2 ? 'is-active' : ''}`}>{part}</View>
            ))}
          </View>
        </View>
        <View className='form-group'>
          <Text className='form-label'>训练类型</Text>
          <View className='choice-grid choice-grid--two'>
            {workoutTypes.map((type, index) => (
              <View key={type} className={`choice-chip ${index === 0 ? 'is-active' : ''}`}>{type}</View>
            ))}
          </View>
        </View>
        <View className='form-row'>
          <Text className='form-label'>训练时长</Text>
          <Input className='form-input' value='45 分钟' disabled />
        </View>
        <View className='form-group'>
          <Text className='form-label'>主观感受</Text>
          <View className='choice-grid choice-grid--two'>
            {feelings.map((feeling, index) => (
              <View key={feeling} className={`choice-chip ${index === 1 ? 'is-active' : ''}`}>{feeling}</View>
            ))}
          </View>
        </View>
        <View className='form-group'>
          <Text className='form-label'>备注</Text>
          <Textarea className='form-textarea' value='卧推和肩推都完成了，节奏刚好。' disabled />
        </View>
      </View>
      <View className='save-button primary-gradient' onClick={() => Taro.navigateBack()}>保存记录</View>
    </View>
  );
}
