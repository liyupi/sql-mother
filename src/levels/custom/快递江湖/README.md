# 快递江湖

## 背景故事

你是"顺风快递"的数据分析师，负责分析全国各地的配送效率。最近客户投诉激增，运营总监坐立不安，急需你用数据找出那些"神速小哥"和"龟速选手"，优化配送团队！

## 数据说明

我们有一个配送记录表 `delivery_records`，记录了快递的配送信息：

- `delivery_id`：配送 ID
- `order_id`：订单 ID
- `courier_id`：快递员 ID
- `courier_name`：快递员姓名
- `sender_city`：寄件城市
- `receiver_city`：收件城市
- `package_weight`：包裹重量（kg）
- `delivery_distance`：配送距离（km）
- `send_time`：发件时间
- `receive_time`：签收时间
- `delivery_status`：配送状态（已签收/派送中/已退回）
- `is_express`：是否加急（1/0）
- `delivery_fee`：配送费用（元）

## 任务要求

运营总监需要一个综合的效率分析报告，请你编写复杂的 SQL 查询：

1. 计算每个快递员的配送效率指标：

   - 总配送单数
   - 成功配送率（已签收/总单数\*100）
   - 平均配送时长（小时，receive_time - send_time）
   - 平均配送距离
   - 总配送费用
   - 平均单公里费用（总费用/总距离）

2. 使用窗口函数计算每个快递员在所有快递员中的排名：

   - 按总配送单数排名
   - 按成功配送率排名

3. 筛选条件：

   - 只显示配送单数大于等于 5 单的快递员
   - 只统计已签收和派送中的订单

4. 按成功配送率降序，总配送单数降序排列

返回字段：

- 快递员姓名（courier_name）
- 总配送单数（total_orders）
- 成功配送率（success_rate，保留 1 位小数，加%符号）
- 平均配送时长（avg_delivery_hours，保留 1 位小数）
- 平均配送距离（avg_distance，保留 1 位小数）
- 总配送费用（total_fee）
- 平均单公里费用（fee_per_km，保留 2 位小数）
- 配送单数排名（orders_rank）
- 成功率排名（success_rank）

## 提示

- 使用 JULIANDAY 函数计算时间差
- 使用 CASE WHEN 统计成功配送
- 使用窗口函数 RANK()计算排名
- 使用子查询处理复杂的筛选和排序

这是一个具有挑战性的查询，需要综合运用多种 SQL 高级特性！🚚
