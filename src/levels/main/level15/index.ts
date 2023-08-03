import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "level15",
  title: "函数 - 字符串处理",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from student",
  answer:
    "SELECT id, name, UPPER(name) AS upper_name\n" +
    "FROM student\n" +
    "WHERE name = '热dog';",
  hint: "请仔细查看本关给出的示例",
  type: "main",
} as LevelType;
