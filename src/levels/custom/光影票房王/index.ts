import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "movie_box_office_analysis",
  title: "光影票房王",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from movie_box_office",
  answer:
    "SELECT \n" +
    "    genre,\n" +
    "    SUM(ticket_price * audience_count) AS total_revenue,\n" +
    "    COUNT(*) AS movie_count,\n" +
    "    ROUND(AVG(rating), 1) AS avg_rating,\n" +
    "    ROUND(AVG(audience_count)) AS avg_audience\n" +
    "FROM \n" +
    "    movie_box_office\n" +
    "GROUP BY \n" +
    "    genre\n" +
    "ORDER BY \n" +
    "    total_revenue DESC;",
  hint: "使用GROUP BY按电影类型分组，SUM计算总票房，AVG计算平均值",
  type: "custom",
  difficulty: 1,
} as LevelType;
