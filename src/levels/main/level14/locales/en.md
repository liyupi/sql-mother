# Functions - Date and Time Functions

## Tutorial

Date and time functions are special SQL functions for working with dates, times, and combined date-and-time values. They make it easier to perform time-related operations in database queries.

Common functions used in this lesson include:

- `DATE`: get the current date.
- `DATETIME`: get the current date and time.
- `TIME`: get the current time.

## Example

Suppose an `orders` table contains an order ID (`order_id`), order date (`order_date`), and order time (`order_time`), with the following data:

| order_id | order_date | order_time |
| -------- | ---------- | ---------- |
| 1 | 2023-08-01 | 12:30:45 |
| 2 | 2023-08-01 | 14:20:10 |
| 3 | 2023-08-02 | 09:15:00 |
| 4 | 2023-08-02 | 18:05:30 |

Use date and time functions to get the current date, the current date and time, and the current time:

```sql
-- Get the current date
SELECT DATE() AS current_date;

-- Get the current date and time
SELECT DATETIME() AS current_datetime;

-- Get the current time
SELECT TIME() AS current_time;
```

Query results:

> The three separate results are shown together in one table for comparison.

| current_date | current_datetime | current_time |
| ------------ | ---------------- | ------------ |
| 2023-08-01 | 2023-08-01 14:30:00 | 14:30:00 |

> These values are generated from the current system time. The values you see when running the queries will depend on when you run them.

There are many other date and time operations, such as calculating the number of days between two dates or obtaining a timestamp in milliseconds. Look up the relevant functions when you need them; we will not cover them in detail here.

## Exercise

Suppose a `student` table contains the columns `name` and `age`.

Write a SQL query that displays every student's name (`name`) and the current date. Name the date column `当前日期`, which means "current date."

Use the Chinese alias `当前日期` exactly as shown.
