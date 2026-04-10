import { Component, PropsWithChildren } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classNames from 'classnames';
import type { Exercise, BodyPart, EquipmentType } from '@tuxin-gym/shared';
import { getExercises, getBodyParts, getEquipmentTypes } from '../../services/exercise';
import './index.scss';

interface State {
  exercises: Exercise[];
  bodyParts: BodyPart[];
  equipmentTypes: EquipmentType[];
  loading: boolean;
  selectedBodyPartId: number | null;
  selectedEquipmentTypeId: number | null;
}

export default class Exercises extends Component<PropsWithChildren, State> {
  state: State = {
    exercises: [],
    bodyParts: [],
    equipmentTypes: [],
    loading: true,
    selectedBodyPartId: null,
    selectedEquipmentTypeId: null,
  };

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    try {
      this.setState({ loading: true });
      const [exercises, bodyParts, equipmentTypes] = await Promise.all([
        getExercises(),
        getBodyParts(),
        getEquipmentTypes(),
      ]);
      this.setState({
        exercises,
        bodyParts,
        equipmentTypes,
        loading: false,
      });
    } catch (error) {
      console.error('获取数据失败:', error);
      Taro.showToast({
        title: '获取数据失败',
        icon: 'none',
      });
      this.setState({ loading: false });
    }
  }

  async fetchExercises() {
    try {
      const { selectedBodyPartId, selectedEquipmentTypeId } = this.state;
      const filter = {
        bodyPartId: selectedBodyPartId || undefined,
        equipmentTypeId: selectedEquipmentTypeId || undefined,
      };
      const exercises = await getExercises(filter);
      this.setState({ exercises });
    } catch (error) {
      console.error('获取动作列表失败:', error);
      Taro.showToast({
        title: '获取数据失败',
        icon: 'none',
      });
    }
  }

  handleBodyPartSelect = (bodyPartId: number | null) => {
    this.setState({ selectedBodyPartId: bodyPartId }, () => {
      this.fetchExercises();
    });
  };

  handleEquipmentTypeSelect = (equipmentTypeId: number | null) => {
    this.setState({ selectedEquipmentTypeId: equipmentTypeId }, () => {
      this.fetchExercises();
    });
  };

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

  render() {
    const {
      exercises,
      bodyParts,
      equipmentTypes,
      loading,
      selectedBodyPartId,
      selectedEquipmentTypeId,
    } = this.state;

    if (loading) {
      return (
        <View className="tw-flex tw-items-center tw-justify-center tw-h-screen">
          <Text className="tw-text-gray-500">加载中...</Text>
        </View>
      );
    }

    return (
      <View className="g-page">
        {/* 头部筛选区域 */}
        <View className="tw-bg-white tw-p-4 tw-shadow-sm">
          <Text className="tw-text-lg tw-font-bold tw-text-gray-800 tw-mb-4 tw-block">
            健身动作
          </Text>

          {/* 部位筛选 */}
          <View className="tw-mb-4">
            <Text className="tw-text-sm tw-font-medium tw-text-gray-600 tw-mb-2 tw-block">
              部位筛选
            </Text>
            <ScrollView className="tw-flex tw-flex-row" scrollX showScrollbar={false}>
              <View
                className={classNames(
                  'tw-px-4 tw-py-2 tw-rounded-full tw-mr-2 tw-flex-shrink-0',
                  selectedBodyPartId === null
                    ? 'tw-bg-blue-500 tw-text-white'
                    : 'tw-bg-gray-100 tw-text-gray-600'
                )}
                onClick={() => this.handleBodyPartSelect(null)}
              >
                <Text
                  className={classNames(
                    'tw-text-sm',
                    selectedBodyPartId === null ? 'tw-text-white' : 'tw-text-gray-600'
                  )}
                >
                  全部
                </Text>
              </View>
              {bodyParts.map((bodyPart) => (
                <View
                  key={bodyPart.id}
                  className={classNames(
                    'tw-px-4 tw-py-2 tw-rounded-full tw-mr-2 tw-flex-shrink-0',
                    selectedBodyPartId === bodyPart.id ? 'tw-bg-blue-500' : 'tw-bg-gray-100'
                  )}
                  onClick={() => this.handleBodyPartSelect(bodyPart.id)}
                >
                  <Text
                    className={classNames(
                      'tw-text-sm',
                      selectedBodyPartId === bodyPart.id ? 'tw-text-white' : 'tw-text-gray-600'
                    )}
                  >
                    {bodyPart.name}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* 器械筛选 */}
          <View>
            <Text className="tw-text-sm tw-font-medium tw-text-gray-600 tw-mb-2 tw-block">
              器械筛选
            </Text>
            <ScrollView className="tw-flex tw-flex-row" scrollX showScrollbar={false}>
              <View
                className={classNames(
                  'tw-px-4 tw-py-2 tw-rounded-full tw-mr-2 tw-flex-shrink-0',
                  selectedEquipmentTypeId === null ? 'tw-bg-green-500' : 'tw-bg-gray-100'
                )}
                onClick={() => this.handleEquipmentTypeSelect(null)}
              >
                <Text
                  className={classNames(
                    'tw-text-sm',
                    selectedEquipmentTypeId === null ? 'tw-text-white' : 'tw-text-gray-600'
                  )}
                >
                  全部
                </Text>
              </View>
              {equipmentTypes.map((equipmentType) => (
                <View
                  key={equipmentType.id}
                  className={classNames(
                    'tw-px-4 tw-py-2 tw-rounded-full tw-mr-2 tw-flex-shrink-0',
                    selectedEquipmentTypeId === equipmentType.id
                      ? 'tw-bg-green-500'
                      : 'tw-bg-gray-100'
                  )}
                  onClick={() => this.handleEquipmentTypeSelect(equipmentType.id)}
                >
                  <Text
                    className={classNames(
                      'tw-text-sm',
                      selectedEquipmentTypeId === equipmentType.id
                        ? 'tw-text-white'
                        : 'tw-text-gray-600'
                    )}
                  >
                    {equipmentType.name}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* 动作列表 */}
        <ScrollView className="tw-p-4">
          {exercises.length === 0 ? (
            <View className="tw-flex tw-items-center tw-justify-center tw-py-12">
              <Text className="tw-text-gray-400">暂无动作</Text>
            </View>
          ) : (
            <View className="tw-space-y-3">
              {exercises.map((exercise) => (
                <View key={exercise.id} className="tw-bg-white tw-rounded-lg tw-p-4 tw-shadow-sm">
                  <View className="tw-flex tw-flex-row tw-justify-between tw-items-start tw-mb-2">
                    <View className="tw-flex-1">
                      <Text className="tw-text-base tw-font-semibold tw-text-gray-800 tw-block">
                        {exercise.name}
                      </Text>
                      <Text className="tw-text-xs tw-text-gray-400 tw-mt-1 tw-block">
                        {exercise.nameEn}
                      </Text>
                    </View>
                  </View>
                  {exercise.description && (
                    <Text className="tw-text-sm tw-text-gray-600 tw-mb-3 tw-line-clamp-2">
                      {exercise.description}
                    </Text>
                  )}
                  <View className="tw-flex tw-flex-row tw-gap-2">
                    <View className="tw-bg-blue-50 tw-px-3 tw-py-1 tw-rounded-full">
                      <Text className="tw-text-xs tw-text-blue-600">
                        {this.getBodyPartName(exercise.bodyPartId)}
                      </Text>
                    </View>
                    <View className="tw-bg-green-50 tw-px-3 tw-py-1 tw-rounded-full">
                      <Text className="tw-text-xs tw-text-green-600">
                        {this.getEquipmentTypeName(exercise.equipmentTypeId)}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}
