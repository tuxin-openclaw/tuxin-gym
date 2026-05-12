import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

import './index.scss';

type TabKey = 'home' | 'calendar' | 'records' | 'statistics' | 'profile';

type Props = {
  active: TabKey;
};

const tabs: Array<{ key: TabKey; label: string; path: string; icon: string }> = [
  { key: 'home', label: '首页', path: '/pages/home/index', icon: 'home' },
  { key: 'calendar', label: '日历', path: '/pages/calendar/index', icon: 'calendar' },
  { key: 'records', label: '记录', path: '/pages/records/index', icon: 'plus' },
  { key: 'statistics', label: '统计', path: '/pages/statistics/index', icon: 'chart' },
  { key: 'profile', label: '我的', path: '/pages/profile/index', icon: 'user' },
];

export default function AppTabBar({ active }: Props) {
  const go = (path: string, key: TabKey) => {
    if (key === active) return;
    Taro.navigateTo({ url: path });
  };

  return (
    <View className='app-tabbar'>
      {tabs.map((tab) => (
        <View
          key={tab.key}
          className={`app-tabbar__item ${active === tab.key ? 'is-active' : ''} ${tab.key === 'records' ? 'is-center' : ''}`}
          onClick={() => go(tab.path, tab.key)}
        >
          <View className={`app-tabbar__icon icon-${tab.icon}`}>
            {tab.icon === 'plus' && <Text className='app-tabbar__plus'>+</Text>}
          </View>
          <Text className='app-tabbar__label'>{tab.label}</Text>
        </View>
      ))}
    </View>
  );
}
