<template>
  <a-table
    class="sql-result-table"
    :columns="columns"
    :data-source="resultData"
    size="middle"
    :pagination="{ hideOnSinglePage: true, pageSize: 20 }"
  />
</template>

<script setup lang="ts">
import { computed, toRefs } from "vue";
import { QueryExecResult } from "sql.js";

interface SqlResultProps {
  result: QueryExecResult[];
}

const props = withDefaults(defineProps<SqlResultProps>(), {
  result: () => [],
});

// e.g. [{"columns":["a","b"],"values":[[0,"hello"],[1,"world"]]}]
const { result } = toRefs(props);

// 结果表格列头
const columns = computed(() => {
  if (result?.value?.[0]?.columns) {
    return result.value[0].columns.map((column) => {
      return {
        title: column,
        dataIndex: column,
      };
    });
  }
  return [];
});

// 结果表格数据
const resultData = computed(() => {
  if (!result?.value?.[0]?.values) {
    return [];
  }
  const tempColumns = result.value[0].columns;
  return result.value[0].values.map((originRow) => {
    const rowData: Record<string, any> = {};
    originRow.forEach((col, index) => {
      rowData[tempColumns[index]] = col;
    });
    return rowData;
  });
});
</script>

<style></style>
