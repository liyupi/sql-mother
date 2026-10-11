# Adventurers and Gold Coins

An adventurers' guild uses a table named `rewards` to record the gold coins each adventurer earns from different quests.

The table has the following columns:

- `adventurer_id`: The ID that uniquely identifies each adventurer.
- `adventurer_name`: The adventurer's name.
- `task_id`: The ID that uniquely identifies each quest.
- `task_name`: The quest's name.
- `reward_coins`: The number of gold coins the adventurer earned from that quest.

Write a SQL query that returns each adventurer's ID (`adventurer_id`), name (`adventurer_name`), and total gold coins earned (`total_reward_coins`), in that column order. Sort by total gold coins from highest to lowest and return only the top three adventurers (three rows).
