import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "social_media_analysis",
  title: "朋友圈的秘密",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from weibo_posts",
  answer:
    "SELECT \n" +
    "    topic_category,\n" +
    "    SUM(likes_count + comments_count + reposts_count) AS total_interactions,\n" +
    "    ROUND(SUM(likes_count + comments_count + reposts_count) * 1000.0 / SUM(followers_count), 3) AS avg_interaction_rate,\n" +
    "    ROUND(SUM(has_image) * 100.0 / COUNT(*), 1) || '%' AS image_ratio,\n" +
    "    ROUND(SUM(has_video) * 100.0 / COUNT(*), 1) || '%' AS video_ratio,\n" +
    "    ROUND(AVG(likes_count)) AS avg_likes,\n" +
    "    COUNT(*) AS post_count\n" +
    "FROM \n" +
    "    weibo_posts\n" +
    "GROUP BY \n" +
    "    topic_category\n" +
    "HAVING \n" +
    "    COUNT(*) >= 3\n" +
    "ORDER BY \n" +
    "    total_interactions DESC;",
  hint: "使用SUM计算总互动数，AVG计算平均值，注意占比计算和数据类型转换",
  type: "custom",
  difficulty: 2,
} as LevelType;
