import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "restaurant_business_analysis",
  title: "美食帝国",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from restaurant_orders",
  answer:
    "SELECT \n" +
    "    dish_category,\n" +
    "    SUM(dish_price * quantity) AS total_sales,\n" +
    "    COUNT(*) AS order_count,\n" +
    "    ROUND(AVG(dish_price), 2) AS avg_price,\n" +
    "    ROUND(AVG(is_member) * 100, 1) || '%' AS member_ratio\n" +
    "FROM \n" +
    "    restaurant_orders\n" +
    "GROUP BY \n" +
    "    dish_category\n" +
    "ORDER BY \n" +
    "    total_sales DESC;",
  hint: "使用GROUP BY按菜品分类分组，计算销售额、订单数、平均单价和会员占比",
  type: "custom",
  difficulty: 1,
} as LevelType;
