import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "level23",
  title: "查询进阶 - 子查询",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from student",
  answer:
    "select name, score, class_id from student where class_id in (select distinct id from class);",
  hint: "先查询所有的班级编号、再查询编号在所有的班级编号中的学生信息",
  type: "main",
} as LevelType;
