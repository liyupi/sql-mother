# 函数 - 字符串处理

## 教程
在 SQL 中，字符串处理是一类用于处理文本数据的函数。它们允许我们对字符串进行各种操作，如转换大小写、计算字符串长度以及搜索和替换子字符串等。字符串处理函数可以帮助我们在数据库中对字符串进行加工和转换，从而满足不同的需求。



## 示例
假设有一个员工表 `employees`，包含以下字段：`id`（员工编号）、`name`（员工姓名）。数据如下：

| id | name       |
|----|------------|
| 1  | 小明       |
| 2  | 热dog      |
| 3  | Fish摸摸   |
| 4  | 鸡哥       |



1）使用字符串处理函数 `UPPER` 将姓名转换为大写：

```sql
-- 将姓名转换为大写
SELECT name, UPPER(name) AS upper_name
FROM employees;
```

查询结果：

| name       | upper_name |
|------------|------------|
| 小明       | 小明       |
| 热dog      | 热DOG      |
| Fish摸摸   | FISH摸摸   |
| 鸡哥       | 鸡哥       |



2）使用字符串处理函数 `LENGTH` 计算姓名长度：

```sql
-- 计算姓名长度
SELECT name, LENGTH(name) AS name_length
FROM employees;
```

查询结果：

| name       | name_length |
|------------|-------------|
| 小明       | 2           |
| 热dog      | 4           |
| Fish摸摸   | 6           |
| 鸡哥       | 2           |



3）使用字符串处理函数 `LOWER` 将姓名转换为小写：

```sql
-- 将姓名转换为小写并进行条件筛选
SELECT name, LOWER(name) AS lower_name
FROM employees;
```

查询结果：

| name     | lower_name |
| -------- | ---------- |
| 小明     | 小明       |
| 热dog    | 热dog      |
| Fish摸摸 | fish摸摸   |
| 鸡哥     | 鸡哥       |



## 题目

假设有一个学生表 `student`，包含以下字段：`id`（学号）、`name`（姓名）。请你编写一个 SQL 查询，筛选出姓名为 '热dog' 的学生，展示其学号（id）、姓名（name）及其大写姓名（upper_name）。

