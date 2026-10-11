# Advanced Queries - Subqueries - EXISTS

## Tutorial

As we learned in the previous lesson, a subquery can be nested inside an outer query to help filter or retrieve data using more complex conditions.

`EXISTS` is a special way to use a subquery: it tests whether the subquery returns at least one row. It produces a Boolean result, true or false, rather than returning the subquery's data. When the subquery refers to the outer query's current row, it can check whether a related record exists for that row.

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
| 104         | 赵二    | China       |

`赵二` is a person's name (Zhao Er), preserved from the original sample data.

We want to find the names of customers **who have at least one order**. Use an `EXISTS` subquery:

> Translator's note: the original example also selects `total_amount` from `customers`, but that column exists only in `orders`. This example returns customer names to demonstrate `EXISTS` correctly. Returning an order amount would require an additional query or a join; `EXISTS` itself does not return columns from the inner query.

```sql
-- Outer query
SELECT name
FROM customers
WHERE EXISTS (
    -- Subquery
    SELECT 1
    FROM orders
    WHERE orders.customer_id = customers.customer_id
);
```

Conceptually, for each row in `customers`, the subquery checks whether `orders` contains that customer ID. If at least one matching order exists, the customer's name is included in the result. `SELECT 1` is sufficient because only the existence of a row matters.

Result:

| name    |
| ------- |
| Alice   |
| Bob     |
| Charlie |

The opposite of `EXISTS` is `NOT EXISTS`, which finds rows for which the subquery returns no matching records.

## Exercise

The `student` table includes these columns: `id` (student ID), `name` (name), `age` (age), `score` (score), and `class_id` (class ID). The `class` table includes `id` (class ID) and `name` (class name).

Write a SQL query using `NOT EXISTS` to find every student **whose class ID has no matching row in `class`**. Return only the student's name (`name`), age (`age`), and class ID (`class_id`), in that order.
