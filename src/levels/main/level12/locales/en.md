# Basic Syntax - Limits and Offsets

## Tutorial

Let's introduce limits and offsets with an analogy.

Imagine you have a long to-do list. What would you do if you only wanted to see a few tasks at a time?

1. Cover the part you do not want to see with your finger. This is like setting a limit.
2. Jump straight to a particular task number. This is like setting an offset.

In SQL, we can use the `LIMIT` clause to limit how many rows a query returns and to skip rows using an offset.

A typical use for limits and offsets is pagination. When a website has a lot of content, users can choose a page number and view just one portion of the data at a time.

## Example

Suppose we have a table named `tasks` that stores to-do items, including each task's name (`task_name`) and due date (`due_date`).

The `tasks` table:

| task_name | due_date |
| --------- | -------- |
| 完成报告 | 2023-08-05 |
| 预约医生 | 2023-08-08 |
| 购买礼物 | 2023-08-10 |
| 安排旅行 | 2023-08-15 |

The task names mean "finish the report," "make a doctor's appointment," "buy a gift," and "plan a trip," respectively.

Let's use LIMIT to retrieve one page of results at a time:

```sql
-- One integer after LIMIT sets the maximum number of rows to return
select task_name, due_date from tasks limit 2;

-- Two integers after LIMIT specify the offset, then the number of rows to return
select task_name, due_date from tasks limit 2, 2;
```

Result of query 1, returning only two rows:

| task_name | due_date |
| --------- | -------- |
| 完成报告 | 2023-08-05 |
| 预约医生 | 2023-08-08 |

Result of query 2, returning two rows starting at index 2, which is the third row:

| task_name | due_date |
| --------- | -------- |
| 购买礼物 | 2023-08-10 |
| 安排旅行 | 2023-08-15 |

These queries retrieve the first two tasks, and then two tasks starting with the third task, demonstrating limits and offsets.

## Exercise

Write a SQL query that selects students' names (`name`) and ages (`age`) from the table named `student`. Sort by age from smallest to largest, then return three students starting with the second row of the sorted result.
