<template>
  <a-config-provider :locale="antdLocale">
  <div id="app">
    <a-row class="header" type="flex" align="middle">
      <a-col flex="none" style="margin: 0 auto">
        <RouterLink to="/">
          <a-row align="middle" :wrap="false">
            <img src="./assets/logo.png" :alt="t('appName')" class="logo" />
            <span class="title">{{ t("appName") }}</span>
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
          <a-menu-item key="/learn">{{ t("learn") }}</a-menu-item>
          <a-menu-item key="/levels">{{ t("levels") }}</a-menu-item>
          <a-menu-item key="/playground">{{ t("playground") }}</a-menu-item>
          <a-menu-item>
            <a href="https://www.code-nav.cn" target="_blank">
              <a-badge
                count="new"
                size="small"
                :offset="[16, 24]"
                color="green"
              >
                {{ t("codeNav") }}
              </a-badge>
            </a>
          </a-menu-item>
          <a-menu-item>
            <a href="https://www.mianshiya.com" target="_blank">
              <solution-outlined />
              {{ t("interviewQuestions") }}
            </a>
          </a-menu-item>
          <a-menu-item key="about">
            <span @click.stop="showAboutModal" style="cursor: pointer; display: inline-block; width: 100%;">
              <user-outlined />
              {{ t("aboutAuthor") }}
            </span>
          </a-menu-item>
          <a-menu-item>
            <a href="https://github.com/liyupi/sql-mother" target="_blank">
              <github-outlined />
              {{ t("starProject") }}
            </a>
          </a-menu-item>
        </a-menu>
      </a-col>
      <a-col>
        <select
          class="language-select"
          aria-label="语言 / Language"
          :value="locale"
          @change="changeLanguage"
        >
          <option v-for="item in locales" :key="item.code" :value="item.code">
            {{ item.label }}
          </option>
        </select>
      </a-col>
    </a-row>
    <div class="content">
      <router-view />
    </div>
    <div class="footer">
      <p>
        <a-space size="middle">
          <a href="https://www.code-nav.cn" target="_blank">{{ t("codeNav") }}</a>
          <a href="https://www.laoyujianli.com" target="_blank">{{ t("resumeBuilder") }}</a>
          <a href="https://www.mianshiya.com" target="_blank">{{ t("interviewPractice") }}</a>
        </a-space>
      </p>
      <p>
        {{ t("appName") }} - {{ t("tagline") }} ©{{ currentYear }} by
        <a href="https://github.com/liyupi" target="_blank">{{ t("authorName") }}</a>
      </p>
    </div>
    <a-back-top :style="{ right: '24px' }" />
    
    <!-- 关于作者弹窗组件 -->
    <AboutAuthorModal v-model:visible="aboutModalVisible" />
  </div>
  </a-config-provider>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import enUS from "ant-design-vue/es/locale/en_US";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import { locale, locales, setLocale, t } from "./i18n";
import { useRoute, useRouter } from "vue-router";
import { 
  GithubOutlined, 
  BookOutlined, 
  SolutionOutlined, 
  UserOutlined 
} from "@ant-design/icons-vue";
import AboutAuthorModal from "./components/AboutAuthorModal.vue";

const route = useRoute();
const router = useRouter();
const selectedKeys = computed(() => [route.path]);
const antdLocales = { "zh-CN": zhCN, en: enUS };
const antdLocale = computed(() => antdLocales[locale.value]);

const changeLanguage = (event: Event) => {
  setLocale((event.target as HTMLSelectElement).value);
};

watchEffect(() => {
  document.documentElement.lang = locale.value;
  document.title = t("pageTitle");
  document.querySelector('meta[name="description"]')?.setAttribute("content", t("pageDescription"));
  document.querySelector('meta[name="keywords"]')?.setAttribute("content", t("pageKeywords"));
});

// 获取当前年份
const currentYear = computed(() => new Date().getFullYear());

const aboutModalVisible = ref(false);

const showAboutModal = () => {
  aboutModalVisible.value = true;
};

const doClickMenu = ({ key }: any) => {
  if (key && key !== "about") {
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
  white-space: nowrap;
}

.language-select {
  margin-left: 12px;
  padding: 4px 8px;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  background: #fff;
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
