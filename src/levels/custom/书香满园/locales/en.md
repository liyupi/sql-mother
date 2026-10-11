# A World of Books

## The story

You are a data analyst at Ocean of Knowledge Bookstore. After the Lunar New Year holiday, the store manager wants to review last month's sales. Some books are flying off the shelves while others barely sell. She asks you to find patterns in the sales data to help plan next month's stock purchases.

## The data

The `book_sales` table contains details of each sale:

- `sale_id`: Sale ID.
- `book_id`: Book ID.
- `book_title`: Book title.
- `author`: Author.
- `category`: Book category: `文学` (literature), `科技` (science and technology), `教育` (education), `生活` (lifestyle), `历史` (history), or `经济` (economics).
- `publisher`: Publisher.
- `price`: Unit price, in yuan.
- `quantity`: Number of copies sold.
- `sale_date`: Sale date.
- `customer_age`: Customer's age.
- `customer_gender`: Customer's gender: `M` for male or `F` for female.
- `discount_rate`: Price multiplier after the discount. For example, 0.8 means the customer pays 80% of the original price, a 20% discount.

## Your task

The manager wants to compare sales across book categories. Write a SQL query that:

1. Calculates total revenue for each category: the sum of unit price × quantity × discount rate.
2. Calculates the total number of copies sold in each category.
3. Calculates the average discount rate for each category.
4. Finds the book with the highest total revenue in each category.
5. Calculates the average customer age for each category.
6. Sorts by total revenue from highest to lowest.

Return these columns in order:

- Book category (`category`).
- Total revenue (`total_revenue`), rounded to 2 decimal places.
- Total copies sold (`total_books`).
- Average discount rate (`avg_discount`), rounded to 3 decimal places.
- Bestselling book by revenue (`top_book`).
- Average customer age (`avg_age`), rounded to 1 decimal place.

## Example result

These figures illustrate the output format. `文学` means literature, and `百年孤独` is the stored title for *One Hundred Years of Solitude*:

```text
Category: 文学, total revenue: 25680.50 yuan, copies sold: 180, average discount rate: 0.850, top book: 百年孤独, average age: 32.5 years
```

Find out which kinds of books readers love most! 📚
