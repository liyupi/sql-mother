import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "level25",
  title: "查询进阶 - 组合查询",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from student",
  answer:
    "select name, age, score, class_id from student\n" +
    "union all\n" +
    "select name, age, score, class_id from student_new;",
  hint: "请仔细查看本关给出的示例",
  type: "main",
} as LevelType;
