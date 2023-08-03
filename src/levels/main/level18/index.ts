import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "level18",
  title: "分组聚合 - 多字段分组",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from student",
  answer:
    "SELECT\n" +
    "  class_id,\n" +
    "  exam_num,\n" +
    "  COUNT(*) AS total_num\n" +
    "FROM\n" +
    "  student\n" +
    "GROUP BY\n" +
    "  class_id, exam_num;",
  hint: "请仔细查看本关给出的示例",
  type: "main",
} as LevelType;
