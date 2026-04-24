import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.scss";

export type TabKey = "home" | "training" | "exercises" | "profile";

interface TabBarProps {
  current: TabKey;
}

const tabs = [
  {
    key: "home" as TabKey,
    icon: "🏠",
    label: "首页",
    url: "/pages/home/index",
  },
  {
    key: "training" as TabKey,
    icon: "🏋️",
    label: "训练",
    url: "/pages/training-plans/index",
  },
  {
    key: "exercises" as TabKey,
    icon: "🧾",
    label: "动作库",
    url: "/pages/exercises/index",
  },
  { key: "profile" as TabKey, icon: "👤", label: "我的", url: "" },
];

const TabBar = ({ current }: TabBarProps) => {
  const handleTap = (tab: (typeof tabs)[0]) => {
    if (tab.key === current) return;
    if (!tab.url) {
      Taro.showToast({ title: "开发中", icon: "none" });
      return;
    }
    Taro.redirectTo({ url: tab.url });
  };

  return (
    <View className="tab-bar">
      {tabs.map((tab) => (
        <View
          key={tab.key}
          className={`tab-bar__item${tab.key === current ? " tab-bar__item--active" : ""}`}
          onClick={() => handleTap(tab)}
        >
          <View className="tab-bar__icon">
            <Text>{tab.icon}</Text>
          </View>
          <View className="tab-bar__label">
            <Text>{tab.label}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default TabBar;
