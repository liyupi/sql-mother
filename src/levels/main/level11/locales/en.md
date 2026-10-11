# Basic Syntax - Sorting

## Tutorial

When querying data, we sometimes want to sort the results by the values in a particular column to make them easier to read.

In SQL, the `ORDER BY` clause sorts the result. After ORDER BY, specify the column to sort by and choose ascending (`ASC`) or descending (`DESC`) order.

## Example

Suppose we have a table named `students` that stores students' names (`name`), ages (`age`), and scores (`score`).

The `students` table:

| name | age | score |
| ---- | --- | ----- |
| 张三 | 18 | 90 |
| 李四 | 20 | 85 |
| 王五 | 19 | 92 |
| 赵六 | 20 | 88 |

Let's use ORDER BY to sort the student data:

```sql
-- SQL query 1
select name, age from students order by age asc;

-- SQL query 2
select name, score from students order by score desc;
```

Result of query 1, sorted by age in ascending order, from smallest to largest:

| name | age |
| ---- | --- |
| 张三 | 18 |
| 王五 | 19 |
| 李四 | 20 |
| 赵六 | 20 |

Result of query 2, sorted by score in descending order, from largest to smallest:

| name | score |
| ---- | ----- |
| 王五 | 92 |
| 张三 | 90 |
| 赵六 | 88 |
| 李四 | 85 |

We can also sort by multiple columns. When rows have the same value in the first column, the second column determines their order, and so on.

The syntax is:

```sql
order by column1 [asc/desc], column2 [asc/desc], ...
```

The brackets indicate an optional choice of sort direction; do not type the brackets in your query.

## Exercise

Write a SQL query that selects each student's name (`name`), age (`age`), and score (`score`) from the table named `student`. Sort by score from highest to lowest. For students with the same score, sort by age from youngest to oldest.
