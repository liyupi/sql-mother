import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "delivery_performance_analysis",
  title: "极速达人",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from courier_performance",
  answer:
    "SELECT \n" +
    "    courier_name,\n" +
    "    SUM(orders_completed) AS total_completed,\n" +
    "    SUM(orders_failed) AS total_failed,\n" +
    "    ROUND(SUM(orders_completed) * 100.0 / (SUM(orders_completed) + SUM(orders_failed)), 1) || '%' AS success_rate,\n" +
    "    ROUND(AVG(customer_rating), 1) AS avg_rating,\n" +
    "    ROUND(SUM(total_distance), 1) AS total_distance,\n" +
    "    ROUND(AVG(orders_completed * 1.0 / work_hours), 1) AS efficiency\n" +
    "FROM \n" +
    "    courier_performance\n" +
    "GROUP BY \n" +
    "    courier_name\n" +
    "HAVING \n" +
    "    SUM(orders_completed) + SUM(orders_failed) >= 20\n" +
    "ORDER BY \n" +
    "    ROUND(SUM(orders_completed) * 100.0 / (SUM(orders_completed) + SUM(orders_failed)), 1) DESC, total_completed DESC;",
  hint: "使用SUM计算总和，注意成功率计算公式和效率计算，HAVING过滤总订单数",
  type: "custom",
  difficulty: 2,
} as LevelType;
