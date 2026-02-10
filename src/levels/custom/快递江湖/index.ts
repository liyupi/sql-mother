import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "logistics_delivery_analysis",
  title: "快递江湖",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from delivery_records",
  answer:
    "SELECT \n" +
    "    courier_name,\n" +
    "    total_orders,\n" +
    "    success_rate,\n" +
    "    avg_delivery_hours,\n" +
    "    avg_distance,\n" +
    "    total_fee,\n" +
    "    fee_per_km,\n" +
    "    orders_rank,\n" +
    "    success_rank\n" +
    "FROM (\n" +
    "    SELECT \n" +
    "        courier_name,\n" +
    "        COUNT(*) AS total_orders,\n" +
    "        ROUND(SUM(CASE WHEN delivery_status = '已签收' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1) || '%' AS success_rate,\n" +
    "        ROUND(AVG((JULIANDAY(receive_time) - JULIANDAY(send_time)) * 24), 1) AS avg_delivery_hours,\n" +
    "        ROUND(AVG(delivery_distance), 1) AS avg_distance,\n" +
    "        SUM(delivery_fee) AS total_fee,\n" +
    "        ROUND(SUM(delivery_fee) / SUM(delivery_distance), 2) AS fee_per_km,\n" +
    "        RANK() OVER (ORDER BY COUNT(*) DESC) AS orders_rank,\n" +
    "        RANK() OVER (ORDER BY SUM(CASE WHEN delivery_status = '已签收' THEN 1 ELSE 0 END) * 100.0 / COUNT(*) DESC) AS success_rank\n" +
    "    FROM \n" +
    "        delivery_records\n" +
    "    WHERE \n" +
    "        delivery_status IN ('已签收', '派送中')\n" +
    "    GROUP BY \n" +
    "        courier_name\n" +
    "    HAVING \n" +
    "        COUNT(*) >= 5\n" +
    ") t\n" +
    "ORDER BY \n" +
    "    CAST(REPLACE(success_rate, '%', '') AS REAL) DESC, total_orders DESC;",
  hint: "使用JULIANDAY计算时间差，结合窗口函数和子查询，注意排序时需要处理百分号字符串",
  type: "custom",
  difficulty: 2,
} as LevelType;
