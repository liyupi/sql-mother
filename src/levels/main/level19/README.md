# 分组聚合 - having 子句

## 教程
在 SQL 中，HAVING 子句用于在分组聚合后对分组进行过滤。它允许我们对分组后的结果进行条件筛选，只保留满足特定条件的分组。

HAVING 子句与条件查询 WHERE 子句的区别在于，WHERE 子句用于在 **分组之前** 进行过滤，而 HAVING 子句用于在 **分组之后** 进行过滤。



## 示例
假设有一个订单表 `orders`，包含以下字段：`order_id`（订单号）、`customer_id`（客户编号）、`amount`（订单金额）。数据如下：

| order_id | customer_id | amount |
|---------|-------------|--------|
| 1       | A001        | 100    |
| 2       | A002        | 200    |
| 3       | A001        | 150    |
| 4       | A003        | 50     |



1）使用 HAVING 子句查询订单数超过 1 的客户：

```sql
SELECT customer_id, COUNT(order_id) AS order_num
FROM orders
GROUP BY customer_id
HAVING COUNT(order_id) > 1;
```

查询结果：

| customer_id | order_num |
| ----------- | --------- |
| A001        | 2         |



2）使用 HAVING 子句查询订单总金额超过 100 的客户：

```sql
-- 查询订单总金额超过100的客户
SELECT customer_id, SUM(amount) AS total_amount
FROM orders
GROUP BY customer_id
HAVING SUM(amount) > 100;
```

查询结果：

| customer_id | total_amount |
| ----------- | ------------ |
| A001        | 250          |
| A002        | 200          |



## 题目

假设有一个学生表 `student`，包含以下字段：`id`（学号）、`name`（姓名）、`class_id`（班级编号）、`score`（成绩）。请你编写一个 SQL 查询，统计学生表中班级的总成绩超过 150 分的班级编号（class_id）和总成绩（total_score）。
