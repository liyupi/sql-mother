import { defineStore } from "pinia";

export const saveCodeStore = defineStore("saveCode", {
  state: () => {
    //数据
    return {
      saveCode: "",
      isSaveCode: true,
      autoLoadCode: false,
    };
  },
  persist: {
    //存储位置
    key: "saveCode",
    storage: window.localStorage,
  },
});
