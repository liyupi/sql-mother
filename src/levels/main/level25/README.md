

# 查询进阶 - 组合查询

## 教程
在 SQL 中，组合查询是一种将多个 SELECT 查询结果合并在一起的查询操作。

包括两种常见的组合查询操作：UNION 和 UNION ALL。

1. UNION 操作：它用于将两个或多个查询的结果集合并， **并去除重复的行** 。即如果两个查询的结果有相同的行，则只保留一行。

2. UNION ALL 操作：它也用于将两个或多个查询的结果集合并， **但不去除重复的行** 。即如果两个查询的结果有相同的行，则全部保留。



## 示例
假设我们有以下两个数据表：`table1` 和 `table2`，分别包含不同部门的员工信息。

table1 表：

| emp_id | name     | age | department |
|--------|----------|-----|------------|
| 101    | Alice    | 25  | HR         |
| 102    | Bob      | 28  | Finance    |
| 103    | Charlie  | 22  | IT         |



table2 表：

| emp_id | name  | age  | department |
| ------ | ----- | ---- | ---------- |
| 101    | Alice | 25   | HR         |
| 201    | David | 27   | Finance    |
| 202    | Eve   | 24   | HR         |
| 203    | Frank | 26   | IT         |



现在，我们想要合并这两张表的数据，分别执行 UNION 操作和 UNION ALL 操作。

UNION 操作：

```sql
SELECT name, age, department
FROM table1
UNION
SELECT name, age, department
FROM table2;
```



UNION 操作的结果，去除了重复的行（名称为 Alice）：

| name    | age | department |
|---------|-----|------------|
| Alice   | 25  | HR         |
| Bob     | 28  | Finance    |
| Charlie | 22  | IT         |
| David   | 27  | Finance    |
| Eve     | 24  | HR         |
| Frank   | 26  | IT         |



UNION ALL 操作：

```sql
-- UNION ALL操作
SELECT name, age, department
FROM table1
UNION ALL
SELECT name, age, department
FROM table2;
```



结果如下，保留了重复的行：

| name    | age  | department |
| ------- | ---- | ---------- |
| Alice   | 25   | HR         |
| Bob     | 28   | Finance    |
| Charlie | 22   | IT         |
| Alice   | 25   | HR         |
| David   | 27   | Finance    |
| Eve     | 24   | HR         |
| Frank   | 26   | IT         |



## 题目

假设有一个学生表 `student`，包含以下字段：`id`（学号）、`name`（姓名）、`age`（年龄）、`score`（分数）、`class_id`（班级编号）。还有一个新学生表 `student_new`，包含的字段和学生表完全一致。

请编写一条 SQL 语句，获取所有学生表和新学生表的学生姓名（`name`）、年龄（`age`）、分数（`score`）、班级编号（`class_id`）字段，要求保留重复的学生记录。

