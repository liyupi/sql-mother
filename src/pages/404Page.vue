<template>
  <a-result status="404" title="404" sub-title="当前页面不存在！">
    <template #extra>
      <a-button type="primary" @click="backToIndex()">返回首页</a-button>
    </template>
  </a-result>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter();

const backToIndex = () => {
  router.push({ 
    path: '/learn/level1'
  });
}
</script>

<style>
.ant-result {
  /* 158px = 64px(头部菜单) + 24px * 2(正文上下padding) + 46px(底部footer) */
  height: calc(100vh - 158px);
  padding: 20px 32px !important;
}
</style>
