import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "level24",
  title: "查询进阶 - 子查询 - exists",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from student",
  answer:
    "select name, age, class_id from student where not exists (select class_id from class where class.id = student.class_id);",
  hint: "请仔细查看本关给出的示例",
  type: "main",
} as LevelType;
