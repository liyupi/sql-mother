import { QueryExecResult } from "sql.js";

/**
 * 结果状态枚举
 */
export const RESULT_STATUS_ENUM = {
  DEFAULT: -1,
  ERROR: 0,
  SUCCEED: 1,
};

/**
 * 结果状态信息映射
 */
export const RESULT_STATUS_INFO_MAP = {
  "-1": "未执行",
  0: "❌ 错误",
  1: "✅ 正确",
};

/**
 * 将查询结果按列名排序归一化，返回 { columns, values }
 * 同时将行按照全部字段做字典序排序，消除行顺序差异
 */
const normalizeResult = (queryResult: QueryExecResult) => {
  const { columns, values } = queryResult;

  // 1. 按列名排序，得到新的索引映射
  const indexed = columns.map((col, i) => ({ col: col.toLowerCase(), i }));
  indexed.sort((a, b) => (a.col < b.col ? -1 : a.col > b.col ? 1 : 0));
  const sortedColumns = indexed.map((x) => x.col);

  // 2. 按新的列顺序重排每行数据
  const reorderedValues = values.map((row) => indexed.map((x) => row[x.i]));

  // 3. 按行内容字典序排序，消除行顺序差异
  reorderedValues.sort((a, b) => {
    for (let i = 0; i < a.length; i++) {
      const va = a[i] == null ? "" : String(a[i]);
      const vb = b[i] == null ? "" : String(b[i]);
      if (va < vb) return -1;
      if (va > vb) return 1;
    }
    return 0;
  });

  return { columns: sortedColumns, values: reorderedValues };
};

/**
 * 判断结果是否正确
 * @param result 用户结果
 * @param answerResult 答案结果
 */
export const checkResult = (
  result: QueryExecResult[],
  answerResult: QueryExecResult[]
) => {
  if (!result?.length || !answerResult?.length) {
    return RESULT_STATUS_ENUM.ERROR;
  }

  if (result.length !== answerResult.length) {
    return RESULT_STATUS_ENUM.ERROR;
  }

  for (let i = 0; i < result.length; i++) {
    const currentResult = result[i];
    const currentAnswer = answerResult[i];
    if (!currentResult || !currentAnswer) {
      return RESULT_STATUS_ENUM.ERROR;
    }

    const normResult = normalizeResult(currentResult);
    const normAnswer = normalizeResult(currentAnswer);

    // 列名需要一致（已归一化排序 + 小写）
    if (
      JSON.stringify(normResult.columns) !== JSON.stringify(normAnswer.columns)
    ) {
      return RESULT_STATUS_ENUM.ERROR;
    }

    // 数据需要一致（已归一化排序）
    if (
      JSON.stringify(normResult.values) !== JSON.stringify(normAnswer.values)
    ) {
      return RESULT_STATUS_ENUM.ERROR;
    }
  }

  return RESULT_STATUS_ENUM.SUCCEED;
};
