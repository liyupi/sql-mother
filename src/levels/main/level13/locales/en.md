# Basic Syntax - Conditional Expressions

## Tutorial

The `case when` expression lets SQL choose a result based on a condition. It is similar to an if/else statement in other programming languages: different conditions can produce different results.

Use `case when` to calculate a new column in a query result or transform the values of an existing column according to specified conditions.

For example, imagine you are a server in a restaurant. Your guests order different dishes, and you choose how to serve them based on what they ordered. For fish, you provide utensils and service suited to fish; for steak, you provide what is appropriate for steak. CASE WHEN works like this process of choosing a different response for each situation.

## Example

Suppose a `student` table contains the columns `name` and `age`, with the following data:

| name | age |
| ---- | --- |
| 小明 | 18 |
| 鸡哥 | 25 |
| 李华 | 30 |
| 王五 | 40 |

Let's use CASE WHEN to decide whether a student can rap based on their name, and give the result the alias `can_rap`.

Example SQL:

```sql
SELECT
  name,
  CASE WHEN (name = '鸡哥') THEN '会' ELSE '不会' END AS can_rap
FROM
  student;
```

Here, `'鸡哥'` is a name in the sample data, `'会'` means "can," and `'不会'` means "cannot."

Query result:

| name | can_rap |
| ---- | ------- |
| 小明 | 不会 |
| 鸡哥 | 会 |
| 李华 | 不会 |
| 王五 | 不会 |

CASE WHEN supports multiple branches in the same expression:

```sql
CASE WHEN (condition1) THEN result1
     WHEN (condition2) THEN result2
     ...
     ELSE other_result END
```

## Exercise

Suppose a `student` table contains the columns `name` and `age`. Write a SQL query that assigns each student to one of three age categories, using the column name `age_level`:

- Over 60: `'老同学'` (older student).
- Over 20, but no older than 60: `'年轻'` (young).
- 20 or younger, or with no age information: `'小同学'` (younger student).

Use the Chinese category strings exactly as shown. Return the student's name (`name`) and age category (`age_level`), and sort by name in ascending order.
