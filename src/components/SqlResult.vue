<template>
  <a-card
    id="sqlResult"
    class="sql-result-card"
    title="执行结果"
    :extra="RESULT_STATUS_INFO_MAP[resultStatus as unknown as keyof typeof RESULT_STATUS_INFO_MAP]"
    :bordered="false"
  >
    <sql-result-table v-if="!errorMsg" :result="result" />
    <div v-else>❌ 语句错误:{{ errorMsg }}</div>
  </a-card>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
import { QueryExecResult } from "sql.js";
import SqlResultTable from "./SqlResultTable.vue";
import { RESULT_STATUS_INFO_MAP } from "../core/result";

interface Props {
  result: QueryExecResult[];
  answerResult: QueryExecResult[];
  resultStatus: number;
  errorMsg?: string;
  // eslint-disable-next-line vue/require-default-prop
  level?: LevelType;
}

const props = withDefaults(defineProps<Props>(), {
  result: () => [],
  answerResult: () => [],
  errorMsg: () => "",
});

// e.g. [{"columns":["a","b"],"values":[[0,"hello"],[1,"world"]]}]
const { result } = toRefs(props);
</script>

<style scoped>
.sql-result-card {
  max-height: 420px;
  overflow-y: auto;
}

.sql-result-card::-webkit-scrollbar {
  width: 6px;
}

.sql-result-card::-webkit-scrollbar-track {
  background: transparent;
  margin: 8px 0;
}

.sql-result-card::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.12);
  border-radius: 3px;
}

.sql-result-card::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.2);
}

:global([data-theme="dark"] .sql-result-card::-webkit-scrollbar-thumb) {
  background: rgba(148, 163, 184, 0.35);
}

:global([data-theme="dark"] .sql-result-card::-webkit-scrollbar-thumb:hover) {
  background: rgba(148, 163, 184, 0.5);
}
</style>
