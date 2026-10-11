# Functions - Aggregate Functions

## Tutorial

In SQL, aggregate functions are special functions that **summarize a set of values**. They can count rows, add values, calculate averages, and find the largest or smallest value. Aggregate functions often appear in a `SELECT` statement with a `GROUP BY` clause to summarize each group of rows.

Common aggregate functions include:

- `COUNT`: counts rows with `COUNT(*)`, or non-NULL values in a specified column with `COUNT(column_name)`.
- `SUM`: adds the numeric values in a specified column.
- `AVG`: calculates the average of the numeric values in a specified column.
- `MAX`: finds the largest value in a specified column.
- `MIN`: finds the smallest value in a specified column.

## Examples

Suppose an `orders` table has these columns: `order_id` (order ID), `customer_id` (customer ID), and `amount` (order amount). It contains the following data:

| order_id | customer_id | amount |
| -------- | ----------- | ------ |
| 1        | A001        | 100    |
| 2        | A002        | 200    |
| 3        | A001        | 150    |
| 4        | A003        | 50     |

1. Use `COUNT` to count all orders in the table:

```sql
SELECT COUNT(*) AS order_num
FROM orders;
```

Result:

| order_num |
| --------- |
| 4         |

2. Use `COUNT(DISTINCT column_name)` to count the different customers in the orders table:

```sql
SELECT COUNT(DISTINCT customer_id) AS customer_num
FROM orders;
```

Result:

| customer_num |
| ------------ |
| 3            |

3. Use `SUM` to calculate the total amount of all orders:

```sql
SELECT SUM(amount) AS total_amount
FROM orders;
```

Result:

| total_amount |
| ------------ |
| 500          |

## Exercise

The `student` table includes these columns: `id` (student ID), `name` (name), `class_id` (class ID), and `score` (score).

Write a SQL query that summarizes the scores of all students. Return the total score as `total_score`, the average score as `avg_score`, the highest score as `max_score`, and the lowest score as `min_score`, in that order.
