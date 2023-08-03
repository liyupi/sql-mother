# 函数 - 聚合函数

## 教程
在 SQL 中，聚合函数是一类用于对数据集进行 **汇总计算** 的特殊函数。它们可以对一组数据执行诸如计数、求和、平均值、最大值和最小值等操作。聚合函数通常在 SELECT 语句中配合 GROUP BY 子句使用，用于对分组后的数据进行汇总分析。

常见的聚合函数包括：

- COUNT：计算指定列的行数或非空值的数量。
- SUM：计算指定列的数值之和。
- AVG：计算指定列的数值平均值。
- MAX：找出指定列的最大值。
- MIN：找出指定列的最小值。



## 示例
假设有一个订单表 `orders`，包含以下字段：`order_id`（订单号）、`customer_id`（客户编号）、`amount`（订单金额）。数据如下：

| order_id | customer_id | amount |
|---------|-------------|--------|
| 1       | A001        | 100    |
| 2       | A002        | 200    |
| 3       | A001        | 150    |
| 4       | A003        | 50     |



1）使用聚合函数 `COUNT` 计算订单表中的总订单数：

```sql
SELECT COUNT(*) AS order_num
FROM orders;
```

查询结果：

| order_num |
| --------- |
| 4         |



2）使用聚合函数 `COUNT(DISTINCT 列名)` 计算订单表中不同客户的数量：

```sql
SELECT COUNT(DISTINCT customer_id) AS customer_num
FROM orders;
```

查询结果：

| customer_num |
| ------------ |
| 3            |



3）使用聚合函数 `SUM` 计算总订单金额：

```sql
SELECT SUM(amount) AS total_amount
FROM orders;
```

查询结果：

| total_amount |
| ------------ |
| 500          |



## 题目

假设有一个学生表 `student`，包含以下字段：`id`（学号）、`name`（姓名）、`class_id`（班级编号）、`score`（成绩）。请你编写一个 SQL 查询，汇总学生表中所有学生的总成绩（total_score）、平均成绩（avg_score）、最高成绩（max_score）和最低成绩（min_score）。
