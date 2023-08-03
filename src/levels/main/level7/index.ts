import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "level7",
  title: "基础语法 - 条件查询 - 空值",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from student",
  answer: "select name, age, score from student where age is not null",
  hint: "请仔细查看本关给出的示例",
  type: "main",
} as LevelType;
