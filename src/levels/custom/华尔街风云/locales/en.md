# Wall Street in Focus

## The story

You are a quantitative analyst at Golden Bull Investments. A bull market has just ended, leaving the company with a large amount of stock trading data. The investment director wants to assess stock performance and find better investment strategies. You have been asked to uncover useful patterns in the data.

## The data

The `client_transactions` table records clients' stock trades:

- `transaction_id`: Transaction ID.
- `client_id`: Client ID.
- `client_name`: Client name.
- `stock_code`: Stock code.
- `stock_name`: Stock name.
- `transaction_type`: Transaction type: `买入` (buy) or `卖出` (sell).
- `quantity`: Number of shares traded.
- `price`: Trade price per share, in yuan.
- `transaction_date`: Transaction date.
- `sector`: Industry sector.

Use the original Chinese values `买入` and `卖出` when comparing transaction types.

## Your task

The risk team needs a detailed risk assessment report. Write a SQL query that:

1. Calculates each client's total traded value, including both buys and sells: the sum of `quantity * price`.
2. Counts each client's transactions.
3. Calculates each client's average value per transaction.
4. Counts the distinct stocks traded by each client.
5. Calculates each client's buy percentage: value of buy transactions / total traded value × 100.
6. Uses a window function to rank clients by total traded value, highest first.
7. Includes only clients whose total traded value is greater than 100000 yuan.
8. Sorts by the traded-value rank in ascending order.

Return these columns in order:

- Client name (`client_name`).
- Total traded value (`total_amount`).
- Transaction count (`transaction_count`).
- Average transaction value (`avg_amount`), rounded to 2 decimal places.
- Number of distinct stocks (`stock_count`).
- Buy percentage (`buy_ratio`), rounded to 1 decimal place with a `%` sign.
- Rank by total traded value (`amount_rank`).

## Hints

- Use `CASE WHEN` to distinguish buys from sells.
- Use the `RANK()` window function to calculate rankings.
- Use `COUNT(DISTINCT ...)` to count distinct stocks.
- Consider how to avoid division by zero.

Put your SQL skills together to solve this trading analysis challenge! 💼
