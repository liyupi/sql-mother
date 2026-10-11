# Functions - String Functions

## Tutorial

SQL string functions work with text data. They let us perform operations such as converting text to uppercase or lowercase, calculating string lengths, and finding or replacing parts of a string. These functions help us process and transform text stored in a database to meet different needs.

## Example

Suppose an `employees` table contains an employee ID (`id`) and name (`name`), with the following data:

| id | name |
| -- | ---- |
| 1 | 小明 |
| 2 | 热dog |
| 3 | Fish摸摸 |
| 4 | 鸡哥 |

1. Use the `UPPER` string function to convert names to uppercase:

```sql
-- Convert names to uppercase
SELECT name, UPPER(name) AS upper_name
FROM employees;
```

Query result:

| name | upper_name |
| ---- | ---------- |
| 小明 | 小明 |
| 热dog | 热DOG |
| Fish摸摸 | FISH摸摸 |
| 鸡哥 | 鸡哥 |

2. Use the `LENGTH` string function to calculate the length of each name:

```sql
-- Calculate the length of each name
SELECT name, LENGTH(name) AS name_length
FROM employees;
```

Query result:

| name | name_length |
| ---- | ----------- |
| 小明 | 2 |
| 热dog | 4 |
| Fish摸摸 | 6 |
| 鸡哥 | 2 |

3. Use the `LOWER` string function to convert names to lowercase:

```sql
-- Convert names to lowercase
SELECT name, LOWER(name) AS lower_name
FROM employees;
```

Query result:

| name | lower_name |
| ---- | ---------- |
| 小明 | 小明 |
| 热dog | 热dog |
| Fish摸摸 | fish摸摸 |
| 鸡哥 | 鸡哥 |

In these examples, the Chinese characters stay the same when changing case, while the English letters change. The displayed lengths count characters, including the Chinese characters.

## Exercise

Suppose a `student` table contains a student ID (`id`) and name (`name`). Write a SQL query that finds students whose name is `'热dog'` and displays their student ID (`id`), name (`name`), and uppercase name (`upper_name`).

Use the name `'热dog'` exactly as shown to match the sample data.
