# 分组聚合 - 单字段分组

## 教程
在 SQL 中，分组聚合是一种对数据进行分类并对每个分类进行聚合计算的操作。它允许我们按照指定的列或字段对数据进行分组，然后对每个分组应用聚合函数，如 COUNT、SUM、AVG 等，以获得分组后的汇总结果。

举个例子：某个学校可以按照班级将学生分组，并对每个班级进行统计。查看每个班级有多少学生、每个班级的平均成绩。这样我们就能够对学校各班的学生情况有一个整体的了解，而不是单纯看个别学生的信息。

在 SQL 中，通常使用 `GROUP BY` 关键字对数据进行分组。



## 示例
假设有一个订单表 `orders`，包含以下字段：`order_id`（订单号）、`customer_id`（客户编号）、`amount`（订单金额）。数据如下：

| order_id | customer_id | amount |
|---------|-------------|--------|
| 1       | A001        | 100    |
| 2       | A002        | 200    |
| 3       | A001        | 150    |
| 4       | A003        | 50     |



1）使用分组聚合查询中每个客户的编号：

```sql
SELECT customer_id
FROM orders
GROUP BY customer_id;
```

查询结果：

| customer_id |
| ----------- |
| A001        |
| A002        |
| A003        |



2）使用分组聚合查询每个客户的下单数：

```sql
SELECT customer_id, COUNT(order_id) AS order_num
FROM orders
GROUP BY customer_id;
```

查询结果：

| customer_id | order_num |
| ----------- | --------- |
| A001        | 2         |
| A002        | 1         |
| A003        | 1         |



## 题目

假设有一个学生表 `student`，包含以下字段：`id`（学号）、`name`（姓名）、`class_id`（班级编号）、`score`（成绩）。请你编写一个 SQL 查询，统计学生表中的班级编号（class_id）和每个班级的平均成绩（avg_score）。
