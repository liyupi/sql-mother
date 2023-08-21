<template>
  <div id="levelsPage">
    <a-row :gutter="[16, 16]">
      <a-col :md="12" :xs="24">
        <a-card title="主线关卡">
          <a-list item-layout="horizontal" :data-source="mainLevels">
            <template #renderItem="{ item: level, index }">
              <a-list-item>
                <template #actions>
                  <router-link :to="`/learn/${level.key}`">
                    <a-list-item-meta :title="`${index + 1}、${level.title}`" />
                    <a-button>挑战</a-button>
                  </router-link>
                </template>
              </a-list-item>
            </template>
          </a-list>
        </a-card>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-card title="自定义关卡">
          <a-list item-layout="horizontal" :data-source="customLevels">
            <template #renderItem="{ item: level }">
              <a-list-item>
                <template #actions>
                  <router-link :to="`/learn/${level.key}`">
                    <a-list-item-meta :title="level.title" />
                    <a-button>挑战</a-button>
                  </router-link>
                </template>
              </a-list-item>
            </template>
          </a-list>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import mainLevels from "../levels/mainLevels";
import customLevels from "../levels/customLevels";
</script>

<style scoped>
:deep .ant-list-item a {
  display: flex;
  align-items: center;
}
:deep .ant-list-item-action {
  width: 100%;
  margin-left: 0;
}
:deep .ant-list-item-action > li {
  display: block;
  text-align: unset;
}
:deep .ant-list-item-meta-title:hover {
  color: #40a9ff;
}
</style>
