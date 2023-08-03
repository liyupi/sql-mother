CREATE TABLE if not exists chicken_observation (
    observation_id INT,
    observer_name VARCHAR(50),
    observation_date DATE,
    observation_location VARCHAR(50),
    wave_intensity INT
);

INSERT INTO chicken_observation (observation_id, observer_name, observation_date, observation_location, wave_intensity)
VALUES
    (1, '张三', '2023-08-01', '大浪淘鸡海滩', 8),
    (2, '李四', '2023-08-02', '海岛东岸', 4),
    (3, '王五', '2023-08-03', '大浪淘鸡海滩', 9),
    (4, '赵六', '2023-08-04', '海洋之眼', 7),
    (5, '小明', '2023-08-05', '大浪淘鸡海滩', 6),
    (6, '小红', '2023-08-06', '海岛西岸', 3),
    (7, '小李', '2023-08-07', '大浪淘鸡海滩', 6),
    (8, '小张', '2023-08-08', '神秘海湾', 9),
    (9, '小王', '2023-08-09', '大浪淘鸡海滩', 5),
    (10, '小刘', '2023-08-10', '海洋之心', 8);
