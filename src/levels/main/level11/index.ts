import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "level11",
  title: "基础语法 - 排序",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from student",
  answer: "select name, age, score from student order by score desc, age asc;",
  hint: "需要使用多字段排序",
  type: "main",
} as LevelType;
