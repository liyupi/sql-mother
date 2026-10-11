# Advanced Queries - Window Functions - RANK

## Tutorial

This lesson introduces another window function: `RANK`.

`RANK` assigns a **rank** to each row in a query result, using specified columns or expressions to determine the order. Rows with equal ordering values receive the same rank; different values receive different ranks.

> When rows tie, `RANK` gives them the same rank and leaves a gap before the next rank. For example, two rows tied at rank 1 are followed by rank 3.

A common use of `RANK` is to identify the highest-ranked rows or the top N results.

The syntax is:

```sql
RANK() OVER (
  PARTITION BY column1, column2, ... -- Optional: define the partitions.
  ORDER BY column3 [ASC|DESC], column4 [ASC|DESC], ... -- Define the ranking order.
) AS rank_column
```

The optional `PARTITION BY` clause divides the rows into partitions using the specified columns. `ORDER BY` specifies the columns and sort direction used to calculate ranks. `AS rank_column` gives the resulting rank column an alias.

The square brackets and `...` above describe the syntax; replace them with the columns and sort directions your query needs.

## Example

Suppose an `orders` table contains the following data:

| order_id | customer_id | order_date | total_amount |
| -------- | ----------- | ---------- | ------------ |
| 1        | 101         | 2023-01-01 | 200          |
| 2        | 102         | 2023-01-05 | 350          |
| 3        | 101         | 2023-01-10 | 120          |
| 4        | 103         | 2023-01-15 | 500          |

We want to rank each customer's orders by amount, from largest to smallest, while displaying the details of every order:

```sql
SELECT
    order_id,
    customer_id,
    order_date,
    total_amount,
    RANK() OVER (PARTITION BY customer_id ORDER BY total_amount DESC) AS customer_rank
FROM
    orders;
```

Result:

| order_id | customer_id | order_date | total_amount | customer_rank |
| -------- | ----------- | ---------- | ------------ | ------------- |
| 1        | 101         | 2023-01-01 | 200          | 1             |
| 3        | 101         | 2023-01-10 | 120          | 2             |
| 2        | 102         | 2023-01-05 | 350          | 1             |
| 4        | 103         | 2023-01-15 | 500          | 1             |

`RANK` calculates each order's rank as `customer_rank`. `PARTITION BY customer_id` creates a separate partition for each customer, and `ORDER BY total_amount DESC` ranks orders from largest to smallest within that partition.

The window function preserves each order's details while calculating its rank among that customer's orders.

## Exercise

The `student` table includes these columns: `id` (student ID), `name` (name), `age` (age), `score` (score), and `class_id` (class ID).

Write a SQL query that returns each student's `id`, `name`, `age`, `score`, and `class_id`, in that exact order. Append their score rank within their class as `ranking`, using `RANK` and ordering scores from highest to lowest.

For this exercise, return the five student columns listed above rather than selecting every column in the table.
