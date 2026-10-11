# Golden Bull Investments

## The story

You are a risk analyst at Golden Bull Investments. Markets have been volatile, and the company has collected a large amount of financial trading data. The risk director wants to compare the risks and returns of different financial products and asks you to uncover insights for a better investment strategy.

## The data

The `stock_transactions` table contains details of each stock trade:

- `transaction_id`: Transaction ID.
- `stock_code`: Stock code.
- `stock_name`: Stock name.
- `sector`: Industry sector: `科技` (technology), `金融` (finance), `医药` (pharmaceuticals), `消费` (consumer goods), `能源` (energy), or `制造` (manufacturing).
- `transaction_date`: Transaction date.
- `transaction_type`: Transaction type: `买入` (buy) or `卖出` (sell).
- `quantity`: Number of shares traded.
- `price_per_share`: Price per share, in yuan.
- `commission_fee`: Commission fee, in yuan.
- `investor_id`: Investor ID.
- `investor_type`: Investor type: `个人` (individual) or `机构` (institutional).
- `market_cap`: Market capitalization category: `大盘股` (large cap), `中盘股` (mid cap), or `小盘股` (small cap).

Use the original Chinese values when filtering or comparing these text columns.

## Your task

The investment director wants to compare trading activity across sectors. Write a SQL query that:

1. Calculates each sector's total traded value: the sum of quantity × price per share.
2. Counts the transactions in each sector.
3. Calculates each sector's average price per share.
4. Calculates the percentage of transactions that are buys (`买入`), out of all buy and sell transactions in each sector.
5. Calculates the percentage of transactions made by institutional investors (`机构`) in each sector.
6. Calculates each sector's average commission fee.
7. Finds the stock with the highest total traded value in each sector.
8. Calculates each sector's price volatility for this exercise: (highest price − lowest price) / average price × 100.
9. Sorts by total traded value from highest to lowest.

Return these columns in order:

- Sector (`sector`).
- Total traded value (`total_amount`), rounded to 2 decimal places.
- Transaction count (`transaction_count`).
- Average share price (`avg_price`), rounded to 2 decimal places.
- Buy percentage (`buy_ratio`), rounded to 1 decimal place with a `%` sign.
- Institutional investor percentage (`institution_ratio`), rounded to 1 decimal place with a `%` sign.
- Average commission fee (`avg_commission`), rounded to 2 decimal places.
- Stock with the highest traded value (`top_stock`).
- Price volatility (`volatility`), rounded to 1 decimal place with a `%` sign.

## Example result

These figures illustrate the output format. `科技` means technology, and `企鹅控股` is the stock name Penguin Holdings:

```text
Sector: 科技, total value: 50000000.00 yuan, transactions: 120, average share price: 85.50 yuan, buy percentage: 55.0%, institutional percentage: 65.0%, average commission: 25.80 yuan, top stock: 企鹅控股, volatility: 15.2%
```

Discover which sectors attract the most trading activity! 📈
