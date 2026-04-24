import { ReactNode } from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './index.scss';

interface SubPageHeaderProps {
  title: string;
  right?: ReactNode;
}

const SubPageHeader = ({ title, right }: SubPageHeaderProps) => {
  const handleBack = () => {
    const pages = Taro.getCurrentPages();
    if (pages.length > 1) {
      Taro.navigateBack();
      return;
    }

    Taro.reLaunch({
      url: '/pages/home/index',
    });
  };

  return (
    <View className="sub-page-header">
      <View className="sub-page-header__inner">
        <View className="sub-page-header__left">
          <View className="sub-page-header__back" onClick={handleBack}>
            <Text>‹</Text>
          </View>
        </View>
        <Text className="sub-page-header__title">{title}</Text>
        <View className="sub-page-header__right">{right}</View>
      </View>
    </View>
  );
};

export default SubPageHeader;
