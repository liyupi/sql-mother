<template>
  <div id="app">
    <a-row class="header" type="flex" align="middle">
      <a-col flex="160px" style="margin: 0 auto">
        <RouterLink to="/">
          <a-row align="middle">
            <img src="./assets/logo.png" alt="SQL之母" class="logo" />
            <span class="title">SQL之母</span>
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
          <a-menu-item>
            <a href="https://www.code-nav.cn" target="_blank">
              <a-badge
                count="new"
                size="small"
                :offset="[16, 24]"
                color="green"
              >
                <book-outlined />
                编程导航
              </a-badge>
            </a>
          </a-menu-item>
          <a-menu-item>
            <a href="https://github.com/liyupi/sql-mother" target="_blank">
              <github-outlined />
              代码开源
            </a>
          </a-menu-item>
        </a-menu>
      </a-col>
    </a-row>
    <div class="content">
      <router-view />
    </div>
    <div class="footer">
      <p>
        <a-space size="middle">
          <a href="https://www.code-nav.cn" target="_blank">编程导航</a>
          <a href="https://www.laoyujianli.com" target="_blank">写简历神器</a>
          <a href="https://www.mianshiya.com" target="_blank">面试刷题</a>
        </a-space>
      </p>
      <p>
        SQL之母 - SQL 自学网站 ©{{ currentYear }} by
        <a href="https://github.com/liyupi" target="_blank">程序员鱼皮</a>
      </p>
    </div>
    <a-back-top :style="{ right: '24px' }" />
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { GithubOutlined, BookOutlined } from "@ant-design/icons-vue";

const route = useRoute();
const router = useRouter();
const selectedKeys = computed(() => [route.path]);

// 获取当前年份
const currentYear = computed(() => new Date().getFullYear());

/**
 * 点击菜单跳转
 * @param key
 */
const doClickMenu = ({ key }: any) => {
  if (key) {
    router.push({
      path: key,
    });
  }
};
</script>
<style scoped>
.header {
  border-bottom: 1px solid #f0f0f0;
  padding: 0 24px;
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
  color: #000;
}

.content {
  padding: 24px;
}

.footer {
  padding: 12px;
  text-align: center;
  background: #efefef;

  p {
    margin-bottom: 4px;
  }
}
</style>
