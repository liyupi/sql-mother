# Advanced Queries - Joins - OUTER JOIN

## Tutorial

In SQL, an outer join combines rows from two tables according to a join condition and **also includes unmatched rows**.

Two types are `LEFT OUTER JOIN` and `RIGHT OUTER JOIN`. A left outer join keeps every row from the left table, including those with no match; a right outer join does the same for the right table. Matching rows include the related data from both tables, while missing values from the other table are filled with `NULL`. The keyword `OUTER` can be omitted.

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
| 人事部     | 王五    | 广州     |
| 摸鱼部     | 赵二    | 吐鲁番   |

The Chinese sample values are kept unchanged. `技术部`, `财务部`, `销售部`, and `人事部` mean the Technology, Finance, Sales, and Human Resources departments. `摸鱼部` is a playful name meaning the "Slacking Off Department." The locations are Shanghai, Beijing, Guangzhou, and Turpan; the other Chinese values are people's names.

Use `LEFT JOIN` to match employees with departments by department name. Return each employee's name, salary, department, and department manager, keeping **all employees**:

```sql
SELECT e.emp_name, e.salary, e.department, d.manager
FROM employees e
LEFT JOIN departments d ON e.department = d.department;
```

Result:

| emp_name | salary | department | manager |
| -------- | ------ | ---------- | ------- |
| 小明     | 5000   | 技术部     | 张三    |
| 鸡哥     | 6000   | 财务部     | 李四    |
| 李华     | 4500   | 销售部     | NULL    |

Look at the last row: the Sales department (`销售部`), which Li Hua (`李华`) belongs to, is missing from the departments table. The employee still appears in the result, with `NULL` for `manager`.

Some databases do not support `RIGHT JOIN`. You can achieve the same result with a `LEFT JOIN` by swapping the tables: put the table you want to preserve after `FROM` and the other table after `LEFT JOIN`.

## Exercise

The `student` table includes these columns: `id` (student ID), `name` (name), `age` (age), and `class_id` (class ID). The `class` table includes `id` (class ID), `name` (class name), and `level` (class level).

Write a SQL query that matches `student.class_id` to `class.id`. Return the student's name as `student_name`, age as `student_age`, the student's class ID as `class_id`, class name as `class_name`, and class level as `class_level`, in that order. **Include every student**, even if their class ID has no matching row in `class`.
