import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "stock_trading_analysis",
  title: "华尔街风云",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from client_transactions",
  answer:
    "SELECT \n" +
    "    client_name,\n" +
    "    total_amount,\n" +
    "    transaction_count,\n" +
    "    avg_amount,\n" +
    "    stock_count,\n" +
    "    buy_ratio,\n" +
    "    amount_rank\n" +
    "FROM (\n" +
    "    SELECT \n" +
    "        client_name,\n" +
    "        SUM(quantity * price) AS total_amount,\n" +
    "        COUNT(*) AS transaction_count,\n" +
    "        ROUND(AVG(quantity * price), 2) AS avg_amount,\n" +
    "        COUNT(DISTINCT stock_code) AS stock_count,\n" +
    "        ROUND(SUM(CASE WHEN transaction_type = '买入' THEN quantity * price ELSE 0 END) * 100.0 / SUM(quantity * price), 1) || '%' AS buy_ratio,\n" +
    "        RANK() OVER (ORDER BY SUM(quantity * price) DESC) AS amount_rank\n" +
    "    FROM \n" +
    "        client_transactions\n" +
    "    GROUP BY \n" +
    "        client_name\n" +
    "    HAVING \n" +
    "        SUM(quantity * price) > 100000\n" +
    ") t\n" +
    "ORDER BY \n" +
    "    amount_rank ASC;",
  hint: "使用子查询结合窗口函数，注意HAVING子句的使用位置和窗口函数的计算顺序",
  type: "custom",
  difficulty: 3,
} as LevelType;
