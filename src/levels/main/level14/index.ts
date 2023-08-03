import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "level14",
  title: "函数 - 时间函数",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from student",
  answer: "select name, date() as 当前日期 from student",
  hint: "请仔细查看本关给出的示例",
  type: "main",
} as LevelType;
