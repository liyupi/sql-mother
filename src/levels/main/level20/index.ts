import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "level20",
  title: "查询进阶 - 关联查询 - cross join",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from student",
  answer:
    "select s.name student_name, s.age student_age, s.class_id class_id, c.name class_name from student s, class c;",
  hint: "请仔细查看本关给出的示例",
  type: "main",
} as LevelType;
