# Basic Syntax - Filtering - Operators

## Tutorial

Operators are special symbols or keywords used to evaluate conditions in SQL queries, such as `=`, `!=`, `<`, and `>`. Different operators let us specify different conditions and filter data flexibly based on its properties.

Imagine you are a recruiter and each row in a table represents a candidate you are interviewing. Operators are like the different criteria you set: use `!=` to find candidates whose value differs from a given value, `>` to find candidates with high scores, or `BETWEEN` to find candidates within a certain age range.

## Example

Let's look at some SQL queries and their results. Suppose we have a table named `employees` that stores employees' names (`name`), ages (`age`), and salaries (`salary`).

The `employees` table:

| name | age | salary |
| ---- | --- | ------ |
| 小明 | 25 | 5000 |
| 小红 | 30 | 6000 |
| 小李 | 28 | 5500 |
| 小张 | 22 | 4500 |

Now let's filter this data using different operators.

1. Use `!=` to find employees whose `name` is not `'小张'` (Xiao Zhang):

```sql
-- SQL query
select name, age, salary from employees where name != '小张';
```

Query result:

| name | age | salary |
| ---- | --- | ------ |
| 小明 | 25 | 5000 |
| 小红 | 30 | 6000 |
| 小李 | 28 | 5500 |

2. Use `>` to find employees with a salary greater than 5500:

```sql
-- SQL query
select name, age, salary from employees where salary > 5500;
```

Query result:

| name | age | salary |
| ---- | --- | ------ |
| 小红 | 30 | 6000 |

3. Use `BETWEEN` to find employees aged between 25 and 30, including both endpoints:

```sql
-- SQL query
select name, age, salary from employees where age between 25 and 30;
```

Query result:

| name | age | salary |
| ---- | --- | ------ |
| 小明 | 25 | 5000 |
| 小红 | 30 | 6000 |
| 小李 | 28 | 5500 |

These queries use different operators to retrieve employee information that meets different conditions.

## Exercise

Write a SQL query that selects the name (`name`) and age (`age`) from the table named `student` for students whose name is not equal to `'热dog'`.

`热dog` is a name in the sample data. Keep this exact string in your condition.
