<template>
  <div id="sqlEditor">
    <div ref="editorRef" :style="editorStyle" />
    <a-space :size="16" style="margin-top: 16px">
      <a-button type="primary" style="width: 180px" @click="doSubmit">
        运行
      </a-button>
      <a-button @click="doFormat">格式化</a-button>
      <a-button @click="doReset">重置</a-button>
      <a-switch v-model:checked="isSaveCode" @change="saveCodeChange" />暂存代码
    </a-space>
  </div>
</template>

<script setup lang="ts">
import {
  CSSProperties,
  onMounted,
  onUnmounted,
  ref,
  toRaw,
  toRefs,
  watchEffect,
} from "vue";
import * as monaco from "monaco-editor";
import { format } from "sql-formatter";
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import { initDB, runSQL } from "../core/sqlExecutor";
import { QueryExecResult } from "sql.js";
// eslint-disable-next-line no-undef
import IStandaloneCodeEditor = monaco.editor.IStandaloneCodeEditor;
import { message } from "ant-design-vue";
import { saveCode, readCode, deleteCode, setIsSaveCode, getIsSaveCode, deleteIsSaveCode } from "../core/saveCode";

(self as any).MonacoEnvironment = {
  getWorker(_: any, label: any) {
    return new EditorWorker();
  },
};

// @ts-ignore
interface SqlEditorProps {
  level: LevelType;
  editorStyle: CSSProperties;
  resultStatus: number;
  onSubmit: (
    sql: string,
    result: QueryExecResult[],
    answerResult: QueryExecResult[],
    errorMsg?: string
  ) => void;
}

const props = withDefaults(defineProps<SqlEditorProps>(), {});
const { level, onSubmit } = toRefs(props);
const inputEditor = ref<IStandaloneCodeEditor>();
const editorRef = ref<HTMLElement>();
const db = ref();
const isSaveCode = ref(getIsSaveCode());  // 是否暂存代码

watchEffect(async () => {
  // 初始化 / 更新默认 SQL
  if (inputEditor.value) {
    //尝试去ls中读出暂存的sql代码 ####
    var rowCode = readCode();
    if (!rowCode) {
      rowCode = "-- 请在此处输入 SQL\n" + level.value.defaultSQL;
    }
    toRaw(inputEditor.value).setValue(rowCode);
  }
  // 初始化 / 更新 DB
  db.value = await initDB(level.value.initSQL);
  doSubmit();
});

/**
 * SQL 格式化
 */
const doFormat = () => {
  if (!inputEditor.value) {
    return;
  }
  const inputStr = toRaw(inputEditor.value).getValue();
  // https://www.npmjs.com/package/sql-formatter
  const resultStr = format(inputStr, { language: "sqlite" });
  toRaw(inputEditor.value).setValue(resultStr);
};

/**
 * 重置
 */
const doReset = () => {
  if (inputEditor.value) {
    toRaw(inputEditor.value).setValue(level.value.defaultSQL);
    doSubmit();
  }
};

/**
 * 提交结果
 */
const doSubmit = () => {
  if (!inputEditor.value) {
    return;
  }
  const inputStr = toRaw(inputEditor.value).getValue();
  console.log("inputStr", inputStr);
  // 把代码保存到ls ####
  if (isSaveCode.value) {
    saveCode(inputStr);
  }
  try {
    const result = runSQL(db.value, inputStr);
    const answerResult = runSQL(db.value, level.value.answer);
    // 向外层传递结果
    onSubmit?.value(inputStr, result, answerResult);
  } catch (error: any) {
    message.error("语句错误，" + error.message);
    // 向外层传递结果
    onSubmit?.value(inputStr, [], [], error.message);
  }
};

const saveCodeChange = () => {
  setIsSaveCode(isSaveCode.value);
  if (!isSaveCode.value){
    // 清除ls中的代码 ####
    deleteCode();
  }
}

onMounted(async () => {
  // 初始化代码编辑器
  if (editorRef.value) {
    const initValue = "";
    inputEditor.value = monaco.editor.create(editorRef.value, {
      value: initValue,
      language: "sql",
      theme: "vs-dark",
      formatOnPaste: true,
      automaticLayout: true,
      fontSize: 16,
      minimap: {
        enabled: false,
      },
    });
    // 自动保存草稿
    // 暂不开启，刷新后恢复当前关卡的默认 SQL
    // setInterval(() => {
    //   if (inputEditor.value) {
    //     localStorage.setItem("draft", toRaw(inputEditor.value).getValue());
    //   }
    // }, 3000);
  }
});

/**
 * 释放资源
 */
onUnmounted(() => {
  if (inputEditor.value) {
    toRaw(inputEditor.value).dispose();
  }
});
</script>

<style></style>
