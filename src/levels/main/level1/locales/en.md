# Basic Syntax - Queries - Selecting All Data

## Tutorial

At the beginning of our SQL journey, we need to understand a few basic concepts: databases, tables, SQL, SELECT queries, and queries that retrieve an entire table.

A database is a place specifically designed to store and manage data. Think of it as a large library that can hold a great deal of information. Inside the library, we can create different bookshelves, each representing a table.

Each bookshelf holds many books. A row in a table is like a book, and each column is like one of the book's attributes, such as its title or publication date.

SQL (Structured Query Language) is a standardized language for managing, manipulating, and querying databases. It is widely used in databases such as MySQL, PostgreSQL, Oracle, and Microsoft SQL Server. This tutorial series introduces SQL queries through commonly used SQL syntax.

SQL has an approachable syntax that resembles natural language, making it easier for developers and database administrators to work with databases. Whether you are building a website, business software, or a large data system, SQL is a fundamental tool for working with data.

How do we use SQL to retrieve data from a database?

First, we need to understand SELECT queries. A SELECT query is like finding the books that interest us in a library. We use it to retrieve the information we need from a table, just as we use a library catalog to find a book we want to read.

SELECT queries support many forms of syntax. In this lesson, we will learn the simplest: **selecting all the data from a table**.

When we write a statement such as `select * from table_name`, it returns every row and every column in that table, giving us a complete view of its data.

## Example

Suppose we have a table named `student` that stores student information, including student IDs, names, and ages.

Let's use a SELECT query to view the entire student table.

The `student` table:

| Student ID | Name | Age |
| ---------- | ---- | --- |
| 101 | 小明 | 20 |
| 102 | 小红 | 22 |
| 103 | 小刚 | 21 |
| 104 | 小丽 | 19 |

SQL query:

```sql
select * from student;
```

Query result:

| Student ID | Name | Age |
| ---------- | ---- | --- |
| 101 | 小明 | 20 |
| 102 | 小红 | 22 |
| 103 | 小刚 | 21 |
| 104 | 小丽 | 19 |

This query retrieves all the student information in the table. Simple, isn't it?

Try the exercise below!

## Exercise

Write a SQL query that retrieves all student information from the table named `student`.
