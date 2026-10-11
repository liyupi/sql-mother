# The Delivery League

## The story

You are a data analyst at Fair Wind Express, responsible for comparing delivery efficiency across the country. Customer complaints have recently surged, and the operations director needs your help. Use the data to identify the fastest couriers and those who need support, so the company can improve its delivery service.

## The data

The `delivery_records` table stores parcel delivery information:

- `delivery_id`: Delivery ID.
- `order_id`: Order ID.
- `courier_id`: Courier ID.
- `courier_name`: Courier name.
- `sender_city`: City the parcel was sent from.
- `receiver_city`: Destination city.
- `package_weight`: Package weight, in kilograms.
- `delivery_distance`: Delivery distance, in kilometers.
- `send_time`: Dispatch time.
- `receive_time`: Time the parcel was signed for.
- `delivery_status`: Delivery status: `已签收` (delivered and signed for), `派送中` (out for delivery), or `已退回` (returned).
- `is_express`: Whether the delivery is urgent: 1 for yes, 0 for no.
- `delivery_fee`: Delivery fee, in yuan.

Use the original Chinese values when filtering by delivery status.

## Your task

The operations director needs a comprehensive efficiency report. Write a SQL query that:

1. Calculates the following metrics for each courier:
   - Total delivery orders.
   - Successful delivery rate: signed-for orders / total orders × 100.
   - Average delivery time in hours: the difference between `receive_time` and `send_time`.
   - Average delivery distance.
   - Total delivery fees.
   - Average fee per kilometer: total fees / total distance.
2. Uses window functions to rank couriers by:
   - Total delivery orders, highest first.
   - Successful delivery rate, highest first.
3. Applies these filters:
   - Include only orders with status `已签收` or `派送中`.
   - Include only couriers with at least 5 such orders. Calculate the rankings among these qualifying couriers.
4. Sorts by successful delivery rate from highest to lowest, then by total delivery orders from highest to lowest.

Return these columns in order:

- Courier name (`courier_name`).
- Total delivery orders (`total_orders`).
- Successful delivery rate (`success_rate`), rounded to 1 decimal place with a `%` sign.
- Average delivery time in hours (`avg_delivery_hours`), rounded to 1 decimal place.
- Average delivery distance (`avg_distance`), rounded to 1 decimal place.
- Total delivery fees (`total_fee`).
- Average fee per kilometer (`fee_per_km`), rounded to 2 decimal places.
- Rank by order count (`orders_rank`).
- Rank by success rate (`success_rank`).

## Hints

- Use `JULIANDAY` to calculate time differences. Its result is in days, so convert the difference to hours.
- Use `CASE WHEN` to count successful deliveries.
- Use the `RANK()` window function to calculate rankings.
- Use a subquery to handle the more complex filtering and sorting.

This challenge brings several advanced SQL techniques together! 🚚
