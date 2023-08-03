import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "level27",
  title: "查询进阶 - 开窗函数 - sum over order by",
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
    "    SUM(score) OVER (PARTITION BY class_id ORDER BY score ASC) AS class_sum_score\n" +
    "FROM\n" +
    "    student;",
  hint: "请仔细查看本关给出的示例",
  type: "main",
} as LevelType;
