<template>
  <div id="questionBoard">
    <a-card v-if="level" id="questionCard">
      <md-viewer :value="level.content" />
      <a-divider />
      <div>
        <a-button v-if="levelNum > 0" style="float: left" @click="toPrevLevel">
          上一关
        </a-button>
        <a-button
          v-if="levelNum < mainLevels.length - 1"
          type="primary"
          style="float: right"
          :disabled="resultStatus !== RESULT_STATUS_ENUM.SUCCEED"
          @click="toNextLevel"
        >
          下一关
        </a-button>
        <a-button
          v-if="levelNum === mainLevels.length - 1"
          type="primary"
          style="float: right"
          :disabled="resultStatus !== RESULT_STATUS_ENUM.SUCCEED"
          @click="doWin"
        >
          恭喜通关
        </a-button>
      </div>
    </a-card>
    <a-card v-else>关卡加载失败</a-card>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs, watch } from "vue";
import mainLevels from "../levels/mainLevels";
import { getCurrentLevelNum, getNextLevel, getPrevLevel } from "../levels";
import { useRouter } from "vue-router";
import { RESULT_STATUS_ENUM } from "../core/result";
import MdViewer from "./MdViewer.vue";

interface Props {
  level: LevelType;
  resultStatus: number;
}

const props = withDefaults(defineProps<Props>(), {});
const { level } = toRefs(props);
const router = useRouter();
const levelNum = computed(() => {
  return getCurrentLevelNum(level.value);
});

/**
 * 切换关卡时，回到顶部
 */
watch([levelNum], () => {
  scrollTo({
    top: 0,
  });
  const questionCardDom = document.getElementById("questionCard");
  if (questionCardDom) {
    questionCardDom.scrollTop = 0;
  }
});

/**
 * 通关
 */
const doWin = () => {
  alert("恭喜通关，有收获的话，欢迎给本项目一个 star 哦~");
  window.open("https://github.com/liyupi/sql-mother");
};

/**
 * 上一关
 */
const toPrevLevel = () => {
  const toLevel = getPrevLevel(level.value);
  if (toLevel) {
    router.push(`/learn/${toLevel.key}`);
  }
};

/**
 * 下一关
 */
const toNextLevel = () => {
  const toLevel = getNextLevel(level.value);
  if (toLevel) {
    router.push(`/learn/${toLevel.key}`);
  }
};
</script>

<style>
#questionBoard #questionCard {
  max-height: calc(100vh - 100px);
  min-height: 600px;
  overflow-y: auto;
}
</style>
