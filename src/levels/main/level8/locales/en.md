# Basic Syntax - Filtering - Pattern Matching

## Tutorial

Pattern matching is a type of conditional query that finds data matching a particular pattern. In SQL, we use the `LIKE` keyword for this.

LIKE patterns use wildcards to stand for characters, allowing us to find matching data without specifying the entire value.

There are two wildcards:

- Percent sign (`%`): matches any sequence of characters, including an empty sequence.
- Underscore (`_`): matches exactly one character.

Imagine you are a detective searching for a person using only part of the information you know about them. For example, you might look for a particular word or character within their name. Pattern matching works in a similar way.

## Example

Suppose we have a table named `employees` that stores employees' names (`name`), ages (`age`), and positions (`position`).

The `employees` table:

| name | age | position |
| ---- | --- | -------- |
| 张三 | 25 | 软件工程师 |
| 李四 | 30 | 数据分析师 |
| 王五 | 28 | 产品经理 |
| 小明 | 22 | 软件测试工程师 |

The position values are Chinese job titles: software engineer, data analyst, product manager, and software test engineer, respectively.

Let's use LIKE to find employees whose name (`name`) contains the character `张` (Zhang):

```sql
-- SQL query
select name, age, position from employees where name like '%张%';
```

Query result:

| name | age | position |
| ---- | --- | -------- |
| 张三 | 25 | 软件工程师 |

We can also match the beginning or end of a value:

```sql
-- Select only rows where the name starts with "张"
select name, age, position from employees where name like '张%';

-- Select only rows where the name ends with "张"
select name, age, position from employees where name like '%张';
```

Similarly, we can use `not like` to find values that do not contain a particular word or character.

## Exercise

Write a SQL query that selects the name (`name`) and score (`score`) from the table named `student` for students whose name does not contain the character `李` (Li).

Use the Chinese character `李` itself in your pattern, since that is how it appears in the sample data.
