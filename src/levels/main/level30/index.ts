import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "level30",
  title: "查询进阶 - 开窗函数 - lag / lead",
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
    "    LAG(name) over (PARTITION BY class_id ORDER BY score DESC) as prev_name,\n" +
    "    LEAD(name) OVER (PARTITION BY class_id ORDER BY score DESC) AS next_name\n" +
    "FROM\n" +
    "    student;",
  hint: "请仔细查看本关给出的示例",
  type: "main",
} as LevelType;
