import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "ecommerce_analysis",
  title: "码上淘宝",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from order_items",
  answer:
    "SELECT \n" +
    "    category,\n" +
    "    SUM(price * quantity) AS total_revenue,\n" +
    "    SUM(quantity) AS total_quantity\n" +
    "FROM \n" +
    "    order_items\n" +
    "GROUP BY \n" +
    "    category\n" +
    "ORDER BY \n" +
    "    total_revenue DESC;",
  hint: "使用GROUP BY按分类分组，SUM函数计算总和，ORDER BY排序",
  type: "custom",
  difficulty: 2,
} as LevelType;
