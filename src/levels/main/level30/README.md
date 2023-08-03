# 查询进阶 - 开窗函数 - lag / lead

## 教程
开窗函数 Lag 和 Lead 的作用是获取在当前行之前或之后的行的值，这两个函数通常在需要比较相邻行数据或进行时间序列分析时非常有用。

1）Lag 函数

Lag 函数用于获取 **当前行之前** 的某一列的值。它可以帮助我们查看上一行的数据。

Lag 函数的语法如下：

```sql
LAG(column_name, offset, default_value) OVER (PARTITION BY partition_column ORDER BY sort_column)
```

参数解释：

- `column_name`：要获取值的列名。
- `offset`：表示要向上偏移的行数。例如，offset为1表示获取上一行的值，offset为2表示获取上两行的值，以此类推。
- `default_value`：可选参数，用于指定当没有前一行时的默认值。
- `PARTITION BY`和`ORDER BY`子句可选，用于分组和排序数据。



2）Lead 函数

Lead 函数用于获取 **当前行之后** 的某一列的值。它可以帮助我们查看下一行的数据。

Lead 函数的语法如下：

```sql
LEAD(column_name, offset, default_value) OVER (PARTITION BY partition_column ORDER BY sort_column)
```

参数解释：

- `column_name`：要获取值的列名。
- `offset`：表示要向下偏移的行数。例如，offset为1表示获取下一行的值，offset为2表示获取下两行的值，以此类推。
- `default_value`：可选参数，用于指定当没有后一行时的默认值。
- `PARTITION BY`和`ORDER BY`子句可选，用于分组和排序数据。



## 示例

以下是一个示例，假设我们有一个学生成绩表`scores`，其中包含学生的成绩和考试日期：

| student_id | exam_date  | score |
| ---------- | ---------- | ----- |
| 101        | 2023-01-01 | 85    |
| 101        | 2023-01-05 | 78    |
| 101        | 2023-01-10 | 92    |
| 101        | 2023-01-15 | 80    |



现在我们想要查询每个学生的考试日期和上一次考试的成绩，以及下一次考试的成绩，示例 SQL 如下：

```sql
SELECT 
    student_id,
    exam_date,
    score,
    LAG(score, 1, NULL) OVER (PARTITION BY student_id ORDER BY exam_date) AS previous_score,
    LEAD(score, 1, NULL) OVER (PARTITION BY student_id ORDER BY exam_date) AS next_score
FROM
    scores;
```

结果将是：

| student_id | exam_date  | score | previous_score | next_score |
| ---------- | ---------- | ----- | -------------- | ---------- |
| 101        | 2023-01-01 | 85    | NULL           | 78         |
| 101        | 2023-01-05 | 78    | 85             | 92         |
| 101        | 2023-01-10 | 92    | 78             | 80         |
| 101        | 2023-01-15 | 80    | 92             | NULL       |

在上面的示例中，我们使用 Lag 函数获取每个学生的上一次考试成绩（previous_score），使用 Lead 函数获取每个学生的下一次考试成绩（next_score）。如果没有上一次或下一次考试，对应的列将显示为 NULL。




## 题目
假设有一个学生表 `student`，包含以下字段：`id`（学号）、`name`（姓名）、`age`（年龄）、`score`（分数）、`class_id`（班级编号）。

请你编写一个 SQL 查询，返回每个学生的详细信息（字段顺序和原始表的字段顺序一致），并且按照分数降序的方式获取每个班级内的学生的前一名学生姓名（prev_name）、后一名学生姓名（next_name）。

