# Advanced Queries - Window Functions - ROW_NUMBER

## Tutorial

`ROW_NUMBER` assigns a **unique, consecutive row number** to each row within a window partition.

Unlike `RANK`, `ROW_NUMBER` assigns a different integer to every row, even when ordering values are tied. The numbering starts at 1 and increases by 1 for each row, restarting in each partition. If rows tie on all the specified ordering columns, their relative numbering is not guaranteed unless you add a column that breaks the tie.

The syntax is almost identical to `RANK`:

```sql
ROW_NUMBER() OVER (
  PARTITION BY column1, column2, ... -- Optional: define the partitions.
  ORDER BY column3 [ASC|DESC], column4 [ASC|DESC], ... -- Define the numbering order.
) AS row_number_column
```

The optional `PARTITION BY` clause divides the rows into partitions using the specified columns. `ORDER BY` specifies the columns and sort direction used to assign row numbers. `AS row_number_column` gives the resulting column an alias.

The square brackets and `...` above describe the syntax; replace them with the columns and sort directions your query needs.

## Example

Suppose an `orders` table contains the following data:

| order_id | customer_id | order_date | total_amount |
| -------- | ----------- | ---------- | ------------ |
| 1        | 101         | 2023-01-01 | 200          |
| 2        | 102         | 2023-01-05 | 350          |
| 3        | 101         | 2023-01-10 | 120          |
| 4        | 103         | 2023-01-15 | 500          |

We want to number each customer's orders from largest to smallest order amount:

```sql
SELECT
    order_id,
    customer_id,
    order_date,
    total_amount,
    ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY total_amount DESC) AS row_number
FROM
    orders;
```

The result contains these rows:

| order_id | customer_id | order_date | total_amount | row_number |
| -------- | ----------- | ---------- | ------------ | ---------- |
| 4        | 103         | 2023-01-15 | 500          | 1          |
| 2        | 102         | 2023-01-05 | 350          | 1          |
| 1        | 101         | 2023-01-01 | 200          | 1          |
| 3        | 101         | 2023-01-10 | 120          | 2          |

`ROW_NUMBER` gives each order a number as `row_number`. `PARTITION BY customer_id` creates a separate partition for each customer, and `ORDER BY total_amount DESC` numbers that customer's orders from largest to smallest.

The table above preserves the original example's display order. The query does not guarantee that display order: `ORDER BY` inside `OVER` controls the numbering within each partition. Use an outer `ORDER BY` when you need a particular order for the final result.

## Exercise

The `student` table includes these columns: `id` (student ID), `name` (name), `age` (age), `score` (score), and `class_id` (class ID).

Write a SQL query that returns each student's `id`, `name`, `age`, `score`, and `class_id`, in that exact order. Append a unique row number within their class as `row_number`, assigning numbers in descending score order.

For this exercise, return the five student columns listed above rather than selecting every column in the table.
