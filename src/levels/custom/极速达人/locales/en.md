# Delivery Speed Champions

## The story

You are an operations analyst at Flash Delivery. The company has introduced a new performance review system, and the HR director wants to choose the month's Delivery Speed Champion. Dig into the delivery data to find the couriers who excel in speed and efficiency!

## The data

The `courier_performance` table records each courier's daily performance:

- `record_id`: Record ID.
- `courier_id`: Courier ID.
- `courier_name`: Courier name.
- `delivery_date`: Delivery date.
- `orders_completed`: Number of completed orders.
- `orders_failed`: Number of failed orders.
- `total_distance`: Total delivery distance, in kilometers.
- `work_hours`: Hours worked.
- `customer_rating`: Customer rating on a scale from 1 to 5.
- `delivery_area`: Delivery area.

## Your task

The operations director wants a comprehensive courier performance report. Write a SQL query that:

1. Calculates each courier's total completed orders.
2. Calculates each courier's total failed orders.
3. Calculates each courier's success rate: completed orders / total orders × 100.
4. Calculates each courier's average customer rating.
5. Calculates each courier's total delivery distance.
6. Calculates each courier's efficiency as the average of their daily completed orders per hour: calculate `orders_completed / work_hours` for each daily record, then average those rates.
7. Includes only couriers with at least 20 total orders, counting both completed and failed orders.
8. Sorts by success rate from highest to lowest. When success rates are equal, sort by completed orders from highest to lowest.

Return these columns in order:

- Courier name (`courier_name`).
- Total completed orders (`total_completed`).
- Total failed orders (`total_failed`).
- Success rate (`success_rate`), rounded to 1 decimal place with a `%` sign.
- Average rating (`avg_rating`), rounded to 1 decimal place.
- Total delivery distance (`total_distance`), rounded to 1 decimal place.
- Efficiency (`efficiency`), rounded to 1 decimal place, measured in orders per hour.

## Example result

These figures illustrate the output format. The name `鱼皮` is Yupi:

```text
Courier: 鱼皮, completed: 315 orders, failed: 11 orders, success rate: 96.6%, rating: 4.8, distance: 1303.7 km, efficiency: 5.2 orders/hour
```

Find this month's Delivery Speed Champion! 🚀
