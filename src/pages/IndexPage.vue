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
            {{ level.answer }}
          </a-collapse-panel>
        </a-collapse>
      </a-col>
    </a-row>
    <div class="saveCodeSettings">
      代码保存设置:
      <a-switch v-model:checked="isSaveCode" @change="saveCodeChange" />暂存代码
      <a-switch v-model:checked="autoLoadCode" />自动加载代码
    </div>
  </div>
</template>

<script setup lang="ts">
import SqlEditor from "../components/SqlEditor.vue";
import QuestionBoard from "../components/QuestionBoard.vue";
import SqlResult from "../components/SqlResult.vue";
import { computed, ref, watch } from "vue";
import { QueryExecResult } from "sql.js";
import { allLevels, getLevelByKey } from "../levels";
import { checkResult } from "../core/result";
import CodeEditor from "../components/CodeEditor.vue";
import { saveCodeStore } from "../core/saveCodeStore";
import { storeToRefs } from "pinia";

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
const store = saveCodeStore();
const isSaveCode = ref(storeToRefs(store).isSaveCode); // 是否暂存代码
const autoLoadCode = ref(storeToRefs(store).autoLoadCode); // 是否自动加载代码

/**
 * 切换关卡时，重置状态
 */
watch([level], () => {
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

const saveCodeChange = () => {
  store.isSaveCode = isSaveCode.value;
  if (!isSaveCode.value) {
    // 清除ls中的代码 ####
    store.saveCode = "";
  } 
  // else if (isSaveCode.value && inputEditor.value) {
  //   //this.$refs.sqlEditor
  //   // 开启功能，保存代码
  //   const inputStr = toRaw(inputEditor.value).getValue();
  //   store.saveCode = inputStr;
  // }
};

// 开启自动加载代码必须先开启暂存代码
// 关闭暂存代码必须先关闭自动加载代码
watch(isSaveCode, (newValue, oldValue) => {
  if (!newValue) {
    autoLoadCode.value = false;
  }
});
watch(autoLoadCode, (newValue, oldValue) => {
  if (newValue) {
    isSaveCode.value = true;
  }
});
</script>

<style>
.result-collapse-panel .ant-collapse-content-box {
  padding: 0 !important;
}
.saveCodeSettings {
  margin-top: 8px;
}
.saveCodeSettings .ant-switch {
  margin-left: 8px;
}
</style>
