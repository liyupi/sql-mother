CREATE TABLE if not exists rewards (
    adventurer_id INT,
    adventurer_name VARCHAR(50),
    task_id INT,
    task_name VARCHAR(100),
    reward_coins INT
);

INSERT INTO rewards (adventurer_id, adventurer_name, task_id, task_name, reward_coins)
VALUES
    (1, 'Alice', 101, 'Dragon Slaying', 500),
    (1, 'Alice', 102, 'Treasure Hunt', 300),
    (1, 'Alice', 103, 'Rescue Mission', 200),
    (2, 'Bob', 101, 'Dragon Slaying', 600),
    (2, 'Bob', 102, 'Treasure Hunt', 400),
    (3, 'Charlie', 103, 'Rescue Mission', 250),
    (4, 'David', 101, 'Dragon Slaying', 450),
    (4, 'David', 102, 'Treasure Hunt', 350),
    (4, 'David', 103, 'Rescue Mission', 150),
    (5, 'Eve', 101, 'Dragon Slaying', 700),
    (5, 'Eve', 102, 'Treasure Hunt', 250);
