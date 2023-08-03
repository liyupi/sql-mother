import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "level16",
  title: "函数 - 聚合函数",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from student",
  answer:
    "SELECT\n" +
    "  SUM(score) AS total_score,\n" +
    "  AVG(score) AS avg_score,\n" +
    "  MAX(score) AS max_score,\n" +
    "  MIN(score) AS min_score\n" +
    "FROM\n" +
    "  student;",
  hint: "请仔细查看本关给出的示例",
  type: "main",
} as LevelType;
