import { Component, PropsWithChildren } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import type { TrainingPlan, ScheduleType } from '@tuxin-gym/shared';
import { getTrainingPlans } from '../../services/training-plan';
import TabBar from '../../components/tab-bar';
import './index.scss';

const weekDayNames = ['日', '一', '二', '三', '四', '五', '六'];

interface State {
  plans: TrainingPlan[];
  loading: boolean;
}

export default class TrainingPlans extends Component<PropsWithChildren, State> {
  state: State = {
    plans: [],
    loading: true,
  };

  componentDidMount() {
    this.fetchData();
  }

  componentWillShow() {
    this.fetchData();
  }

  async fetchData() {
    try {
      this.setState({ loading: true });
      const plans = await getTrainingPlans();
      this.setState({ plans, loading: false });
    } catch (error) {
      console.error('获取训练计划失败:', error);
      Taro.showToast({
        title: '获取数据失败',
        icon: 'none',
      });
      this.setState({ loading: false });
    }
  }

  goToCreate = () => {
    Taro.navigateTo({
      url: '/pages/training-plans/create',
    });
  };

  getScheduleDisplay = (scheduleType: ScheduleType, weekDays?: number[]) => {
    if (scheduleType === 'daily') {
      return '每天';
    }
    if (!weekDays || weekDays.length === 0) {
      return '未设置';
    }
    return `每周${weekDays.map((d) => weekDayNames[d]).join('、')}`;
  };

  render() {
    const { plans, loading } = this.state;

    if (loading) {
      return (
        <View className="g-page">
          <View className="tw-flex tw-items-center tw-justify-center tw-h-[60vh]">
            <Text className="tw-text-ink-2">加载中...</Text>
          </View>
          <TabBar current="training" />
        </View>
      );
    }

    return (
      <View className="g-page">
        <View className="tw-flex tw-flex-row tw-items-center tw-justify-between tw-px-4 tw-pt-4 tw-pb-2">
          <Text className="tw-text-xl tw-font-bold tw-text-ink-1">训练计划</Text>
          <View
            className="tw-bg-brand-500 tw-px-4 tw-py-2 tw-rounded-full tw-shadow-soft"
            onClick={this.goToCreate}
          >
            <Text className="tw-text-white tw-text-sm tw-font-medium">+ 新建计划</Text>
          </View>
        </View>

        {/* 计划列表 */}
        <ScrollView className="tw-px-4 tw-pb-10">
          {plans.length === 0 ? (
            <View className="tw-flex tw-items-center tw-justify-center tw-py-16">
              <View className="tw-text-center">
                <Text className="tw-text-ink-3 tw-text-6xl tw-block tw-mb-4">📋</Text>
                <Text className="tw-text-ink-3 tw-block tw-mb-4">暂无训练计划</Text>
                <View
                  className="tw-bg-brand-500 tw-px-6 tw-py-2 tw-rounded-full tw-inline-block"
                  onClick={this.goToCreate}
                >
                  <Text className="tw-text-white tw-text-sm">创建第一个计划</Text>
                </View>
              </View>
            </View>
          ) : (
            <View className="tw-space-y-3">
              {plans.map((plan) => (
                <View
                  key={plan.id}
                  className="tw-bg-card tw-rounded-card tw-p-4 tw-shadow-card"
                >
                  <View className="tw-flex tw-flex-row tw-items-start tw-justify-between tw-mb-3">
                    <View className="tw-flex-1">
                      <Text className="tw-text-base tw-font-semibold tw-text-ink-1 tw-block">
                        {plan.name}
                      </Text>
                    </View>
                    {plan.enabled && (
                      <View className="tw-bg-brand-50 tw-px-2 tw-py-1 tw-rounded-full">
                        <Text className="tw-text-brand-700 tw-text-xs">已启用</Text>
                      </View>
                    )}
                  </View>

                  <View className="tw-flex tw-flex-row tw-items-center tw-gap-4 tw-mb-3">
                    <View className="tw-flex tw-flex-row tw-items-center tw-gap-1">
                      <Text className="tw-text-ink-3 tw-text-base">📅</Text>
                      <Text className="tw-text-sm tw-text-ink-2">
                        {this.getScheduleDisplay(plan.scheduleType, plan.weekDays)}
                      </Text>
                    </View>
                    <View className="tw-flex tw-flex-row tw-items-center tw-gap-1">
                      <Text className="tw-text-ink-3 tw-text-base">⏰</Text>
                      <Text className="tw-text-sm tw-text-ink-2">{plan.reminderTime}</Text>
                    </View>
                  </View>

                  {plan.exercises && plan.exercises.length > 0 && (
                    <View className="tw-flex tw-flex-row tw-flex-wrap tw-gap-2">
                      {plan.exercises.slice(0, 4).map((planExercise) => (
                        <View
                          key={planExercise.id}
                          className="tw-bg-card-soft tw-px-2 tw-py-1 tw-rounded-full"
                        >
                          <Text className="tw-text-xs tw-text-ink-2">
                            {planExercise.exercise?.name}
                          </Text>
                        </View>
                      ))}
                      {plan.exercises.length > 4 && (
                        <View className="tw-bg-page-bg tw-px-2 tw-py-1 tw-rounded-full">
                          <Text className="tw-text-xs tw-text-ink-3">
                            +{plan.exercises.length - 4}
                          </Text>
                        </View>
                      )}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}
        </ScrollView>
        <TabBar current="training" />
      </View>
    );
  }
}
