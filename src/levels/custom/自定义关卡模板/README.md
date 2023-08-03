# 自定义关卡中文名

假设有一家魔法学院，里面有许多学员在不同科目上进行学习和考试。请你设计一张名为`magic_scores`的表格，用于记录每位学员在不同科目中的考试成绩情况。表格字段如下：

- `student_id`：学员ID，唯一标识每位学员。
- `student_name`：学员姓名。
- `subject_id`：科目ID，唯一标识每个科目。
- `subject_name`：科目名称。
- `score`：学员在该科目的考试成绩。

请你编写一条 SQL 查询语句，依次输出每位学员的学院 ID（`student_id`）、学员姓名（`student_name`）、科目 ID（`subject_id`）、科目名称（`subject_name`）、学员在该科目的考试成绩（`score`）、该学员在每个科目中的成绩排名（`score_rank`），并将结果按照成绩从高到低进行排序。
