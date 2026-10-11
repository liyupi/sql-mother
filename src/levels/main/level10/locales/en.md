# Basic Syntax - Removing Duplicates

## Tutorial

A table can contain repeated data. If we want to filter out duplicates and keep only distinct results, we can use SQL's duplicate-removal feature.

The `DISTINCT` keyword removes duplicates from a query result.

For example, imagine you are a class representative who wants a list of the different students in a class, regardless of how many times each appears in the records. Removing duplicates would help you do this.

## Example

Suppose we have a table named `students` that stores student information, including each student's name (`name`), class ID (`class_id`), exam number (`exam_num`), and score (`score`).

The `students` table:

| name | class_id | exam_num | score |
| ---- | -------- | -------- | ----- |
| 张三 | 1 | 1 | 90 |
| 李四 | 2 | 2 | 85 |
| 王五 | 1 | 1 | 92 |
| 李四 | 2 | 3 | 88 |

Let's use DISTINCT to find the different class IDs:

```sql
-- SQL query
select distinct class_id from students;
```

Query result:

| class_id |
| -------- |
| 1 |
| 2 |

DISTINCT can also remove duplicates based on a combination of several columns. In that case, each combination of column values appears only once in the result.

The syntax in the SELECT list is:

```sql
distinct column1, column2, column3, ...
```

## Exercise

Write a SQL query that selects all distinct combinations of class ID (`class_id`) and exam number (`exam_num`) from the table named `student`.
