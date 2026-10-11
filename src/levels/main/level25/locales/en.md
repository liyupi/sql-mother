# Advanced Queries - Combining Query Results

## Tutorial

In SQL, a compound query combines the results of multiple `SELECT` queries.

Two common operations for doing this are `UNION` and `UNION ALL`:

1. `UNION` combines the results of two or more queries **and removes duplicate rows**. If the results contain identical rows, only one copy is kept.
2. `UNION ALL` combines the results of two or more queries **and keeps duplicate rows**. If the results contain identical rows, every copy is kept.

## Examples

Suppose we have two tables, `table1` and `table2`, containing employee information from different departments.

The `table1` table:

| emp_id | name    | age | department |
| ------ | ------- | --- | ---------- |
| 101    | Alice   | 25  | HR         |
| 102    | Bob     | 28  | Finance    |
| 103    | Charlie | 22  | IT         |

The `table2` table:

| emp_id | name  | age | department |
| ------ | ----- | --- | ---------- |
| 101    | Alice | 25  | HR         |
| 201    | David | 27  | Finance    |
| 202    | Eve   | 24  | HR         |
| 203    | Frank | 26  | IT         |

Let's combine data from these tables using each operation.

Using `UNION`:

```sql
SELECT name, age, department
FROM table1
UNION
SELECT name, age, department
FROM table2;
```

The result removes the duplicate row for Alice:

| name    | age | department |
| ------- | --- | ---------- |
| Alice   | 25  | HR         |
| Bob     | 28  | Finance    |
| Charlie | 22  | IT         |
| David   | 27  | Finance    |
| Eve     | 24  | HR         |
| Frank   | 26  | IT         |

Using `UNION ALL`:

```sql
-- Keep all rows, including duplicates.
SELECT name, age, department
FROM table1
UNION ALL
SELECT name, age, department
FROM table2;
```

The result keeps the duplicate row:

| name    | age | department |
| ------- | --- | ---------- |
| Alice   | 25  | HR         |
| Bob     | 28  | Finance    |
| Charlie | 22  | IT         |
| Alice   | 25  | HR         |
| David   | 27  | Finance    |
| Eve     | 24  | HR         |
| Frank   | 26  | IT         |

## Exercise

The `student` table includes these columns: `id` (student ID), `name` (name), `age` (age), `score` (score), and `class_id` (class ID). A second table, `student_new`, has exactly the same columns and contains new students.

Write a SQL query that combines all students from `student` and `student_new`. Return their names (`name`), ages (`age`), scores (`score`), and class IDs (`class_id`), in that order. Keep duplicate student records.
