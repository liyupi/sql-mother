import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "level26",
  title: "查询进阶 - 开窗函数 - sum over",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from student",
  answer:
    "SELECT \n" +
    "    id,\n" +
    "    name,\n" +
    "    age,\n" +
    "    score,\n" +
    "    class_id,\n" +
    "    AVG(score) OVER (PARTITION BY class_id) AS class_avg_score\n" +
    "FROM\n" +
    "    student;",
  hint: "求平均值需要使用哪个聚合函数呢？",
  type: "main",
} as LevelType;
