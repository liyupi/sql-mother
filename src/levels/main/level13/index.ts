import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "level13",
  title: "基础语法 - 条件分支",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from student",
  answer:
    "SELECT\n" +
    "  name,\n" +
    "  CASE WHEN (age > 60) THEN '老同学'\n" +
    "       WHEN (age > 20) THEN '年轻'\n" +
    "       ELSE '小同学' END AS age_level\n" +
    "FROM\n" +
    "  student\n" +
    "ORDER BY\n" +
    "  name asc;",

  hint: "需要使用 CASE WHEN 同时指定多个分支",
  type: "main",
} as LevelType;
