# Basic Syntax - Queries - Selecting Columns

## Tutorial

Selecting columns is one of the most basic SQL operations. It lets us choose **specific columns, or fields**, from a table and return only the values in those columns.

The syntax starts with `SELECT column_name, ...`, which tells the database which columns we want to see.

Here's an analogy: imagine you manage a class and have a student list containing each student's name (`name`), age (`age`), gender (`gender`), and score (`score`). You want to see the students' names and ages to understand their basic information. You only need to select the `name` and `age` columns from the list.

## Example

Suppose we have a table named `students` that stores information about a class, including each student's name (`name`), age (`age`), gender (`gender`), and score (`score`).

The `students` table:

| name | age | gender | score |
| ---- | --- | ------ | ----- |
| John | 18 | Male | 90 |
| Alice | 17 | Female | 88 |
| Bob | 19 | Male | 78 |
| Kate | 18 | Female | 95 |

Now let's select the name (`name`) and gender (`gender`) of every student:

```sql
select name, gender from students;
```

Query result:

| name | gender |
| ---- | ------ |
| John | Male |
| Alice | Female |
| Bob | Male |
| Kate | Female |

This query retrieves the name and gender of every student in the table.

## Exercise

Write a SQL query that selects the name (`name`) and age (`age`) of every student from the table named `student`.

For every exercise, **the output columns must appear in the order requested**. In this exercise, the student's name (`name`) must come first, followed by their age (`age`).
