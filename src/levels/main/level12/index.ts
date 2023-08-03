import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "level12",
  title: "基础语法 - 截断和偏移",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from student",
  answer: "select name, age from student order by age asc limit 1, 3;",
  hint: "从第 2 条数据开始，limit 的第一个参数应该是几呢？",
  type: "main",
} as LevelType;
