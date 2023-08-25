<template>
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
    <div v-if="saveLevelKey" class="saveLevelKey">
      <a-button type="primary" @click="clearSaveLevelKey()">
        清空历史记录
      </a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import mainLevels from "../levels/mainLevels";
import customLevels from "../levels/customLevels";
import { ref } from "vue";
import { message } from "ant-design-vue";
import { saveLevelStore } from "../core/saveLevelStore";
import { storeToRefs } from "pinia";

const levelStore = saveLevelStore();
const saveLevelKey = ref(storeToRefs(levelStore).level);

const clearSaveLevelKey = () => {
  saveLevelKey.value = "";
  message.info(`清除成功！`);
};
</script>

<style scoped>
.saveLevelKey {
  margin-top: 8px;
}
</style>
