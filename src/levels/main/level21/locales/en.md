# Advanced Queries - Joins - INNER JOIN

## Tutorial

In SQL, `INNER JOIN` is a common way to combine tables. It combines rows from two tables when they satisfy a specified join condition.

An `INNER JOIN` returns only matching rows from the two tables. Rows without a match are left out of the result.

## Example

Suppose an `employees` table has these columns: `emp_id` (employee ID), `emp_name` (employee name), `department` (department), and `salary` (salary). It contains the following data:

| emp_id | emp_name | department | salary |
| ------ | -------- | ---------- | ------ |
| 1      | 小明     | 技术部     | 5000   |
| 2      | 鸡哥     | 财务部     | 6000   |
| 3      | 李华     | 销售部     | 4500   |

There is also a `departments` table with these columns: `department` (department name), `manager` (department manager), and `location` (location):

| department | manager | location |
| ---------- | ------- | -------- |
| 技术部     | 张三    | 上海     |
| 财务部     | 李四    | 北京     |
| 销售部     | 王五    | 广州     |
| 摸鱼部     | 赵二    | 吐鲁番   |

The Chinese sample values are kept unchanged. `技术部`, `财务部`, and `销售部` mean the Technology, Finance, and Sales departments; `摸鱼部` is a playful name meaning the "Slacking Off Department." The locations are Shanghai, Beijing, Guangzhou, and Turpan, and the other Chinese values are people's names.

Use `INNER JOIN` to match the two tables on their shared `department` column, combining each employee's name, salary, and department with that department's manager. `JOIN` on its own means `INNER JOIN`:

```sql
SELECT e.emp_name, e.salary, e.department, d.manager
FROM employees e
JOIN departments d ON e.department = d.department;
```

Result:

| emp_name | salary | department | manager |
| -------- | ------ | ---------- | ------- |
| 小明     | 5000   | 技术部     | 张三    |
| 鸡哥     | 6000   | 财务部     | 李四    |
| 李华     | 4500   | 销售部     | 王五    |

Only rows with a matching relationship between the two tables appear in the result. The department `摸鱼部` has no matching employee, so it does not appear.

## Exercise

The `student` table includes these columns: `id` (student ID), `name` (name), `age` (age), and `class_id` (class ID). The `class` table includes `id` (class ID), `name` (class name), and `level` (class level).

Write a SQL query that matches `student.class_id` to `class.id`. Return the student's name as `student_name`, age as `student_age`, class ID as `class_id`, class name as `class_name`, and class level as `class_level`, in that order. Include only students with a matching class.
