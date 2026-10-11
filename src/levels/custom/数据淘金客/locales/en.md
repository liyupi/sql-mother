# Mining for Customer Insights

## The story

You are a customer operations analyst at the Taobao World shopping platform, which has collected a wealth of user behavior data. The marketing director wants to understand how spending habits differ by age so the team can plan more targeted campaigns. Your job is to uncover the valuable insights hidden in that data.

## The data

The `ecommerce_behavior` table records users' basic details and shopping behavior:

- `user_id`: User ID.
- `user_name`: User name.
- `age`: User's age.
- `gender`: User's gender: `男` (male) or `女` (female).
- `city`: City.
- `registration_date`: Registration date.
- `total_orders`: Total number of orders.
- `total_amount`: Total spending, in yuan.
- `avg_order_amount`: Average order amount, in yuan.
- `favorite_category`: Preferred product category.
- `last_order_date`: Most recent order date.
- `is_vip`: Whether the user is a VIP: 1 for yes, 0 for no.

Product categories are stored in Chinese: `数码产品` (electronics), `服装` (clothing), `美妆` (beauty), `图书` (books), `家电` (home appliances), and `保健品` (health supplements).

## Your task

The operations team needs a report comparing users by age group. Write a SQL query that:

1. Groups users by age, using these exact labels in the query result:
   - `年轻群体` (younger users): under 30.
   - `中年群体` (middle age group): ages 30–49, inclusive.
   - `高龄群体` (older users): age 50 or above.
2. Counts the users in each age group.
3. Calculates each age group's average total spending per user.
4. Calculates each age group's average number of orders per user.
5. Calculates each age group's average order value by averaging the users' `avg_order_amount` values.
6. Calculates the percentage of VIP users in each age group.
7. Calculates each age group's gender ratio, formatted as male percentage:female percentage.
8. Finds the most popular product category in each age group by total spending: group users by `favorite_category` and compare the sums of `total_amount`.
9. Sorts by average total spending from highest to lowest.

Return these columns in order:

- Age group (`age_group`), using the Chinese labels listed above.
- User count (`user_count`).
- Average total spending (`avg_amount`), rounded to 2 decimal places.
- Average order count (`avg_orders`), rounded to 1 decimal place.
- Average order value (`avg_order_value`), rounded to 2 decimal places.
- VIP percentage (`vip_ratio`), rounded to 1 decimal place with a `%` sign.
- Gender ratio (`gender_ratio`), formatted as male percentage:female percentage, with each percentage rounded to 1 decimal place; for example, `60.0%:40.0%`.
- Most popular category (`popular_category`), using the stored Chinese value.

## Hints

- Use `CASE WHEN` to assign age groups.
- Use a subquery to find the most popular category.
- Follow the required format for the gender ratio, and use `男` and `女` when comparing gender values.

Test your data analysis skills with this customer profiling challenge! 📊
