import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "game_data_analysis",
  title: "王者农药大数据",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from game_matches",
  answer:
    "SELECT \n" +
    "    hero_role,\n" +
    "    ROUND(SUM(CASE WHEN game_result = '胜利' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1) || '%' AS win_rate,\n" +
    "    ROUND(AVG((kills + assists) * 1.0 / CASE WHEN deaths = 0 THEN 1 ELSE deaths END), 2) AS avg_kda,\n" +
    "    COUNT(*) AS total_matches\n" +
    "FROM \n" +
    "    game_matches\n" +
    "GROUP BY \n" +
    "    hero_role\n" +
    "HAVING \n" +
    "    COUNT(*) >= 5\n" +
    "ORDER BY \n" +
    "    ROUND(SUM(CASE WHEN game_result = '胜利' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1) DESC;",
  hint: "使用CASE WHEN统计胜利场次，HAVING过滤对局数，注意处理死亡数为0的情况",
  type: "custom",
  difficulty: 3,
} as LevelType;
