<template>
  <a-card
    id="sqlResult"
    :title="t('results')"
    :extra="statusText"
    :bordered="false"
    style="max-height: 420px; overflow-y: auto"
  >
    <sql-result-table v-if="!errorMsg" :result="result" />
    <div v-else>❌ {{ t("queryError", { error: errorMsg }) }}</div>
  </a-card>
</template>

<script setup lang="ts">
import { computed, toRefs } from "vue";
import { QueryExecResult } from "sql.js";
import SqlResultTable from "./SqlResultTable.vue";
import { t } from "../i18n";
import type { MessageKey } from "../i18n";

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
const statusKeys: Record<number, MessageKey> = {
  "-1": "notRun",
  0: "incorrect",
  1: "correct",
};
const statusText = computed(() => {
  const key = statusKeys[props.resultStatus];
  return key ? t(key) : undefined;
});
</script>

<style></style>
