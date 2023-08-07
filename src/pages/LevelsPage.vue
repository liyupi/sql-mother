<template>
  <div v-if="saveLevelKey" class="saveLevelKey">
    <a-button type="primary" @click="clearSaveLevelKey()">
      清空历史记录
    </a-button>
  </div>
  <div id="levelsPage">
    <a-row :gutter="[16, 16]">
      <a-col :md="12" :xs="24">
        <a-card title="主线关卡">
          <a-list item-layout="horizontal" :data-source="mainLevels">
            <template #renderItem="{ item: level, index }">
              <a-list-item>
                <a-list-item-meta :title="`${index + 1}、${level.title}`" />
                <a-tag v-if="level.key == saveLevelKey" color="blue">
                  上次学到
                </a-tag>
                <template #actions>
                  <router-link :to="`/learn/${level.key}`">
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
                <a-list-item-meta :title="level.title" />
                <a-tag v-if="level.key == saveLevelKey" color="blue">
                  上次学到
                </a-tag>
                <template #actions>
                  <router-link :to="`/learn/${level.key}`">
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
import { onMounted, ref } from "vue";
import { message } from "ant-design-vue";
import { readLevel, deleteLevel } from "../core/saveLevel";

const saveLevelKey = ref();

// 打开页面时加载保存的levelKey
onMounted(() => {
  loadSaveLevelKey();
});

// 加载缓存关卡
const loadSaveLevelKey = () => {
  const saveLevelKeyStorage = readLevel();
  if (!saveLevelKeyStorage) {
    saveLevelKey.value = "";
    return;
  }
  saveLevelKey.value = saveLevelKeyStorage;
};

const clearSaveLevelKey = () => {
  deleteLevel();
  loadSaveLevelKey();
  message.info(`清除成功！`);
};
</script>

<style scoped>
.saveLevelKey {
  margin-bottom: 6px;
}
</style>
