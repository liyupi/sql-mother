# Basic Syntax - Queries - Aliases

## Tutorial

An alias gives a table column or a field in a query result a temporary, more readable name. This makes the result easier to understand.

Think of an alias as a nickname. Suppose you lead a team whose members each have their own names. To make communication easier, you give everyone a nickname. These nicknames do not change anyone's actual information; they simply provide convenient names to use within the team.

In SQL, the syntax `original_column_name as alias` gives a column in the query result an easy-to-understand name. Aliases help readers see what each column means and make the results easier to use.

## Example

Suppose we have a table named `employees` that stores team members' names (`name`), ages (`age`), and positions (`position`).

The `employees` table:

| name | age | position |
| ---- | --- | -------- |
| John | 30 | Project Manager |
| Alice | 28 | Software Engineer |
| Bob | 32 | Product Designer |
| Kate | 26 | Marketing Specialist |

Let's retrieve every team member's name (`name`) and position (`position`), using the aliases `员工姓名` (employee name) and `职位名称` (position title):

```sql
-- SQL query
select name as 员工姓名, position as 职位名称 from employees;
```

> The `as` keyword is optional in this example. For instance, `name 员工姓名` also works.

Query result — notice that the column headings have changed from English to Chinese:

| 员工姓名 | 职位名称 |
| -------- | -------- |
| John | Project Manager |
| Alice | Software Engineer |
| Bob | Product Designer |
| Kate | Marketing Specialist |

The query retrieves every team member's name and position, using aliases to make the output more descriptive and easier to read.

## Exercise

Write a SQL query that selects the name (`name`) and age (`age`) of every student from the table named `student`. Give these columns the aliases `学生姓名` (student name) and `学生年龄` (student age), respectively.

Use these Chinese aliases exactly as shown; they are the required output column names.
