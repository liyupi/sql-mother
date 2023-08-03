# 查询进阶 - 开窗函数 - row_number

## 教程


Row_Number 开窗函数是 SQL 中的一种用于为查询结果集中的每一行 **分配唯一连续排名** 的开窗函数。

它与之前讲到的 Rank 函数，Row_Number 函数为每一行都分配一个唯一的整数值，不管是否存在并列（相同排序值）的情况。每一行都有一个唯一的行号，从 1 开始连续递增。

Row_Number 开窗函数的语法如下（几乎和 Rank 函数一模一样）：

```sql
ROW_NUMBER() OVER (
  PARTITION BY column1, column2, ... -- 可选，用于指定分组列
  ORDER BY column3 [ASC|DESC], column4 [ASC|DESC], ... -- 用于指定排序列及排序方式
) AS row_number_column
```

其中，`PARTITION BY`子句可选，用于指定分组列，将结果集按照指定列进行分组。`ORDER BY` 子句用于指定排序列及排序方式，决定了计算 Row_Number 时的排序规则。`AS row_number_column` 用于指定生成的行号列的别名。



## 示例
假设我们有订单表 `orders`，表格数据如下：

| order_id | customer_id | order_date | total_amount |
|----------|-------------|------------|--------------|
| 1        | 101         | 2023-01-01 | 200          |
| 2        | 102         | 2023-01-05 | 350          |
| 3        | 101         | 2023-01-10 | 120          |
| 4        | 103         | 2023-01-15 | 500          |



现在，我们希望为每个客户的订单按照订单金额降序排列，并且分配一个 row_number 编号，示例 SQL 语句如下：

```sql
SELECT 
    order_id, 
    customer_id, 
    order_date, 
    total_amount,
    ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY total_amount DESC) AS row_number
FROM
    orders;
```



结果将是：

| order_id | customer_id | order_date | total_amount | row_number |
| -------- | ----------- | ---------- | ------------ | ---------- |
| 4        | 103         | 2023-01-15 | 500          | 1          |
| 2        | 102         | 2023-01-05 | 350          | 1          |
| 1        | 101         | 2023-01-01 | 200          | 1          |
| 3        | 101         | 2023-01-10 | 120          | 2          |



在上面的示例中，我们使用开窗函数 ROW_NUMBER 为每个客户的订单按照订单金额降序排列，并为每个订单分配了一个编号（row_number），并使用 PARTITION BY 子句按照 customer_id 进行分组，并使用 ORDER BY 子句按照 total_amount 进行排序。



## 题目
假设有一个学生表 `student`，包含以下字段：`id`（学号）、`name`（姓名）、`age`（年龄）、`score`（分数）、`class_id`（班级编号）。

请你编写一个 SQL 查询，返回每个学生的详细信息（字段顺序和原始表的字段顺序一致），并且按照分数降序的方式给每个班级内的学生分配一个编号（row_number）。
