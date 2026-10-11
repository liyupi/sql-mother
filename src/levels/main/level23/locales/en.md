# Advanced Queries - Subqueries

## Tutorial

A subquery is a complete query **nested inside another query**. The inner query is called the subquery. Subqueries help retrieve more complex results or filter data.

A useful way to understand a subquery is to imagine evaluating the inner query first, then using its result as a condition or data source for the outer query. The database may optimize the actual execution order.

Think of a subquery as a box inside another box: the outer query is the larger box and the inner query is the smaller one. Open the small box to get its result, then use that result inside the larger box for further processing.

## Example

Suppose we have two tables, `orders` and `customers`, containing order information and customer information respectively.

The `orders` table:

| order_id | customer_id | order_date | total_amount |
| -------- | ----------- | ---------- | ------------ |
| 1        | 101         | 2023-01-01 | 200          |
| 2        | 102         | 2023-01-05 | 350          |
| 3        | 101         | 2023-01-10 | 120          |
| 4        | 103         | 2023-01-15 | 500          |

The `customers` table:

| customer_id | name    | city        |
| ----------- | ------- | ----------- |
| 101         | Alice   | New York    |
| 102         | Bob     | Los Angeles |
| 103         | Charlie | Chicago     |

We want the names and cities of customers who have at least one order with `total_amount > 200`:

```sql
-- Outer query
SELECT name, city
FROM customers
WHERE customer_id IN (
    -- Subquery
    SELECT DISTINCT customer_id
    FROM orders
    WHERE total_amount > 200
);
```

The subquery identifies customer IDs from orders that meet the condition. The outer query then uses those IDs to retrieve the corresponding customer information, limiting the result to the customers we need. The condition applies to each individual order's amount, not the sum of a customer's orders.

Result:

| name    | city        |
| ------- | ----------- |
| Bob     | Los Angeles |
| Charlie | Chicago     |

## Exercise

The `student` table includes these columns: `id` (student ID), `name` (name), `age` (age), `score` (score), and `class_id` (class ID). The `class` table includes `id` (class ID) and `name` (class name).

Write a SQL query using a subquery to find every student whose class ID exists in the `class` table. Return only the student's name (`name`), score (`score`), and class ID (`class_id`), in that order.
