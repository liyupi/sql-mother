import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "magicScores",
  title: "魔法学院",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from magic_scores",
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
  hint: "开窗函数",
  type: "custom",
} as LevelType;
