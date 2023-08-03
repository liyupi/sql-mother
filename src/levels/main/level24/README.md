# 查询进阶 - 子查询 - exists

## 教程
之前的教程讲到，子查询是一种强大的查询工具，它可以嵌套在主查询中，帮助我们进行更复杂的条件过滤和数据检索。

其中，子查询中的一种特殊类型是 "exists" 子查询，用于检查主查询的结果集是否存在满足条件的记录，它返回布尔值（True 或 False），而不返回实际的数据。



## 示例
假设我们有以下两个数据表：`orders` 和 `customers`，分别包含订单信息和客户信息。

orders 表：

| order_id | customer_id | order_date | total_amount |
|----------|-------------|------------|--------------|
| 1        | 101         | 2023-01-01 | 200          |
| 2        | 102         | 2023-01-05 | 350          |
| 3        | 101         | 2023-01-10 | 120          |
| 4        | 103         | 2023-01-15 | 500          |



customers 表：

| customer_id | name    | city        |
| ----------- | ------- | ----------- |
| 101         | Alice   | New York    |
| 102         | Bob     | Los Angeles |
| 103         | Charlie | Chicago     |
| 104         | 赵二    | China       |



现在，我们希望查询出 **存在订单的** 客户姓名和订单金额。

使用 exists 子查询的方式，SQL 代码如下：

```sql
-- 主查询
SELECT name, total_amount
FROM customers
WHERE EXISTS (
    -- 子查询
    SELECT 1
    FROM orders
    WHERE orders.customer_id = customers.customer_id
);
```



上述语句中，先遍历客户信息表的每一行，获取到客户编号；然后执行子查询，从订单表中查找该客户编号是否存在，如果存在则返回结果。

查询结果如下：

| name   | total_amount |
|--------|--------------|
| Alice  | 200          |
| Bob    | 350          |
| Charlie| 500          |



和 exists 相对的是 not exists，用于查找不满足存在条件的记录。



## 题目

假设有一个学生表 `student`，包含以下字段：`id`（学号）、`name`（姓名）、`age`（年龄）、`score`（分数）、`class_id`（班级编号）。还有一个班级表 `class`，包含以下字段：`id`（班级编号）、`name`（班级名称）。

请你编写一个 SQL 查询，使用 exists 子查询的方式来获取 **不存在对应班级的** 学生的所有数据，返回学生姓名（`name`）、年龄（`age`）、班级编号（`class_id`）字段。

