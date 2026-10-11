# Basic Syntax - Filtering - NULL Values

## Tutorial

Sometimes a field in a database table has no value. SQL represents this with `NULL`.

NULL indicates that a value is unknown, missing, or has not been entered. In SQL queries, we can use `IS NULL` and `IS NOT NULL` to check whether a field has a NULL value.

For example, imagine you are a teacher and your table contains students' exam scores. If a student has not taken the exam, or their result is not yet available, their score may be NULL. You can use `IS NULL` to find students without a recorded score, including those who have not taken the exam, and `IS NOT NULL` to find students who already have a score.

## Example

Suppose we have a table named `employees` that stores employees' names (`name`), ages (`age`), and hire dates (`hire_date`).

The `employees` table:

| name | age | hire_date |
| ---- | --- | --------- |
| 小明 | 25 | 2020-01-01 |
| 小红 | 30 | 2020-02-15 |
| 小李 | 28 | NULL |
| 小张 | NULL | 2020-03-20 |

Let's use `IS NULL` to find employees whose hire date has not been entered:

```sql
-- SQL query
select name, age from employees where hire_date is null;
```

Query result:

| name | age |
| ---- | --- |
| 小李 | 28 |

## Exercise

Write a SQL query that selects the name (`name`), age (`age`), and score (`score`) from the table named `student` for students whose age is not NULL.
