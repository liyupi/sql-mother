<template>
  <div id="sqlEditor">
    <div ref="editorRef" :style="editorStyle"/>
    <a-space :size="16" style="margin-top: 16px">
      <a-button type="primary" style="width: 180px" @click="doSubmit">
        运行
      </a-button>
      <a-button @click="doFormat">格式化</a-button>
      <a-button @click="doReset">重置</a-button>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import {CSSProperties, onMounted, onUnmounted, ref, toRaw, toRefs, watchEffect,} from "vue";
import * as monaco from "monaco-editor";
import {format} from "sql-formatter";
import EditorWorker, {CompletionItem} from "monaco-editor/esm/vs/editor/editor.worker?worker";
import {initDB, runSQL} from "../core/sqlExecutor";
import {QueryExecResult} from "sql.js";
import {message} from "ant-design-vue";
// eslint-disable-next-line no-undef
import IStandaloneCodeEditor = monaco.editor.IStandaloneCodeEditor;

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
const {level, onSubmit} = toRefs(props);
const inputEditor = ref<IStandaloneCodeEditor>();
const editorRef = ref<HTMLElement>();
const db = ref();

monaco.languages.registerCompletionItemProvider("sql", {
  provideCompletionItems: (model, position) => {
    const keywords: CompletionItem[] = [
      {
        label: 'SELECT',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: 'SELECT '
      },
      {
        label: 'FROM',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: 'FROM '
      },
      {
        label: 'WHERE',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: 'WHERE '
      },
      {
        label: 'GROUP BY',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: 'GROUP BY '
      },
      {
        label: 'ORDER BY',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: 'ORDER BY '
      },
      {
        label: 'HAVING',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: 'HAVING '
      },
      {
        label: 'LIMIT',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: 'LIMIT '
      },
      {
        label: 'OFFSET',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: 'OFFSET '
      },
      {
        label: 'JOIN',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: 'JOIN x ON'
      },
      {
        label: 'LEFT JOIN',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: 'LEFT JOIN x ON'
      },
      {
        label: 'RIGHT JOIN',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: 'RIGHT JOIN x ON'
      },
      {
        label: 'FULL JOIN',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: 'FULL JOIN x ON'
      },
      {
        label: 'DISTINCT',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: 'DISTINCT '
      },
      {
        label: 'LIKE',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: 'LIKE \'%%\''
      },
      {
        label: 'CASE',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: 'CASE WHEN () THEN \'\' ELSE \'\' END AS temp'
      },
      {
        label: 'EXISTS',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: 'EXISTS '
      },
      {
        label: 'IN',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: 'IN '
      },
      {
        label: 'DESC',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: 'DESC'
      },
      {
        label: 'IS NOT NULL',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: 'IS NOT NULL '
      },
      {
        label: 'IS NULL',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: 'IS NULL '
      },
    ]
    const functions: CompletionItem[] = [
      {
        label: 'COUNT',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: 'COUNT(*)'
      },
      {
        label: 'MAX',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: 'MAX(x)'
      },
      {
        label: 'MIN',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: 'MIN(x)'
      },
      {
        label: 'SUM',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: 'SUM(x)'
      },
      {
        label: 'IFNULL',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: 'IFNULL(true_value, false_value)'
      },
      {
        label: 'RANK',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: 'RANK()'
      },
      {
        label: 'LEAD',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: 'LEAD(column_name, offset, default_value)'
      },
      {
        label: 'LAG',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: 'LAG(column_name, offset, default_value)'
      },
      {
        label: 'OVER (PARTITION BY x)',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: 'OVER (PARTITION BY x)'
      },
    ]
    const stringFunctions = [{
      label: 'CONCAT',
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: 'CONCAT(x)',
      documentation: 'Concatenate two or more strings',
    },
      {
        label: 'SUBSTRING',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: 'SUBSTRING(x, y, z)',
        documentation: 'Extract a substring from a string',
      },
      {
        label: 'TRIM',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: 'TRIM(x)',
        documentation: 'Remove leading and trailing whitespace',
      },
      {
        label: 'LTRIM',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: 'LTRIM(x)',
        documentation: 'Remove leading whitespace',
      },
      {
        label: 'RTRIM',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: 'RTRIM(x)',
        documentation: 'Remove trailing whitespace',
      },
      {
        label: 'LOWER',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: 'LOWER(x)',
        documentation: 'Convert string to lower case',
      },
      {
        label: 'UPPER',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: 'UPPER(x)',
        documentation: 'Convert string to upper case',
      },]
    return {suggestions: [...keywords, ...functions, ...stringFunctions]};
  }
});

watchEffect(async () => {
  // 初始化 / 更新默认 SQL
  if (inputEditor.value) {
    toRaw(inputEditor.value).setValue(
        "-- 请在此处输入 SQL\n" + level.value.defaultSQL
    );
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
  const resultStr = format(inputStr, {language: "sqlite"});
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
      quickSuggestions: true,
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
