# Advanced Queries - Window Functions - SUM OVER

## Tutorial

Window functions let us calculate values across a group of rows **while keeping the details of each original row**.

Aggregate functions such as `SUM`, `AVG`, and `COUNT` can be used as window functions. Unlike a grouped aggregate query, a window function does not collapse the rows into a single result row per group.

Imagine a window function as a special lens: you can focus on a particular group while still seeing the details of the individual rows.

Our first example is `SUM` used with `OVER`. Its basic syntax is:

```sql
SUM(value_column) OVER (PARTITION BY group_column)
```

Here, `value_column` is the column to add up, and `group_column` defines the groups, also called partitions.

## Example

Suppose an `orders` table contains the following data:

| order_id | customer_id | order_date | total_amount |
| -------- | ----------- | ---------- | ------------ |
| 1        | 101         | 2023-01-01 | 200          |
| 2        | 102         | 2023-01-05 | 350          |
| 3        | 101         | 2023-01-10 | 120          |
| 4        | 103         | 2023-01-15 | 500          |

We want to calculate each customer's total order amount while displaying the details of every order:

```sql
SELECT
    order_id,
    customer_id,
    order_date,
    total_amount,
    SUM(total_amount) OVER (PARTITION BY customer_id) AS customer_total_amount
FROM
    orders;
```

Result:

| order_id | customer_id | order_date | total_amount | customer_total_amount |
| -------- | ----------- | ---------- | ------------ | --------------------- |
| 1        | 101         | 2023-01-01 | 200          | 320                   |
| 3        | 101         | 2023-01-10 | 120          | 320                   |
| 2        | 102         | 2023-01-05 | 350          | 350                   |
| 4        | 103         | 2023-01-15 | 500          | 500                   |

`SUM` calculates each customer's total order amount as `customer_total_amount`, and `PARTITION BY customer_id` defines a separate partition for each customer. The first two rows show that the original order details are preserved, while both rows display the same customer total.

## Exercise

The `student` table has these columns: `id` (student ID), `name` (name), `age` (age), `class_id` (class ID), `score` (score), and `exam_num` (exam ID).

Write a SQL query that returns every student's details in the original column order: `id`, `name`, `age`, `class_id`, `score`, `exam_num`. Append the average student score for that student's class as `class_avg_score`, using a window function.
