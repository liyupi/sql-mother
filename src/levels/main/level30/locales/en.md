# Advanced Queries - Window Functions - LAG and LEAD

## Tutorial

`LAG` and `LEAD` retrieve values from rows before or after the current row. They are useful for comparing neighboring rows or analyzing how values change over time.

### 1. LAG

`LAG` retrieves a column's value from a row **before the current row**. It lets us look back at an earlier row's data.

The syntax is:

```sql
LAG(column_name, offset, default_value) OVER (PARTITION BY partition_column ORDER BY sort_column)
```

Parameters and clauses:

- `column_name`: the column whose value you want to retrieve.
- `offset`: how many rows to look back. An offset of 1 retrieves the preceding row's value; an offset of 2 retrieves the value from two rows earlier. If omitted, the offset is 1.
- `default_value`: an optional value to return when there is no row at the requested offset in the partition. If omitted, the result is `NULL`.
- `PARTITION BY` and `ORDER BY`: define the partitions and the order of rows within them. `PARTITION BY` is optional; without it, all rows belong to one partition. In this lesson's database, `ORDER BY` can also be omitted, but you should specify it to give "previous" a meaningful order.

### 2. LEAD

`LEAD` retrieves a column's value from a row **after the current row**. It lets us look ahead at a later row's data.

The syntax is:

```sql
LEAD(column_name, offset, default_value) OVER (PARTITION BY partition_column ORDER BY sort_column)
```

Parameters and clauses:

- `column_name`: the column whose value you want to retrieve.
- `offset`: how many rows to look ahead. An offset of 1 retrieves the following row's value; an offset of 2 retrieves the value from two rows later. If omitted, the offset is 1.
- `default_value`: an optional value to return when there is no row at the requested offset in the partition. If omitted, the result is `NULL`.
- `PARTITION BY` and `ORDER BY`: define the partitions and the order of rows within them. `PARTITION BY` is optional; without it, all rows belong to one partition. In this lesson's database, `ORDER BY` can also be omitted, but you should specify it to give "next" a meaningful order.

For both functions, the default applies when the requested row does not exist. It does not replace a `NULL` value stored in an existing row.

## Example

Suppose a `scores` table contains students' exam scores and exam dates:

| student_id | exam_date  | score |
| ---------- | ---------- | ----- |
| 101        | 2023-01-01 | 85    |
| 101        | 2023-01-05 | 78    |
| 101        | 2023-01-10 | 92    |
| 101        | 2023-01-15 | 80    |

We want to return each student's exam date and score, along with their previous and next exam scores:

```sql
SELECT
    student_id,
    exam_date,
    score,
    LAG(score, 1, NULL) OVER (PARTITION BY student_id ORDER BY exam_date) AS previous_score,
    LEAD(score, 1, NULL) OVER (PARTITION BY student_id ORDER BY exam_date) AS next_score
FROM
    scores;
```

Result:

| student_id | exam_date  | score | previous_score | next_score |
| ---------- | ---------- | ----- | -------------- | ---------- |
| 101        | 2023-01-01 | 85    | NULL           | 78         |
| 101        | 2023-01-05 | 78    | 85             | 92         |
| 101        | 2023-01-10 | 92    | 78             | 80         |
| 101        | 2023-01-15 | 80    | 92             | NULL       |

`LAG` retrieves each student's previous exam score as `previous_score`, while `LEAD` retrieves their next exam score as `next_score`. If there is no previous or next exam, the corresponding column contains `NULL`.

## Exercise

The `student` table includes these columns: `id` (student ID), `name` (name), `age` (age), `score` (score), and `class_id` (class ID).

Write a SQL query that returns each student's `id`, `name`, `age`, `score`, and `class_id`, in that exact order. Within each class, order students by score from highest to lowest. Append the preceding student's name as `prev_name` and the following student's name as `next_name`. Return `NULL` when there is no preceding or following student in that class.

For this exercise, return the five student columns listed above rather than selecting every column in the table.
