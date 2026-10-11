# Basic Syntax - Queries - Constants and Calculations

## Tutorial

Constants and calculations are important tools for processing data in SQL. A constant is a fixed number or text value, such as `1`. Calculations and other operations let us work with these values using arithmetic or text manipulation.

Using constants and expressions, we can add, subtract, multiply, divide, calculate averages, or join text in a query to produce the results we need.

## Example

Let's look at a SQL query and its result. Suppose we have a table named `orders` that stores order information, including the order ID (`order_id`), unit price (`unit_price`), and quantity purchased (`quantity`).

The `orders` table:

| order_id | unit_price | quantity |
| -------- | ---------- | -------- |
| 1001 | 10.00 | 5 |
| 1002 | 20.00 | 3 |
| 1003 | 15.00 | 2 |
| 1004 | 25.00 | 4 |

We want to calculate each order's total amount (`total_amount`): the unit price (`unit_price`) multiplied by the quantity (`quantity`).

SQL query:

```sql
select order_id, unit_price, quantity, unit_price * quantity as total_amount from orders;
```

Query result, with the calculated column `total_amount`:

| order_id | unit_price | quantity | total_amount |
| -------- | ---------- | -------- | ------------ |
| 1001 | 10.00 | 5 | 50.00 |
| 1002 | 20.00 | 3 | 60.00 |
| 1003 | 15.00 | 2 | 30.00 |
| 1004 | 25.00 | 4 | 100.00 |

SQL can also select constant values directly. Without an alias, the constant itself can serve as the output column heading. For example:

```sql
select 200, '篮球' as hobby;
```

Here, `'篮球'` is the Chinese text for "basketball."

Query result:

| 200 | hobby |
| --- | ----- |
| 200 | 篮球 |

## Exercise

Write a SQL query that selects the name (`name`) and score (`score`) of every student from the table named `student`. Also calculate twice each student's score and name this additional column `double_score`.
