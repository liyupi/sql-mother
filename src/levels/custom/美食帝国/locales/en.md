# The Food Empire

## The story

You are a data analyst at Yupi's Restaurant. Business has been unpredictable lately, and the owner, Yupi, cannot spot a pattern. He brings you the cash register data and asks you to find out which dishes sell best and when customers want them.

## The data

The `restaurant_orders` table contains details of each order:

- `order_id`: Order ID.
- `table_number`: Table number.
- `dish_name`: Dish name.
- `dish_category`: Dish category: `主食` (staples such as rice and noodles), `热菜` (hot dishes), `凉菜` (cold dishes), `汤品` (soups), `饮品` (drinks), or `甜品` (desserts).
- `dish_price`: Unit price, in yuan.
- `quantity`: Quantity ordered.
- `order_time`: Time the order was placed.
- `waiter_name`: Server's name.
- `customer_count`: Number of diners.
- `is_member`: Whether the customer is a member: 1 for yes, 0 for no.

## Your task

The owner wants to compare performance across dish categories. Write a SQL query that:

1. Calculates total sales for each category: the sum of unit price × quantity.
2. Counts the orders in each category.
3. Calculates the average unit price in each category.
4. Calculates the percentage of orders placed by members in each category.
5. Sorts by total sales from highest to lowest.

Return these columns in order:

- Dish category (`dish_category`).
- Total sales (`total_sales`).
- Order count (`order_count`).
- Average unit price (`avg_price`), rounded to 2 decimal places.
- Percentage of member orders (`member_ratio`), rounded to 1 decimal place with a `%` sign.

## Example result

These figures illustrate the output format:

```text
Category: 热菜, total sales: 15000 yuan, orders: 50, average unit price: 45.60 yuan, member percentage: 60.0%
```

Find out which dishes are the restaurant's biggest earners! 🍽️
