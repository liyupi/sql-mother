import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "level17",
  title: "分组聚合 - 单字段分组",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from student",
  answer:
    "SELECT\n" +
    "  class_id,\n" +
    "  AVG(score) AS avg_score\n" +
    "FROM\n" +
    "  student\n" +
    "GROUP BY\n" +
    "  class_id;",
  hint: "平均成绩可以使用哪个聚合函数呢？",
  type: "main",
} as LevelType;
