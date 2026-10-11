# Grouping and Aggregation - HAVING

## Tutorial

In SQL, the `HAVING` clause filters groups after grouping and aggregation. It lets you apply a condition to the grouped results and keep only the groups that satisfy it.

The difference between `WHERE` and `HAVING` is when they filter data: `WHERE` filters individual rows **before grouping**, while `HAVING` filters groups **after grouping**.

## Examples

Suppose an `orders` table has these columns: `order_id` (order ID), `customer_id` (customer ID), and `amount` (order amount). It contains the following data:

| order_id | customer_id | amount |
| -------- | ----------- | ------ |
| 1        | A001        | 100    |
| 2        | A002        | 200    |
| 3        | A001        | 150    |
| 4        | A003        | 50     |

1. Use `HAVING` to find customers who have placed more than one order:

```sql
SELECT customer_id, COUNT(order_id) AS order_num
FROM orders
GROUP BY customer_id
HAVING COUNT(order_id) > 1;
```

Result:

| customer_id | order_num |
| ----------- | --------- |
| A001        | 2         |

2. Use `HAVING` to find customers whose orders have a combined amount greater than 100:

```sql
-- Find customers whose total order amount is greater than 100.
SELECT customer_id, SUM(amount) AS total_amount
FROM orders
GROUP BY customer_id
HAVING SUM(amount) > 100;
```

Result:

| customer_id | total_amount |
| ----------- | ------------ |
| A001        | 250          |
| A002        | 200          |

## Exercise

The `student` table includes these columns: `id` (student ID), `name` (name), `class_id` (class ID), and `score` (score).

Write a SQL query that returns the class ID (`class_id`) and total score (`total_score`) for classes whose combined student scores exceed 150.
