import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "level8",
  title: "基础语法 - 条件查询 - 模糊查询",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from student",
  answer: "select name, score from student where name not like '%李%'",
  hint: "请仔细查看本关给出的示例",
  type: "main",
} as LevelType;
