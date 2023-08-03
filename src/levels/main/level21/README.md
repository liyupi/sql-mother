# 查询进阶 - 关联查询 - inner join

## 教程
在 SQL 中，INNER JOIN 是一种常见的关联查询方式，它根据两个表之间的关联条件，将满足条件的行组合在一起。

注意，INNER JOIN 只返回两个表中满足关联条件的交集部分，即在两个表中都存在的匹配行。



## 示例
假设有一个员工表 `employees`，包含以下字段：`emp_id`（员工编号）、`emp_name`（员工姓名）、`department`（所属部门）、`salary`（工资）。数据如下：

| emp_id | emp_name | department | salary |
|--------|----------|------------|--------|
| 1      | 小明     | 技术部     | 5000   |
| 2      | 鸡哥     | 财务部     | 6000   |
| 3      | 李华     | 销售部     | 4500   |



假设还有一个部门表 `departments`，包含以下字段：`department`（部门名称）、`manager`（部门经理）、`location`（所在地）。数据如下：

| department | manager | location |
| ---------- | ------- | -------- |
| 技术部     | 张三    | 上海     |
| 财务部     | 李四    | 北京     |
| 销售部     | 王五    | 广州     |
| 摸鱼部     | 赵二    | 吐鲁番   |



使用 INNER JOIN 进行关联查询，根据员工表和部门表之间的公共字段 `部门名称（department）` 进行匹配，将员工的姓名、工资以及所属部门和部门经理组合在一起：

```sql
SELECT e.emp_name, e.salary, e.department, d.manager
FROM employees e
JOIN departments d ON e.department = d.department;
```



查询结果如下：

| emp_name | salary | department | manager |
|----------|--------|------------|---------|
| 小明     | 5000   | 技术部     | 张三    |
| 鸡哥     | 6000   | 财务部     | 李四    |
| 李华     | 4500   | 销售部     | 王五    |



我们会发现，使用 INNER_JOIN 后，只有两个表之间存在对应关系的数据才会被放到查询结果中。



## 题目

假设有一个学生表 `student`，包含以下字段：`id`（学号）、`name`（姓名）、`age`（年龄）、`class_id`（班级编号）。还有一个班级表 `class`，包含以下字段：`id`（班级编号）、`name`（班级名称）、`level`（班级级别）。

请你编写一个 SQL 查询，根据学生表和班级表之间的班级编号进行匹配，返回学生姓名（`student_name`）、学生年龄（`student_age`）、班级编号（`class_id`）、班级名称（`class_name`）、班级级别（`class_level`）。

