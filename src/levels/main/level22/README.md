# 查询进阶 - 关联查询 - outer join

## 教程

在 SQL 中，OUTER JOIN 是一种关联查询方式，它根据指定的关联条件，将两个表中满足条件的行组合在一起，并 **包含没有匹配的行** 。

在 OUTER JOIN 中，包括 LEFT OUTER JOIN 和 RIGHT OUTER JOIN 两种类型，它们分别表示查询左表和右表的所有行（即使没有被匹配），再加上满足条件的交集部分。



## 示例

假设有一个员工表 `employees`，包含以下字段：`emp_id`（员工编号）、`emp_name`（员工姓名）、`department`（所属部门）、`salary`（工资）。数据如下：

| emp_id | emp_name | department | salary |
| ------ | -------- | ---------- | ------ |
| 1      | 小明     | 技术部     | 5000   |
| 2      | 鸡哥     | 财务部     | 6000   |
| 3      | 李华     | 销售部     | 4500   |



假设还有一个部门表 `departments`，包含以下字段：`department`（部门名称）、`manager`（部门经理）、`location`（所在地）。数据如下：

| department | manager | location |
| ---------- | ------- | -------- |
| 技术部     | 张三    | 上海     |
| 财务部     | 李四    | 北京     |
| 人事部     | 王五    | 广州     |
| 摸鱼部     | 赵二    | 吐鲁番   |



使用 LEFT JOIN 进行关联查询，根据员工表和部门表之间的部门名称进行匹配，将员工的姓名、工资以及所属部门和部门经理组合在一起，并包含所有员工的信息：

```sql
SELECT e.emp_name, e.salary, e.department, d.manager
FROM employees e
LEFT JOIN departments d ON e.department = d.department;
```



查询结果：

| emp_name | salary | department | manager |
|----------|--------|------------|---------|
| 小明     | 5000   | 技术部     | 张三    |
| 鸡哥     | 6000   | 财务部     | 李四    |
| 李华     | 4500   | 销售部     | NULL    |



关注下表格的最后一条数据，李华所属的销售部并没有在部门表中，但仍然返回在了结果集中，manager 为 NULL。

有些数据库并不支持 RIGHT JOIN 语法，那么如何实现 RIGHT JOIN 呢？

其实只需要把主表（from 后面的表）和关联表（LEFT JOIN 后面的表）顺序进行调换即可！



## 题目

假设有一个学生表 `student`，包含以下字段：`id`（学号）、`name`（姓名）、`age`（年龄）、`class_id`（班级编号）。还有一个班级表 `class`，包含以下字段：`id`（班级编号）、`name`（班级名称）、`level`（班级级别）。

请你编写一个 SQL 查询，根据学生表和班级表之间的班级编号进行匹配，返回学生姓名（`student_name`）、学生年龄（`student_age`）、班级编号（`class_id`）、班级名称（`class_name`）、班级级别（`class_level`），要求必须返回所有学生的信息（即使对应的班级编号不存在）。

