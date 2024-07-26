import { defineStore } from "pinia";

export const saveLevelStore = defineStore("saveLevel", {
  state: () => {
    //数据
    return {
      level: "",
    };
  },
  persist: {
    //存储位置
    key: "learnLevel",
    storage: window.localStorage,
  },
});