# 基础语法 - 截断和偏移

## 教程

我们先用一个比喻来引出截断和偏移的概念。

假设你有一张待办事项清单，上面有很多任务。当你每次只想查看其中的几个任务时，会怎么办呢？

1）你可以使用手指挡住不需要看的部分（即截断）

2）根据任务的编号，直接翻到需要查看的位置（即偏移）



在 SQL 中，我们使用 `LIMIT` 关键字来实现数据的截断和偏移。

截断和偏移的一个典型的应用场景是分页，即网站内容很多时，用户可以根据页号每次只看部分数据。



## 示例
假设有一张名为 `tasks` 的数据表，它存储了待办事项信息，包括任务名称（task_name）和截止日期（due_date）等。

数据表`tasks`：

|    task_name   | due_date  |
|----------------|-----------|
|  完成报告      | 2023-08-05|
|  预约医生      | 2023-08-08|
|  购买礼物      | 2023-08-10|
|  安排旅行      | 2023-08-15|



现在，我们使用`LIMIT`关键字来进行分页查询：

```sql
-- LIMIT 后只跟一个整数，表示要截断的数据条数（一次获取几条）
select task_name, due_date from tasks limit 2;

-- LIMIT 后跟 2 个整数，依次表示从第几条数据开始、一次获取几条
select task_name, due_date from tasks limit 2, 2;
```



查询语句 1 结果，只获取了 2 条数据：

|   task_name   | due_date  |
|---------------|-----------|
|  完成报告      | 2023-08-05|
|  预约医生      | 2023-08-08|



查询语句 2 结果，从下标为 2（第 3 条）数据的位置开始获取 2 条数据：

|   task_name   | due_date  |
|---------------|-----------|
|  购买礼物      | 2023-08-10|
|  安排旅行      | 2023-08-15|



通过上述 SQL 查询语句，我们分别选取了待办事项表中的前两个任务和从第三个任务开始的两个任务，实现了数据的截断和偏移。



## 题目

请编写一条 SQL 查询语句，从名为 `student` 的数据表中选择学生姓名（name）和年龄（age），按照年龄从小到大排序，从第 2 条数据开始、截取 3 个学生的信息。
