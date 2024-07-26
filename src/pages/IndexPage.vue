<template>
  <div id="indexPage">
    <a-row :gutter="[16, 16]">
      <a-col :lg="11" :xs="24">
        <question-board :level="level" :result-status="resultStatus" />
      </a-col>
      <a-col :lg="13" :xs="24">
        <sql-editor
          :level="level"
          :editor-style="{ height: '280px' }"
          :result-status="resultStatus"
          :on-submit="onSubmit"
        />
        <a-collapse v-model:active-key="activeKeys" style="margin-top: 16px">
          <a-collapse-panel
            key="result"
            header="查看执行结果"
            class="result-collapse-panel"
          >
            <sql-result
              :level="level"
              :result="result"
              :result-status="resultStatus"
              :answer-result="answerResult"
              :error-msg="errorMsgRef"
              style="margin-top: 16px"
            />
          </a-collapse-panel>
          <a-collapse-panel v-if="level.hint" key="hint" header="查看提示">
            <p>{{ level.hint }}</p>
          </a-collapse-panel>
          <a-collapse-panel key="ddl" header="查看建表语句">
            <code-editor
              :init-value="level.initSQL"
              :editor-style="{ minHeight: '400px' }"
              read-only
            />
          </a-collapse-panel>
          <a-collapse-panel key="answer" header="查看答案">
            <pre v-html="highlightCode(format(level.answer))"></pre>
          </a-collapse-panel>
        </a-collapse>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import hljs from 'highlight.js';
import { format } from "sql-formatter";
import SqlEditor from "../components/SqlEditor.vue";
import QuestionBoard from "../components/QuestionBoard.vue";
import SqlResult from "../components/SqlResult.vue";
import { computed, ref, watch, onMounted } from "vue";
import { QueryExecResult } from "sql.js";
import { allLevels, getLevelByKey } from "../levels";
import { checkResult } from "../core/result";
import CodeEditor from "../components/CodeEditor.vue";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import { saveLevelStore } from "../core/saveLevelStore";

interface IndexPageProps {
  levelKey?: string;
}


const props = defineProps<IndexPageProps>();
const level = computed(() => {
  if (props.levelKey) {
    return getLevelByKey(props.levelKey);
  }
  return allLevels[0];
});

const result = ref<QueryExecResult[]>([]);
const answerResult = ref<QueryExecResult[]>([]);
const errorMsgRef = ref<string>();
const resultStatus = ref<number>(-1);
const defaultActiveKeys = ["result"];
const activeKeys = ref([...defaultActiveKeys]);
const router = useRouter();
const levelStore = saveLevelStore();

// 加载缓存关卡
const loadSaveLevelKey = () => {
  const saveLevelKey = levelStore.level;
  if (!saveLevelKey) {
    return;
  }
  // 信息
  // 不用已经写好的, 那个有默认值,无法判断页面是否存在
  const levelInfo = allLevels.find((level) => {
    return level.key === saveLevelKey;
  });
  if (!levelInfo){
    // 如果没有信息,肯定是404,把数据清除掉,跳到首页
    levelStore.level = "";
    router.push(`/learn`);
    return;
  }
  // 跳转
  router.push(`/learn/${saveLevelKey}`);
  message.info(`您上次学到 ${levelInfo.title}，已自动为您跳转`);
};

/**
 * 页面启动时（挂载时)，加载保存的关卡 ####
 */
onMounted(() => {
  if (props.levelKey) {
    // 有levelKey说明url本身具有，用户可能是从关卡页面跳转过来的，不用跳转，保存起来即可
    // 页面刚刚挂载时不会触发watch里的事件，只能在这里解决
    levelStore.level = props.levelKey;
  } else {
    // 没有levelKey说明用户可能是在别的页面点击学习按钮或从index跳转过来的，加载之前的关卡
    // 如果用户已经在学习页面了，再次点击学习按钮，不会触发mounted事件，会触发下面的watch事件
    loadSaveLevelKey();
  }
});

/**
 * 切换关卡时，重置状态
 */
watch([level], () => {
  //保存关卡 ####
  if (props.levelKey) {
    levelStore.level = props.levelKey;
  }
  //如果用户已经在学习页面了，再次点击学习按钮，会跳转到/learn，会触发这个的watch事件
  //（因为上面computed中的props.levelKey发生改变，而且页面没有重载不会触发onMounted）
  //但是如果用户在level1，再次点击学习按钮，会跳转到/learn，不会触发这个的watch事件，不过反正都是level1，没影响
  //（因为虽然上面computed中的props.levelKey发生改变，computed重新运行，但是运行结果level的值并未改变，所以不会触发此watch事件）
  //所以如果props.levelKey变成了空的话，需要加载之前的关卡
  if (props.levelKey == "") {
    loadSaveLevelKey();
  }

  activeKeys.value = [...defaultActiveKeys];
});

/**
 * 执行结果
 * @param sql
 * @param res
 * @param answerRes
 * @param errorMsg
 */
const onSubmit = (
  sql: string,
  res: QueryExecResult[],
  answerRes: QueryExecResult[],
  errorMsg?: string
) => {
  result.value = res;
  answerResult.value = answerRes;
  errorMsgRef.value = errorMsg;
  resultStatus.value = checkResult(res, answerRes);
};

const highlightCode = (code: string) => {
  return hljs.highlightAuto(code).value;
};

</script>

<style>
.result-collapse-panel .ant-collapse-content-box {
  padding: 0 !important;
}
</style>
