import { defineStore } from "pinia";
import { allLevels } from "../levels";

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
  },
});
