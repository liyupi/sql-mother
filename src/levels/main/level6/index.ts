import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "level6",
  title: "基础语法 - 条件查询 - 运算符",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from student",
  answer: "select name, age from student where name != '热dog'",
  hint: "请仔细查看本关给出的示例",
  type: "main",
} as LevelType;
