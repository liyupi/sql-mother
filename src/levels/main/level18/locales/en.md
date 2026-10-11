# Grouping and Aggregation - Group by Multiple Columns

## Tutorial

Sometimes grouping by one column is not enough. For example, you might want to count the students in each class who took each exam. In that case, you can group by multiple columns.

Grouping by multiple columns works almost the same way as grouping by one column: use `GROUP BY` and list the columns to group by.

## Example

Suppose an `orders` table has these columns: `order_id` (order ID), `product_id` (product ID), `customer_id` (customer ID), and `amount` (order amount).

It contains the following data:

| order_id | product_id | customer_id | amount |
| -------- | ---------- | ----------- | ------ |
| 1        | 1          | A001        | 100    |
| 2        | 1          | A002        | 200    |
| 3        | 1          | A001        | 150    |
| 4        | 1          | A003        | 50     |
| 5        | 2          | A001        | 50     |

To calculate the total amount **each customer** spent on **each product**, group by both the customer ID and the product ID:

```sql
-- Calculate each customer's total for each product, grouped by customer and product ID.
SELECT customer_id, product_id, SUM(amount) AS total_amount
FROM orders
GROUP BY customer_id, product_id;
```

Result:

| customer_id | product_id | total_amount |
| ----------- | ---------- | ------------ |
| A001        | 1          | 250          |
| A001        | 2          | 50           |
| A002        | 1          | 200          |
| A003        | 1          | 50           |

## Exercise

The `student` table includes these columns: `id` (student ID), `name` (name), `class_id` (class ID), `exam_num` (exam ID), and `score` (score).

Write a SQL query that returns the class ID (`class_id`), exam ID (`exam_num`), and number of students in each class who took each exam (`total_num`). Group by both class and exam.
