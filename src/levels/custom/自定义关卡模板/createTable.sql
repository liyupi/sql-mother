CREATE TABLE if not exists magic_scores (
    student_id INT,
    student_name VARCHAR(50),
    subject_id INT,
    subject_name VARCHAR(100),
    score INT
);

INSERT INTO magic_scores (student_id, student_name, subject_id, subject_name, score)
VALUES
    (1, 'Harry Potter', 101, 'Potion Making', 85),
    (1, 'Harry Potter', 102, 'Spell Casting', 90),
    (1, 'Harry Potter', 103, 'Broomstick Flying', 80),
    (2, 'Hermione Granger', 101, 'Potion Making', 95),
    (2, 'Hermione Granger', 102, 'Spell Casting', 98),
    (2, 'Hermione Granger', 103, 'Broomstick Flying', 92),
    (3, 'Ron Weasley', 101, 'Potion Making', 78),
    (3, 'Ron Weasley', 102, 'Spell Casting', 85),
    (3, 'Ron Weasley', 103, 'Broomstick Flying', 88),
    (4, 'Neville Longbottom', 101, 'Potion Making', 75),
    (4, 'Neville Longbottom', 102, 'Spell Casting', 70),
    (4, 'Neville Longbottom', 103, 'Broomstick Flying', 68);
