import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "yupi_content_analysis",
  title: "鱼皮的数据江湖",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from content_posts",
  answer:
    "SELECT \n" +
    "    platform,\n" +
    "    content_type,\n" +
    "    ROUND(AVG((likes + comments) * 100.0 / views), 2) AS avg_engagement_rate,\n" +
    "    COUNT(*) AS content_count\n" +
    "FROM \n" +
    "    content_posts\n" +
    "WHERE \n" +
    "    views > 1000\n" +
    "GROUP BY \n" +
    "    platform, content_type\n" +
    "ORDER BY \n" +
    "    platform ASC, avg_engagement_rate DESC;",
  hint: "使用WHERE过滤浏览量，GROUP BY分组，ROUND保留小数，注意计算互动率的公式",
  type: "custom",
  difficulty: 2,
} as LevelType;
