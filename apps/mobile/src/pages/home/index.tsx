import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import TabBar from "../../components/tab-bar";
import "./index.scss";

type QuickAction = {
  name: string;
  tip: string;
  icon: string;
  color: string;
  route?: string;
};

type RecentRecord = {
  name: string;
  time: string;
  duration: string;
  kcal: number;
  icon: string;
  color: string;
};

const quickActions: QuickAction[] = [
  {
    name: "训练计划",
    tip: "定制专属计划",
    icon: "📋",
    color: "#4c8dff",
    route: "/pages/training-plans/index",
  },
  {
    name: "动作库",
    tip: "1000+动作",
    icon: "🏋️",
    color: "#46cb87",
    route: "/pages/exercises/index",
  },
  {
    name: "数据统计",
    tip: "查看进步曲线",
    icon: "🕒",
    color: "#8a65ec",
  },
  {
    name: "体重记录",
    tip: "记录体重变化",
    icon: "🧡",
    color: "#f3973d",
  },
];

const recentRecords: RecentRecord[] = [
  {
    name: "胸部 + 三头训练",
    time: "5月20日 19:00",
    duration: "45分钟",
    kcal: 368,
    icon: "🏃",
    color: "#46cb87",
  },
  {
    name: "背部训练",
    time: "5月18日 18:30",
    duration: "50分钟",
    kcal: 412,
    icon: "🧎",
    color: "#4c8dff",
  },
  {
    name: "腿部训练",
    time: "5月16日 19:15",
    duration: "60分钟",
    kcal: 521,
    icon: "🦵",
    color: "#f3973d",
  },
];

const HomePage = () => {
  const jumpTo = (route?: string) => {
    if (!route) {
      Taro.showToast({ title: "功能开发中", icon: "none" });
      return;
    }

    Taro.redirectTo({ url: route });
  };

  return (
    <View className="g-page home g-safe-bottom">
      <View className="home__header">
        <View>
          <Text className="home__title g-title">健身记录</Text>
          <Text className="home__subtitle g-subtitle">记录每一次进步 💪</Text>
        </View>
      </View>

      <View className="home__hero">
        <View>
          <Text className="home__hero-title">Hi，今天也要加油呀！</Text>
          <Text className="home__hero-desc">自律给我自由</Text>
          <View
            className="home__hero-btn g-btn-primary"
            onClick={() => jumpTo("/pages/training-plans/index")}
          >
            <Text>开始训练 ▶</Text>
          </View>
        </View>
        <View className="home__hero-figure">
          <Text>🏋️‍♀️</Text>
        </View>
      </View>

      <View className="home__section">
        <View className="home__stats g-card">
          <View className="home__stats-head">
            <Text className="home__stats-title g-title">今日数据</Text>
            <Text className="home__stats-link">查看更多 〉</Text>
          </View>
          <View className="home__stats-grid">
            <View className="home__stat-item">
              <Text className="home__stat-icon">🔥</Text>
              <Text className="home__stat-label">训练时长</Text>
              <View>
                <Text className="home__stat-value">45</Text>
                <Text className="home__stat-unit">分钟</Text>
              </View>
            </View>
            <View className="home__stat-item">
              <Text className="home__stat-icon">🛍️</Text>
              <Text className="home__stat-label">消耗热量</Text>
              <View>
                <Text className="home__stat-value">368</Text>
                <Text className="home__stat-unit">千卡</Text>
              </View>
            </View>
            <View className="home__stat-item">
              <Text className="home__stat-icon">📊</Text>
              <Text className="home__stat-label">训练动作</Text>
              <View>
                <Text className="home__stat-value">6</Text>
                <Text className="home__stat-unit">个</Text>
              </View>
            </View>
            <View className="home__stat-item">
              <Text className="home__stat-icon">🏆</Text>
              <Text className="home__stat-label">连续天数</Text>
              <View>
                <Text className="home__stat-value">12</Text>
                <Text className="home__stat-unit">天</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View className="home__section">
        <View className="home__section-head">
          <Text className="home__section-title g-title">快捷功能</Text>
        </View>
        <View className="home__quick-grid">
          {quickActions.map((item) => (
            <View
              className="home__quick-item g-panel"
              key={item.name}
              onClick={() => jumpTo(item.route)}
            >
              <View
                className="home__quick-badge"
                style={{ backgroundColor: item.color }}
              >
                <Text className="home__quick-icon">{item.icon}</Text>
              </View>
              <Text className="home__quick-name">{item.name}</Text>
              <Text className="home__quick-tip">{item.tip}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className="home__section">
        <View className="home__section-head">
          <Text className="home__section-title g-title">最近训练</Text>
          <Text className="home__section-link">全部记录 〉</Text>
        </View>

        <View className="home__records">
          {recentRecords.map((item) => (
            <View className="home__record-item g-panel" key={item.name}>
              <View className="home__record-left">
                <View
                  className="home__record-dot"
                  style={{ backgroundColor: item.color }}
                >
                  <Text className="home__record-icon">{item.icon}</Text>
                </View>
                <View>
                  <View className="home__record-name">
                    <Text>{item.name}</Text>
                  </View>
                  <View className="home__record-time">
                    <Text>{item.time} · {item.duration}</Text>
                  </View>
                </View>
              </View>
              <View>
                <Text className="home__record-energy">{item.kcal}</Text>
                <Text className="home__record-energy-unit">千卡</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <TabBar current="home" />
    </View>
  );
};

export default HomePage;
