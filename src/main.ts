import { createApp } from "vue";
import Antd from "ant-design-vue";
import App from "./App.vue";
import * as VueRouter from "vue-router";
import routes from "./configs/routes";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import "ant-design-vue/dist/antd.css";
import "./style.css";

// 路由
const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

// 状态管理
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createApp(App).use(Antd).use(router).use(pinia).mount("#app");
