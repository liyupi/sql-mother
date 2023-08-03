import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "level3",
  title: "基础语法 - 查询 - 别名",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from student",
  answer: "select name as 学生姓名, age 学生年龄 from student",
  hint: "请仔细查看本关给出的示例",
  type: "main",
} as LevelType;
