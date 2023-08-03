import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "关卡英文名",
  title: "关卡中文名",
  // 初始化建表 SQL 语句
  initSQL: sql,
  // 关卡教程 Markdown 文档
  content: md,
  // 关卡初始化后默认执行的语句，一般是查询全表
  defaultSQL: "select * from magic_scores",
  // 关卡标准答案
  answer:
    "SELECT \n" +
    "    student_id,\n" +
    "    student_name,\n" +
    "    subject_id,\n" +
    "    subject_name,\n" +
    "    score,\n" +
    "    RANK() OVER (PARTITION BY subject_id ORDER BY score DESC) AS score_rank\n" +
    "FROM \n" +
    "    magic_scores;",
  // 关卡提示
  hint: "开窗函数",
  // 关卡类别
  type: "custom",
} as LevelType;
