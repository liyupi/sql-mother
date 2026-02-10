import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "financial_transaction_analysis",
  title: "金牛投资",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from stock_transactions",
  answer:
    "SELECT \n" +
    "    sector,\n" +
    "    ROUND(SUM(quantity * price_per_share), 2) AS total_amount,\n" +
    "    COUNT(*) AS transaction_count,\n" +
    "    ROUND(AVG(price_per_share), 2) AS avg_price,\n" +
    "    ROUND(AVG(CASE WHEN transaction_type = '买入' THEN 100.0 ELSE 0 END), 1) || '%' AS buy_ratio,\n" +
    "    ROUND(AVG(CASE WHEN investor_type = '机构' THEN 100.0 ELSE 0 END), 1) || '%' AS institution_ratio,\n" +
    "    ROUND(AVG(commission_fee), 2) AS avg_commission,\n" +
    "    (\n" +
    "        SELECT stock_name \n" +
    "        FROM stock_transactions s2 \n" +
    "        WHERE s2.sector = stock_transactions.sector \n" +
    "        GROUP BY stock_name \n" +
    "        ORDER BY SUM(quantity * price_per_share) DESC \n" +
    "        LIMIT 1\n" +
    "    ) AS top_stock,\n" +
    "    ROUND(((MAX(price_per_share) - MIN(price_per_share)) / AVG(price_per_share)) * 100, 1) || '%' AS volatility\n" +
    "FROM \n" +
    "    stock_transactions\n" +
    "GROUP BY \n" +
    "    sector\n" +
    "ORDER BY \n" +
    "    total_amount DESC;",
  hint: "使用子查询找出热门股票，计算价格波动率需要用最高价减最低价除以平均价格",
  type: "custom",
  difficulty: 2,
} as LevelType;
