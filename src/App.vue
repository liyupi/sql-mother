<template>
  <div id="app">
    <a-row class="header" type="flex" align="middle">
      <a-col flex="160px" style="margin: 0 auto">
        <RouterLink to="/">
          <a-row align="middle">
            <img src="./assets/logo.svg" alt="SQLearner" class="logo" />
            <span class="title">SQLearner</span>
          </a-row>
        </RouterLink>
      </a-col>
      <a-col flex="auto">
        <a-menu
          :selected-keys="selectedKeys"
          mode="horizontal"
          :style="{ lineHeight: '64px' }"
          @click="doClickMenu"
        >
          <a-menu-item key="/learn">学习</a-menu-item>
          <a-menu-item key="/levels">关卡</a-menu-item>
          <a-menu-item key="/playground">广场</a-menu-item>
        </a-menu>
      </a-col>
      <a-col flex="140px" class="theme-toggle">
        <a-switch
          :checked="isDark"
          checked-children="深色"
          un-checked-children="浅色"
          @change="handleThemeChange"
        />
      </a-col>
    </a-row>
    <div class="content">
      <router-view />
    </div>
    <div class="footer">
      <p>SQLearner - SQL 自学网站 ©{{ currentYear }}</p>
    </div>
    <a-back-top :style="{ right: '60px' }" />

    <!-- AI 助手侧边栏 -->
    <AISidebar v-if="showAISidebar" />
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useGlobalStore } from "./core/globalStore";

const AISidebar = defineAsyncComponent(
  () => import("./components/AISidebar.vue")
);

const route = useRoute();
const router = useRouter();
const selectedKeys = computed(() => {
  if (route.path === "/" || route.path.startsWith("/learn")) {
    return ["/learn"];
  }
  if (route.path.startsWith("/levels")) {
    return ["/levels"];
  }
  if (route.path.startsWith("/playground")) {
    return ["/playground"];
  }
  return [];
});
const showAISidebar = computed(() => {
  return (
    route.path === "/" ||
    route.path.startsWith("/learn") ||
    route.path.startsWith("/playground")
  );
});
const globalStore = useGlobalStore();
const isDark = computed(() => globalStore.theme === "dark");

// 获取当前年份
const currentYear = computed(() => new Date().getFullYear());

const doClickMenu = ({ key }: any) => {
  if (key && key !== "theme") {
    router.push({
      path: key,
    });
  }
};

const handleThemeChange = (checked: boolean) => {
  globalStore.theme = checked ? "dark" : "light";
};

watch(
  () => globalStore.theme,
  (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
  },
  { immediate: true }
);
</script>

<style scoped>
.header {
  border-bottom: 1px solid var(--border-color);
  padding: 0 24px;
  background: var(--header-bg);
}

.ant-menu-horizontal {
  border-bottom: none !important;
}

.logo {
  width: 56px;
}

.title {
  margin-left: 8px;
  font-size: 20px;
  color: var(--text-color);
}

.content {
  padding: 24px;
}

.theme-toggle {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.footer {
  padding: 12px;
  text-align: center;
  background: var(--footer-bg);
}

.footer p {
  margin-bottom: 4px;
}
</style>
