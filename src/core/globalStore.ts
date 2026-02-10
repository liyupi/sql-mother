import { defineStore } from "pinia";
import { allLevels } from "../levels";
import { AIConfig } from "./ai.d";

/**
 * 全局状态存储
 *
 * @author yupi
 */
export const useGlobalStore = defineStore("global", {
  state: () => ({
    // 学习记录
    studyHistoryList: [],
    // 当前关卡
    currentLevel: { ...allLevels[0] },
    theme: "light",
    // AI 配置
    aiConfig: null as AIConfig | null,
  }),
  getters: {},
  // 持久化
  persist: {
    key: "global",
    storage: window.localStorage,
    beforeRestore: (context) => {
      console.log("load globalStore data start");
    },
    afterRestore: (context) => {
      console.log("load globalStore data end");
    },
  },
  actions: {
    reset() {
      this.$reset();
    },
    setTheme(theme: "light" | "dark") {
      this.theme = theme;
    },
    toggleTheme() {
      this.theme = this.theme === "dark" ? "light" : "dark";
    },
    setAIConfig(config: AIConfig | null) {
      this.aiConfig = config;
    },
  },
});
