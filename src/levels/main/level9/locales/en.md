# Basic Syntax - Filtering - Logical Operators

## Tutorial

Logical operators let us combine conditions in a query to filter for data that meets our requirements.

Common logical operators include:

- `AND`: logical AND. Returns true only when all the conditions are true.
- `OR`: logical OR. Returns true when at least one of the conditions is true.
- `NOT`: logical NOT. Negates a condition; for example, a true condition becomes false when NOT is applied.

## Example

Suppose we have a table named `employees` that stores employees' names (`name`), ages (`age`), and salaries (`salary`).

The `employees` table:

| name | age | salary |
| ---- | --- | ------ |
| 张三 | 25 | 10000 |
| 李四 | 30 | 12000 |
| 李五 | 28 | 15000 |
| 小明 | 22 | 8000 |

Let's use a logical operator to find employees whose name contains the character `李` (Li) **and** whose age is less than 30:

```sql
-- SQL query
select name, age, salary from employees where name like '%李%' and age < 30;
```

Query result:

| name | age | salary |
| ---- | --- | ------ |
| 李五 | 28 | 15000 |

The query uses the logical operator `and` to retrieve employees who meet both conditions.

## Exercise

Write a SQL query that selects the name (`name`) and score (`score`) from the table named `student` for students whose name contains the character `李` (Li), or whose score (`score`) is greater than 500.

Use the Chinese character `李` itself in your pattern.
