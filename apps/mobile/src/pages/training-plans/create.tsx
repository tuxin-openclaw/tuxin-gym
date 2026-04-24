import { Component, PropsWithChildren } from 'react';
import { View, Text, ScrollView, Input, Picker } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classNames from 'classnames';
import type {
  Exercise,
  BodyPart,
  EquipmentType,
  CreateTrainingPlanDto,
  ScheduleType,
} from '@tuxin-gym/shared';
import { getExercises, getBodyParts, getEquipmentTypes } from '../../services/exercise';
import { createTrainingPlan } from '../../services/training-plan';
import SubPageHeader from '../../components/sub-page-header';
import './create.scss';

const weekDayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

interface State {
  // 表单数据
  name: string;
  scheduleType: ScheduleType;
  selectedWeekDays: number[];
  reminderHour: string;
  reminderMinute: string;
  selectedExerciseIds: number[];

  // 数据源
  exercises: Exercise[];
  bodyParts: BodyPart[];
  equipmentTypes: EquipmentType[];

  // UI 状态
  exercisePickerExpanded: boolean;
  filterBodyPartId: number | null;
  filterEquipmentTypeId: number | null;
  submitting: boolean;
}

export default class CreateTrainingPlan extends Component<PropsWithChildren, State> {
  state: State = {
    name: '',
    scheduleType: 'daily',
    selectedWeekDays: [],
    reminderHour: '08',
    reminderMinute: '00',
    selectedExerciseIds: [],

    exercises: [],
    bodyParts: [],
    equipmentTypes: [],

    exercisePickerExpanded: false,
    filterBodyPartId: null,
    filterEquipmentTypeId: null,
    submitting: false,
  };

  hours: string[] = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
  minutes: string[] = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    try {
      const [exercises, bodyParts, equipmentTypes] = await Promise.all([
        getExercises(),
        getBodyParts(),
        getEquipmentTypes(),
      ]);
      this.setState({ exercises, bodyParts, equipmentTypes });
    } catch (error) {
      console.error('获取数据失败:', error);
      Taro.showToast({
        title: '获取数据失败',
        icon: 'none',
      });
    }
  }

  getBodyPartName = (bodyPartId: number) => {
    const { bodyParts } = this.state;
    const bodyPart = bodyParts.find((bp) => bp.id === bodyPartId);
    return bodyPart?.name || '未知部位';
  };

  getEquipmentTypeName = (equipmentTypeId: number) => {
    const { equipmentTypes } = this.state;
    const equipmentType = equipmentTypes.find((et) => et.id === equipmentTypeId);
    return equipmentType?.name || '未知器械';
  };

  toggleWeekDay = (day: number) => {
    const { selectedWeekDays } = this.state;
    if (selectedWeekDays.includes(day)) {
      this.setState({
        selectedWeekDays: selectedWeekDays.filter((d) => d !== day),
      });
    } else {
      this.setState({
        selectedWeekDays: [...selectedWeekDays, day].sort((a, b) => a - b),
      });
    }
  };

  toggleExercise = (exerciseId: number) => {
    const { selectedExerciseIds } = this.state;
    if (selectedExerciseIds.includes(exerciseId)) {
      this.setState({
        selectedExerciseIds: selectedExerciseIds.filter((id) => id !== exerciseId),
      });
    } else {
      this.setState({
        selectedExerciseIds: [...selectedExerciseIds, exerciseId],
      });
    }
  };

  getFilteredExercises = () => {
    const { exercises, filterBodyPartId, filterEquipmentTypeId } = this.state;
    return exercises.filter((exercise) => {
      if (filterBodyPartId && exercise.bodyPartId !== filterBodyPartId) return false;
      if (filterEquipmentTypeId && exercise.equipmentTypeId !== filterEquipmentTypeId)
        return false;
      return true;
    });
  };

  validateForm = (): boolean => {
    const { name, scheduleType, selectedWeekDays, selectedExerciseIds } = this.state;

    if (!name.trim()) {
      Taro.showToast({ title: '请输入计划名称', icon: 'none' });
      return false;
    }

    if (scheduleType === 'weekly' && selectedWeekDays.length === 0) {
      Taro.showToast({ title: '请选择至少一天', icon: 'none' });
      return false;
    }

    if (selectedExerciseIds.length === 0) {
      Taro.showToast({ title: '请选择至少一个动作', icon: 'none' });
      return false;
    }

    return true;
  };

  handleSubmit = async () => {
    if (!this.validateForm()) return;

    const {
      name,
      scheduleType,
      selectedWeekDays,
      reminderHour,
      reminderMinute,
      selectedExerciseIds,
    } = this.state;

    const data: CreateTrainingPlanDto = {
      name: name.trim(),
      scheduleType,
      weekDays: scheduleType === 'weekly' ? selectedWeekDays : undefined,
      reminderTime: `${reminderHour}:${reminderMinute}`,
      exerciseIds: selectedExerciseIds,
    };

    try {
      this.setState({ submitting: true });
      await createTrainingPlan(data);
      Taro.showToast({ title: '创建成功', icon: 'success' });
      setTimeout(() => Taro.navigateBack(), 1500);
    } catch (error) {
      console.error('创建失败:', error);
      Taro.showToast({ title: '创建失败', icon: 'none' });
      this.setState({ submitting: false });
    }
  };

  render() {
    const {
      name,
      scheduleType,
      selectedWeekDays,
      reminderHour,
      reminderMinute,
      selectedExerciseIds,
      exercises,
      bodyParts,
      exercisePickerExpanded,
      filterBodyPartId,
      submitting,
    } = this.state;

    const filteredExercises = this.getFilteredExercises();
    const selectedExercises = exercises.filter((e) => selectedExerciseIds.includes(e.id));

    return (
      <View className="g-page">
        <SubPageHeader title="新建训练计划" />
        <ScrollView className="tw-p-4">
          {/* 计划名称 */}
          <View className="tw-bg-card tw-rounded-card tw-p-4 tw-shadow-card tw-mb-4">
            <Text className="tw-text-sm tw-font-medium tw-text-ink-2 tw-block tw-mb-2">
              计划名称
            </Text>
            <Input
              className="tw-border tw-border-brand-100 tw-rounded-panel tw-px-3 tw-py-2 tw-text-sm"
              placeholder="例如：周一胸部训练"
              value={name}
              onInput={(e) => this.setState({ name: e.detail.value })}
            />
          </View>

          {/* 周期选择 */}
          <View className="tw-bg-card tw-rounded-card tw-p-4 tw-shadow-card tw-mb-4">
            <Text className="tw-text-sm tw-font-medium tw-text-ink-2 tw-block tw-mb-3">
              训练周期
            </Text>
            <View className="tw-flex tw-flex-row tw-gap-2">
              <View
                className={classNames(
                  'tw-flex-1 tw-py-2 tw-rounded-lg tw-text-center',
                  scheduleType === 'daily' ? 'tw-bg-brand-500' : 'tw-bg-page-bg'
                )}
                onClick={() => this.setState({ scheduleType: 'daily' })}
              >
                <Text
                  className={classNames(
                    'tw-text-sm tw-font-medium',
                    scheduleType === 'daily' ? 'tw-text-white' : 'tw-text-ink-2'
                  )}
                >
                  每天
                </Text>
              </View>
              <View
                className={classNames(
                  'tw-flex-1 tw-py-2 tw-rounded-lg tw-text-center',
                  scheduleType === 'weekly' ? 'tw-bg-brand-500' : 'tw-bg-page-bg'
                )}
                onClick={() => this.setState({ scheduleType: 'weekly' })}
              >
                <Text
                  className={classNames(
                    'tw-text-sm tw-font-medium',
                    scheduleType === 'weekly' ? 'tw-text-white' : 'tw-text-ink-2'
                  )}
                >
                  每周
                </Text>
              </View>
            </View>

            {/* 星期选择 - 周模式 */}
            {scheduleType === 'weekly' && (
              <View className="tw-mt-4">
                <Text className="tw-text-xs tw-text-ink-2 tw-block tw-mb-2">
                  选择星期（可多选）
                </Text>
                <View className="tw-flex tw-flex-row tw-flex-wrap tw-gap-2">
                  {weekDayNames.map((dayName, index) => (
                    <View
                      key={index}
                      className={classNames(
                        'tw-w-10 tw-h-10 tw-rounded-full tw-flex tw-items-center tw-justify-center',
                        selectedWeekDays.includes(index)
                          ? 'tw-bg-brand-500'
                          : 'tw-bg-page-bg'
                      )}
                      onClick={() => this.toggleWeekDay(index)}
                    >
                      <Text
                        className={classNames(
                          'tw-text-sm',
                          selectedWeekDays.includes(index) ? 'tw-text-white' : 'tw-text-ink-2'
                        )}
                      >
                        {dayName.charAt(1)}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>

          {/* 提醒时间 */}
          <View className="tw-bg-card tw-rounded-card tw-p-4 tw-shadow-card tw-mb-4">
            <Text className="tw-text-sm tw-font-medium tw-text-ink-2 tw-block tw-mb-3">
              提醒时间
            </Text>
            <View className="tw-flex tw-flex-row tw-items-center tw-gap-4">
              <View className="tw-flex-1">
                <Text className="tw-text-xs tw-text-ink-3 tw-block tw-mb-1">时</Text>
                <Picker
                  mode="selector"
                  range={this.hours}
                  value={this.hours.indexOf(reminderHour)}
                  onChange={(e) =>
                    this.setState({ reminderHour: this.hours[Number(e.detail.value)] })
                  }
                >
                  <View className="tw-border tw-border-brand-100 tw-rounded-panel tw-px-3 tw-py-2 tw-text-center">
                    <Text className="tw-text-sm">{reminderHour}</Text>
                  </View>
                </Picker>
              </View>
              <Text className="tw-text-2xl tw-text-ink-3 tw-self-end tw-mb-1">:</Text>
              <View className="tw-flex-1">
                <Text className="tw-text-xs tw-text-ink-3 tw-block tw-mb-1">分</Text>
                <Picker
                  mode="selector"
                  range={this.minutes}
                  value={this.minutes.indexOf(reminderMinute)}
                  onChange={(e) =>
                    this.setState({ reminderMinute: this.minutes[Number(e.detail.value)] })
                  }
                >
                  <View className="tw-border tw-border-brand-100 tw-rounded-panel tw-px-3 tw-py-2 tw-text-center">
                    <Text className="tw-text-sm">{reminderMinute}</Text>
                  </View>
                </Picker>
              </View>
            </View>
          </View>

          {/* 已选动作 */}
          <View className="tw-bg-card tw-rounded-card tw-p-4 tw-shadow-card tw-mb-4">
            <View className="tw-flex tw-flex-row tw-items-center tw-justify-between tw-mb-3">
              <Text className="tw-text-sm tw-font-medium tw-text-ink-2">
                已选动作 ({selectedExerciseIds.length})
              </Text>
              <Text
                className="tw-text-sm tw-text-brand-600"
                onClick={() => this.setState({ exercisePickerExpanded: !exercisePickerExpanded })}
              >
                {exercisePickerExpanded ? '收起' : '添加/编辑'}
              </Text>
            </View>

            {selectedExercises.length > 0 ? (
              <View className="tw-space-y-2">
                {selectedExercises.map((exercise) => (
                  <View
                    key={exercise.id}
                    className="tw-flex tw-flex-row tw-items-center tw-justify-between tw-bg-card-soft tw-p-3 tw-rounded-panel"
                  >
                    <View className="tw-flex-1">
                      <Text className="tw-text-sm tw-font-medium tw-text-ink-1 tw-block">
                        {exercise.name}
                      </Text>
                      <View className="tw-flex tw-flex-row tw-gap-2 tw-mt-1">
                        <Text className="tw-text-xs tw-text-ink-3">
                          {this.getBodyPartName(exercise.bodyPartId)}
                        </Text>
                        <Text className="tw-text-xs tw-text-ink-3">·</Text>
                        <Text className="tw-text-xs tw-text-ink-3">
                          {this.getEquipmentTypeName(exercise.equipmentTypeId)}
                        </Text>
                      </View>
                    </View>
                    <View
                      className="tw-ml-2 tw-w-6 tw-h-6 tw-flex tw-items-center tw-justify-center"
                      onClick={() => this.toggleExercise(exercise.id)}
                    >
                      <Text className="tw-text-ink-3">×</Text>
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <View
                className="tw-border tw-border-dashed tw-border-brand-100 tw-rounded-panel tw-py-8 tw-text-center"
                onClick={() => this.setState({ exercisePickerExpanded: true })}
              >
                <Text className="tw-text-ink-3">点击选择动作</Text>
              </View>
            )}
          </View>

          {/* 动作选择器 */}
          {exercisePickerExpanded && (
            <View className="tw-bg-card tw-rounded-card tw-p-4 tw-shadow-card tw-mb-4">
              <Text className="tw-text-sm tw-font-medium tw-text-ink-2 tw-block tw-mb-3">
                选择动作
              </Text>

              {/* 筛选标签 */}
              <View className="tw-mb-3">
                <ScrollView className="tw-flex tw-flex-row" scrollX showScrollbar={false}>
                  <View
                    className={classNames(
                      'tw-px-3 tw-py-1.5 tw-rounded-full tw-mr-2 tw-flex-shrink-0 tw-border',
                      filterBodyPartId === null
                        ? 'tw-bg-brand-500 tw-border-brand-500'
                        : 'tw-bg-card tw-border-brand-100'
                    )}
                    onClick={() => this.setState({ filterBodyPartId: null })}
                  >
                    <Text
                      className={classNames(
                        'tw-text-xs tw-font-medium',
                        filterBodyPartId === null ? 'tw-text-white' : 'tw-text-ink-2'
                      )}
                    >
                      全部部位
                    </Text>
                  </View>
                  {bodyParts.map((bodyPart) => (
                    <View
                      key={bodyPart.id}
                      className={classNames(
                        'tw-px-3 tw-py-1.5 tw-rounded-full tw-mr-2 tw-flex-shrink-0 tw-border',
                        filterBodyPartId === bodyPart.id
                          ? 'tw-bg-brand-500 tw-border-brand-500'
                          : 'tw-bg-card tw-border-brand-100'
                      )}
                      onClick={() => this.setState({ filterBodyPartId: bodyPart.id })}
                    >
                      <Text
                        className={classNames(
                          'tw-text-xs tw-font-medium',
                          filterBodyPartId === bodyPart.id ? 'tw-text-white' : 'tw-text-ink-2'
                        )}
                      >
                        {bodyPart.name}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              </View>

              {/* 动作列表 */}
              <View className="tw-max-h-80 tw-overflow-y-auto">
                {filteredExercises.map((exercise) => (
                  <View
                    key={exercise.id}
                    className={classNames(
                      'tw-flex tw-flex-row tw-items-center tw-p-3 tw-border-b tw-border-brand-50',
                      selectedExerciseIds.includes(exercise.id) ? 'tw-bg-brand-50' : ''
                    )}
                    onClick={() => this.toggleExercise(exercise.id)}
                  >
                    <View
                      className={classNames(
                        'tw-w-5 tw-h-5 tw-rounded tw-border tw-mr-3 tw-flex tw-items-center tw-justify-center',
                        selectedExerciseIds.includes(exercise.id)
                          ? 'tw-bg-brand-500 tw-border-brand-500'
                          : 'tw-border-brand-100'
                      )}
                    >
                      {selectedExerciseIds.includes(exercise.id) && (
                        <Text className="tw-text-white tw-text-xs">✓</Text>
                      )}
                    </View>
                    <View className="tw-flex-1">
                      <Text className="tw-text-sm tw-font-medium tw-text-ink-1 tw-block">
                        {exercise.name}
                      </Text>
                      <View className="tw-flex tw-flex-row tw-gap-2 tw-mt-1">
                        <Text className="tw-text-xs tw-text-ink-3">
                          {this.getBodyPartName(exercise.bodyPartId)}
                        </Text>
                        <Text className="tw-text-xs tw-text-ink-3">·</Text>
                        <Text className="tw-text-xs tw-text-ink-3">
                          {this.getEquipmentTypeName(exercise.equipmentTypeId)}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}
        </ScrollView>

        {/* 底部保存按钮 */}
        <View className="tw-absolute tw-bottom-0 tw-left-0 tw-right-0 tw-bg-card tw-p-4 tw-shadow-card tw-border-t tw-border-brand-50">
          <View
            className={classNames(
              'tw-py-3 tw-rounded-lg tw-text-center',
              submitting ? 'tw-bg-ink-3' : 'tw-bg-brand-500'
            )}
            onClick={!submitting ? this.handleSubmit : undefined}
          >
            <Text className="tw-text-white tw-font-medium">
              {submitting ? '保存中...' : '保存计划'}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
