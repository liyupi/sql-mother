# Advanced Queries - Window Functions - SUM OVER with ORDER BY

## Tutorial

In the previous lesson, we used `SUM` with `OVER` to calculate totals for groups of rows.

In this lesson, we add `ORDER BY` inside `OVER` to calculate a **running total** within each group.

The basic syntax is:

```sql
SUM(value_column) OVER (PARTITION BY group_column ORDER BY sort_column ASC)
```

`value_column` is the column to add up, `group_column` defines the partitions, and `sort_column` defines the order within each partition. Use `ASC` for ascending order or `DESC` for descending order.

For example, imagine a teacher calling students' names one by one in each class. After each name, the teacher records the total score of the students called so far.

## Example

Suppose an `orders` table contains the following data:

| order_id | customer_id | order_date | total_amount |
| -------- | ----------- | ---------- | ------------ |
| 1        | 101         | 2023-01-01 | 200          |
| 2        | 102         | 2023-01-05 | 350          |
| 3        | 101         | 2023-01-10 | 120          |
| 4        | 103         | 2023-01-15 | 500          |

We want to calculate each customer's running order total over time while displaying the details of every order:

```sql
SELECT
    order_id,
    customer_id,
    order_date,
    total_amount,
    SUM(total_amount) OVER (PARTITION BY customer_id ORDER BY order_date ASC) AS cumulative_total_amount
FROM
    orders;
```

Result:

| order_id | customer_id | order_date | total_amount | cumulative_total_amount |
| -------- | ----------- | ---------- | ------------ | ----------------------- |
| 1        | 101         | 2023-01-01 | 200          | 200                     |
| 3        | 101         | 2023-01-10 | 120          | 320                     |
| 2        | 102         | 2023-01-05 | 350          | 350                     |
| 4        | 103         | 2023-01-15 | 500          | 500                     |

`SUM` calculates the running total as `cumulative_total_amount`. `PARTITION BY customer_id` separates the customers, and `ORDER BY order_date ASC` processes each customer's orders from earliest to latest.

The first two rows show that the original order details are preserved while the total accumulates: customer 101's total starts at 200 and then reaches 320. Without the window's `ORDER BY`, the previous lesson's query returned the full customer total on every row.

With this syntax, rows with the same ordering value share a cumulative total that includes all those tied rows. Also, the `ORDER BY` inside `OVER` defines the calculation order; a separate, outer `ORDER BY` is needed to guarantee the final display order.

## Exercise

The `student` table includes these columns: `id` (student ID), `name` (name), `age` (age), `score` (score), and `class_id` (class ID).

Write a SQL query that returns each student's `id`, `name`, `age`, `score`, and `class_id`, in that exact order. Append a running total of scores within the student's class, calculated in ascending score order, as `class_sum_score`.

For this exercise, return the five student columns listed above rather than selecting every column in the table.
