# 查询进阶 - 开窗函数 - sum over order by

## 教程
之前的教程中，我们讲到了 sum over 开窗函数，并且用它实现了分组统计。

本节教程我们将学习 sum over 函数的另一种用法：sum over order by，可以实现同组内数据的 **累加求和** 。

示例用法如下：

```sql
SUM(计算字段名) OVER (PARTITION BY 分组字段名 ORDER BY 排序字段 排序规则)
```



举一个应用场景：老师在每个班级里依次点名，每点到一个学生，老师都会记录当前已点到的学生们的分数总和。



## 示例
假设我们有订单表 `orders`，表格数据如下：

| order_id | customer_id | order_date | total_amount |
|----------|-------------|------------|--------------|
| 1        | 101         | 2023-01-01 | 200          |
| 2        | 102         | 2023-01-05 | 350          |
| 3        | 101         | 2023-01-10 | 120          |
| 4        | 103         | 2023-01-15 | 500          |



现在，我们希望计算每个客户的历史订单累计金额，并显示每个订单的详细信息。

```sql
SELECT 
    order_id, 
    customer_id, 
    order_date, 
    total_amount,
    SUM(total_amount) OVER (PARTITION BY customer_id ORDER BY order_date ASC) AS cumulative_total_amount
FROM
    orders;
```



结果将是：

| order_id | customer_id | order_date  | total_amount | cumulative_total_amount |
|----------|-------------|-------------|--------------|-------------------------|
| 1        | 101         | 2023-01-01  | 200          | 200                     |
| 3        | 101         | 2023-01-10  | 120          | 320                     |
| 2        | 102         | 2023-01-05  | 350          | 350                     |
| 4        | 103         | 2023-01-15  | 500          | 500                     |



在上面的示例中，我们使用开窗函数 SUM 来计算每个客户的历史订单累计金额（cumulative_total_amount），并使用 PARTITION BY 子句按照 customer_id 进行分组，并使用 ORDER BY 子句按照 order_date 进行排序。从结果的前两行可以看到，开窗函数保留了原始订单的详细信息，同时计算了每个客户的历史订单累计金额；相比于只用 sum over，同组内的累加列名称



## 题目
假设有一个学生表 `student`，包含以下字段：`id`（学号）、`name`（姓名）、`age`（年龄）、`score`（分数）、`class_id`（班级编号）。

请你编写一个 SQL 查询，返回每个学生的详细信息（字段顺序和原始表的字段顺序一致），并且按照分数升序的方式累加计算每个班级的学生总分（class_sum_score）。

