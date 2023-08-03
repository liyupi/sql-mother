import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "level4",
  title: "基础语法 - 查询 - 常量和运算",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from student",
  answer: "select name, score, score * 2 as double_score from student;",
  hint: "请仔细查看本关给出的示例",
  type: "main",
} as LevelType;
