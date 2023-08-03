# 大浪淘鸡

在神秘的海岛上，有一只传说中的大浪淘鸡，它身躯高大威武，羽毛闪烁着神秘的光芒。岛上的居民都传说大浪淘鸡是海洋之神的化身，它能够操纵海浪，带来平静或狂暴的海洋。为了验证这个传说是否属实，岛上的居民决定对大浪淘鸡进行观测和记录。

有一张 `chicken_observation` 的表格，用于记录居民观测大浪淘鸡的信息。表格字段如下：

- `observation_id`：观测记录ID，唯一标识每条观测记录
- `observer_name`：观测者姓名
- `observation_date`：观测日期
- `observation_location`：观测地点
- `wave_intensity`：观测到的海浪强度，用整数表示，数值越大，海浪越狂暴

请你编写一条 SQL 查询语句，找出观测地点包含 "大浪淘鸡" 且海浪强度超过 5 的观测记录，并依次输出每位观测者的姓名（`observer_name`）、观测日期（`observation_date`）以及观测到的海浪强度（`wave_intensity`）。
