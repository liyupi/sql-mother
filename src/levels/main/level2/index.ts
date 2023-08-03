import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "level2",
  title: "基础语法 - 查询 - 选择查询",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from student",
  answer: "select name, age from student",
  hint: "请仔细查看本关给出的示例",
  type: "main",
} as LevelType;
