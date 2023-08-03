# 冒险者和金币

假设有一家冒险者公会，他们有一张名为 `rewards` 的表格，用于记录每个冒险者在各个任务中获得的金币奖励情况。

表格字段如下：

- `adventurer_id`：冒险者ID，唯一标识每个冒险者。
- `adventurer_name`：冒险者姓名。
- `task_id`：任务ID，唯一标识每个任务。
- `task_name`：任务名称。
- `reward_coins`：冒险者在该任务中获得的金币奖励数量。

请你编写一条 SQL 查询语句，依次输出每个冒险者的 id（`adventurer_id`）、冒险者姓名（`adventurer_name`）、获得的总金币奖励（`total_reward_coins`），并按照总金币奖励从高到低排序，其中只列出总金币奖励排名前 3 的冒险者。
