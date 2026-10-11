# Grouping and Aggregation - Group by One Column

## Tutorial

Grouping and aggregation in SQL organize rows into groups and calculate a summary for each group. You group data by a specified column, then apply aggregate functions such as `COUNT`, `SUM`, or `AVG` to obtain a result for each group.

For example, a school could group students by class and calculate the number of students and the average score in each class. This provides an overview of each class instead of just information about individual students.

Use the `GROUP BY` clause to group rows in SQL.

## Examples

Suppose an `orders` table has these columns: `order_id` (order ID), `customer_id` (customer ID), and `amount` (order amount). It contains the following data:

| order_id | customer_id | amount |
| -------- | ----------- | ------ |
| 1        | A001        | 100    |
| 2        | A002        | 200    |
| 3        | A001        | 150    |
| 4        | A003        | 50     |

1. Group the rows to return each customer ID once:

```sql
SELECT customer_id
FROM orders
GROUP BY customer_id;
```

Result:

| customer_id |
| ----------- |
| A001        |
| A002        |
| A003        |

2. Group the rows and count how many orders each customer has placed:

```sql
SELECT customer_id, COUNT(order_id) AS order_num
FROM orders
GROUP BY customer_id;
```

Result:

| customer_id | order_num |
| ----------- | --------- |
| A001        | 2         |
| A002        | 1         |
| A003        | 1         |

## Exercise

The `student` table includes these columns: `id` (student ID), `name` (name), `class_id` (class ID), and `score` (score).

Write a SQL query that returns each class ID as `class_id` and the average score for that class as `avg_score`.
