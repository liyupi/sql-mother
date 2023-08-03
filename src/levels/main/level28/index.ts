import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "level28",
  title: "查询进阶 - 开窗函数 - rank",
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
    "    RANK() OVER (PARTITION BY class_id ORDER BY score DESC) AS ranking\n" +
    "FROM\n" +
    "    student;",
  hint: "要注意 partition by 和 order by 的字段",
  type: "main",
} as LevelType;
