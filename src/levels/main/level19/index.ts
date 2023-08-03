import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "level19",
  title: "分组聚合 - having 子句",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from student",
  answer:
    "SELECT\n" +
    "  class_id,\n" +
    "  SUM(score) AS total_score\n" +
    "FROM\n" +
    "  student\n" +
    "GROUP BY\n" +
    "  class_id\n" +
    "HAVING\n" +
    "  SUM(score) > 150;",
  hint: "请仔细查看本关给出的示例",
  type: "main",
} as LevelType;
