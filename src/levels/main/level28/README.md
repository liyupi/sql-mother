# 查询进阶 - 开窗函数 - rank

## 教程
本节我们来学习一个新的开窗函数 Rank。

Rank 开窗函数是 SQL 中一种用于对查询结果集中的行进行 **排名** 的开窗函数。它可以根据指定的列或表达式对结果集中的行进行排序，并为每一行分配一个排名。在排名过程中，相同的值将被赋予相同的排名，而不同的值将被赋予不同的排名。

> 当存在并列（相同排序值）时，Rank 会跳过后续排名，并保留相同的排名。

Rank 开窗函数的常见用法是在查询结果中查找前几名（Top N）或排名最高的行。

Rank 开窗函数的语法如下：

```sql
RANK() OVER (
  PARTITION BY 列名1, 列名2, ... -- 可选，用于指定分组列
  ORDER BY 列名3 [ASC|DESC], 列名4 [ASC|DESC], ... -- 用于指定排序列及排序方式
) AS rank_column
```

其中，`PARTITION BY` 子句可选，用于指定分组列，将结果集按照指定列进行分组；`ORDER BY` 子句用于指定排序列及排序方式，决定了计算 Rank 时的排序规则。`AS rank_column` 用于指定生成的 Rank 排名列的别名。



## 示例
假设我们有订单表 `orders`，表格数据如下：

| order_id | customer_id | order_date | total_amount |
|----------|-------------|------------|--------------|
| 1        | 101         | 2023-01-01 | 200          |
| 2        | 102         | 2023-01-05 | 350          |
| 3        | 101         | 2023-01-10 | 120          |
| 4        | 103         | 2023-01-15 | 500          |



现在，我们希望为每个客户的订单按照订单金额降序排名，并显示每个订单的详细信息。

```sql
SELECT 
    order_id, 
    customer_id, 
    order_date, 
    total_amount,
    RANK() OVER (PARTITION BY customer_id ORDER BY total_amount DESC) AS customer_rank
FROM
    orders;
```



查询结果：

| order_id | customer_id | order_date | total_amount | customer_rank |
| -------- | ----------- | ---------- | ------------ | ------------- |
| 1        | 101         | 2023-01-01 | 200          | 1             |
| 3        | 101         | 2023-01-10 | 120          | 2             |
| 2        | 102         | 2023-01-05 | 350          | 1             |
| 4        | 103         | 2023-01-15 | 500          | 1             |



在上面的示例中，我们使用开窗函数 RANK 来为每个客户的订单按照订单金额降序排名（customer_rank），并使用 PARTITION BY 子句按照 customer_id 进行分组，并使用 ORDER BY 子句按照 total_amount 从大到小进行排序。

可以看到，开窗函数保留了原始订单的详细信息，同时计算了每个客户的订单金额排名。



## 题目

假设有一个学生表 `student`，包含以下字段：`id`（学号）、`name`（姓名）、`age`（年龄）、`score`（分数）、`class_id`（班级编号）。

请你编写一个 SQL 查询，返回每个学生的详细信息（字段顺序和原始表的字段顺序一致），并且按照分数降序的方式计算每个班级内的学生的分数排名（ranking）。

