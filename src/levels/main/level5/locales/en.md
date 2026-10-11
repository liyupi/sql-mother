# Basic Syntax - Filtering - WHERE

## Tutorial

So far, every query has retrieved all the rows in a table. But what if we only want some of the data?

We can use a conditional query to select only the rows that **meet specific conditions**, instead of returning every row.

The WHERE clause sets the filtering conditions in a query. Only rows that meet those conditions are returned.

The syntax is:

```sql
SELECT column1, column2, ...
FROM table_name
WHERE condition;
```

Here, `column1, column2, ...` are the columns to select. You can list specific column names or use `*` to select all columns. `table_name` is the name of the table to query. `condition` is the filter to apply. Conditions can use comparison operators such as `=`, `<`, and `>`, logical operators such as `AND` and `OR`, or operators such as `IN` and `LIKE`.

## Example

Let's look at a SQL query and its result. Suppose we have a table named `products` that stores product information, including each product's name (`name`), price (`price`), and stock level (`stock`).

The `products` table:

| name | price | stock |
| ---- | ----- | ----- |
| A | 10.00 | 50 |
| B | 20.00 | 30 |
| C | 15.00 | 20 |
| D | 25.00 | 10 |

Let's use WHERE to find products with a stock level of 20 or less:

```sql
-- SQL query
select name, price, stock from products where stock <= 20;
```

Query result:

| name | price | stock |
| ---- | ----- | ----- |
| C | 15.00 | 20 |
| D | 25.00 | 10 |

The query returns only products whose stock level is 20 or less.

## Exercise

Write a SQL query that selects the name (`name`) and score (`score`) from the table named `student` for students whose name is `'鱼皮'`.

`鱼皮` (Yupi) is a name stored in the sample data. Use the string `'鱼皮'` exactly as shown in your condition.
