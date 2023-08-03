import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "level10",
  title: "基础语法 - 去重",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from student",
  answer: "select distinct class_id, exam_num from student;",
  hint: "需要使用多字段去重",
  type: "main",
} as LevelType;
