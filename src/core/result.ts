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
 * 判断结果是否正确
 * @param result 用户结果
 * @param answerResult 答案结果
 */
export const checkResult = (
  result: QueryExecResult[],
  answerResult: QueryExecResult[]
) => {
  if (!result?.[0] || !answerResult?.[0]) {
    return RESULT_STATUS_ENUM.ERROR;
  }
  // 列名需要一致
  const resultColumns = result[0].columns;
  const answerResultColumns = answerResult[0].columns;
  if (JSON.stringify(resultColumns) !== JSON.stringify(answerResultColumns)) {
    return RESULT_STATUS_ENUM.ERROR;
  }
  // 数据需要一致
  const resultValues = result[0].values;
  const answerResultValues = answerResult[0].values;
  if (JSON.stringify(resultValues) === JSON.stringify(answerResultValues)) {
    return RESULT_STATUS_ENUM.SUCCEED;
  }
  return RESULT_STATUS_ENUM.ERROR;
};
