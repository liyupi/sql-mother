import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "book_sales_analysis",
  title: "书香满园",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from book_sales",
  answer:
    "SELECT \n" +
    "    category,\n" +
    "    ROUND(SUM(price * quantity * discount_rate), 2) AS total_revenue,\n" +
    "    SUM(quantity) AS total_books,\n" +
    "    ROUND(AVG(discount_rate), 3) AS avg_discount,\n" +
    "    (\n" +
    "        SELECT book_title \n" +
    "        FROM book_sales b2 \n" +
    "        WHERE b2.category = book_sales.category \n" +
    "        GROUP BY book_title \n" +
    "        ORDER BY SUM(price * quantity * discount_rate) DESC \n" +
    "        LIMIT 1\n" +
    "    ) AS top_book,\n" +
    "    ROUND(AVG(customer_age), 1) AS avg_age\n" +
    "FROM \n" +
    "    book_sales\n" +
    "GROUP BY \n" +
    "    category\n" +
    "ORDER BY \n" +
    "    total_revenue DESC;",
  hint: "使用GROUP BY分组，子查询找出每个分类中销售额最高的图书",
  type: "custom",
  difficulty: 2,
} as LevelType;
