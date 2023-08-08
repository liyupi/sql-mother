# 分组聚合 - 多字段分组


## 教程
有时，单字段分组并不能满足我们的需求，比如想统计学校里每个班级每次考试的学生情况，这时就可以使用多字段分组。

多字段分组和单字段分组的实现方式几乎一致，使用 `GROUP BY` 语法即可。



## 示例
假设有一个订单表 `orders`，包含以下字段：`order_id`（订单号）、`product_id`（商品编号）、`customer_id`（客户编号）、`amount`（订单金额）。

数据如下：

| order_id | product_id | customer_id | amount |
|---------|-------------|--------|---------|
| 1       | 1      | A001        | 100    |
| 2       | 1      | A002        | 200    |
| 3       | 1      | A001        | 150    |
| 4       | 1      | A003        | 50     |
| 5 | 2 | A001 | 50 |



要查询使用多字段分组查询表中 **每个客户** 购买的 **每种商品** 的总金额，相当于按照客户编号和商品编号分组：

```sql
-- 查询每个用户购买的每种商品的总金额，按照客户编号和商品编号分组
SELECT customer_id, product_id, SUM(amount) AS total_amount
FROM orders
GROUP BY customer_id, product_id;
```



查询结果：

| customer_id | product_id | total_amount |
| ----------- | ---------- | ------------ |
| A001        | 1          | 250          |
| A001        | 2          | 50           |
| A002        | 1          | 200          |
| A003        | 1          | 50           |



## 题目

假设有一个学生表 `student`，包含以下字段：`id`（学号）、`name`（姓名）、`class_id`（班级编号）、`exam_num`（考试次数）、`score`（成绩）。请你编写一个 SQL 查询，统计学生表中的班级编号（class_id），考试次数（exam_num）和每个班级每次考试的总学生人数（total_num）。

