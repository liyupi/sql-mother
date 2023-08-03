import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "level9",
  title: "基础语法 - 条件查询 - 逻辑运算",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from student",
  answer:
    "select name, score from student where name like '%李%' or score > 500;",
  hint: "请仔细查看本关给出的示例",
  type: "main",
} as LevelType;
