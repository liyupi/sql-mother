# Shopping for Insights

## The story

You are a data analyst at the Taobao World shopping platform. The November 11 shopping festival has just ended, and your boss wants a closer look at the promotion's results. Armed with a stack of order data and dreams of the next bestselling product, your boss asks you to find the ingredients for an even better sale!

## The data

The `order_items` table records the products purchased in each order:

- `order_id`: Order ID.
- `product_id`: Product ID.
- `product_name`: Product name.
- `category`: Product category.
- `price`: Unit price.
- `quantity`: Quantity purchased.
- `order_date`: Order date.

Category values are stored in Chinese: `数码产品` (electronics), `服装` (clothing), `图书` (books), and `生活用品` (household goods).

## Your task

Your boss wants to compare sales across product categories. Write a SQL query that:

1. Calculates total revenue for each category: the sum of `price * quantity`.
2. Calculates the total quantity sold in each category.
3. Sorts by total revenue from highest to lowest.
4. Returns the category (`category`), total revenue (`total_revenue`), and total quantity sold (`total_quantity`), in that order.

## Example data

These figures illustrate the output format:

```text
Category: 数码产品, total revenue: 15000, total quantity: 25
Category: 服装, total revenue: 8500, total quantity: 42
```

Help your boss discover which category brings in the most revenue! 💰
