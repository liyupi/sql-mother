# Advanced Queries - Joins - CROSS JOIN

## Tutorial

So far, all our queries have worked with a single table. Sometimes we need information from another table too, such as details about the class a student belongs to. This is where joins come in.

In SQL, a join combines data from multiple tables.

`CROSS JOIN` is a simple kind of join that does not need a condition to match rows. It combines **every row** in the left table with **every row** in the right table. The result is the Cartesian product of the two tables.

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

The sample values remain in Chinese: `技术部`, `财务部`, and `销售部` mean the Technology, Finance, and Sales departments. The locations are Shanghai (`上海`), Beijing (`北京`), and Guangzhou (`广州`); the other Chinese values are people's names.

Use `CROSS JOIN` to combine all rows from the employee and department tables, returning the employee name, salary, department name, and department manager:

```sql
SELECT e.emp_name, e.salary, d.department, d.manager
FROM employees e
CROSS JOIN departments d;
```

You can also write this query as:

```sql
SELECT e.emp_name, e.salary, d.department, d.manager
FROM employees e, departments d;
```

Separating the table names with a comma implicitly produces a Cartesian product. This older SQL syntax has the same effect as `CROSS JOIN` in this example.

When querying multiple tables, it is good practice to qualify columns with their table name or alias, as in `e.emp_name`. Giving a table an alias, as in `employees e`, helps keep the SQL concise.

Result:

| emp_name | salary | department | manager |
| -------- | ------ | ---------- | ------- |
| 小明     | 5000   | 技术部     | 张三    |
| 小明     | 5000   | 财务部     | 李四    |
| 小明     | 5000   | 销售部     | 王五    |
| 鸡哥     | 6000   | 技术部     | 张三    |
| 鸡哥     | 6000   | 财务部     | 李四    |
| 鸡哥     | 6000   | 销售部     | 王五    |
| 李华     | 4500   | 技术部     | 张三    |
| 李华     | 4500   | 财务部     | 李四    |
| 李华     | 4500   | 销售部     | 王五    |

## Exercise

The `student` table includes these columns: `id` (student ID), `name` (name), `age` (age), and `class_id` (the student's class ID). The `class` table includes `id` (class ID) and `name` (class name).

Write a SQL query that combines every student row with every class row. Return the student's name as `student_name`, the student's age as `student_age`, the **student table's `class_id`** as `class_id`, and the class table's name as `class_name`, in that order.

Because this is a cross join, the returned class name can belong to a different class from the student's `class_id`. Do not add a condition matching the class IDs.
