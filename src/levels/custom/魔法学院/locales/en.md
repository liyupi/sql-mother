# The Magic Academy

A magic academy has students who study and take exams in several subjects. Their exam scores are recorded in a table named `magic_scores`, with the following columns:

- `student_id`: The ID that uniquely identifies each student.
- `student_name`: The student's name.
- `subject_id`: The ID that uniquely identifies each subject.
- `subject_name`: The subject's name.
- `score`: The student's exam score in that subject.

Write a SQL query that returns the following columns, in order: student ID (`student_id`), student name (`student_name`), subject ID (`subject_id`), subject name (`subject_name`), exam score (`score`), and the student's rank within that subject (`score_rank`). Rank higher scores first, and sort the results by score from highest to lowest.
