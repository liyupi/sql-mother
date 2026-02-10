<template>
  <a-table
    class="sql-result-table"
    :columns="columns"
    :data-source="resultData"
    :row-key="(_: any, index: number) => index"
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

// 结果表格列头（使用索引作为 dataIndex，避免重复列名覆盖数据）
const columns = computed(() => {
  if (result?.value?.[0]?.columns) {
    return result.value[0].columns.map((column, index) => {
      return {
        title: column,
        dataIndex: `_col_${index}`,
      };
    });
  }
  return [];
});

// 结果表格数据（使用索引键映射，支持重复列名和未命名表达式列）
const resultData = computed(() => {
  if (!result?.value?.[0]?.values) {
    return [];
  }
  return result.value[0].values.map((originRow) => {
    const rowData: Record<string, any> = {};
    originRow.forEach((col, index) => {
      rowData[`_col_${index}`] = col;
    });
    return rowData;
  });
});
</script>

<style></style>
