<template>
  <div id="playgroundPage">
    <h2>{{ t("playgroundDescription") }}</h2>
    <a-row :gutter="[16, 16]">
      <a-col :md="12" :xs="24">
        <sql-editor
          :level="allLevels[0]"
          :editor-style="{ height: 480 + 'px' }"
          :on-submit="onSubmit"
        />
        <a-card :title="t('queryHistory')" style="margin-top: 16px">
          <a-collapse v-if="sqlHistoryList.length > 0">
            <a-collapse-panel
              v-for="(data, index) in sqlHistoryList"
              :key="index"
              :header="data.sql"
            >
              <sql-result :result="data.result" :error-msg="data.errorMsg" />
            </a-collapse-panel>
          </a-collapse>
          <div v-else>{{ t("noQueryHistory") }}</div>
        </a-card>
      </a-col>
      <a-col :md="12" :xs="24">
        <sql-result :result="result" />
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import SqlEditor from "../components/SqlEditor.vue";
import { ref } from "vue";
import { QueryExecResult } from "sql.js";
import SqlResult from "../components/SqlResult.vue";
import { allLevels } from "../levels";
import { t } from "../i18n";

const result = ref<QueryExecResult[]>([]);
const sqlHistoryList = ref<any>([]);

/**
 * 执行
 * @param sql
 * @param res
 * @param _
 * @param errorMsg
 */
const onSubmit = (
  sql: string,
  res: QueryExecResult[],
  _: any,
  errorMsg?: string
) => {
  result.value = res;
  sqlHistoryList.value.push({
    sql,
    result: res,
    errorMsg,
  });
};
</script>

<style scoped></style>
