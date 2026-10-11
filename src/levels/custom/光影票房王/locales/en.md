# Box Office Champions

## The story

You are a data analyst at Starlight Cinemas. The Lunar New Year movie season has just ended, and the cinema chain's manager wants to know which films brought in the most revenue. With a pile of box office data and hopes of finding the next blockbuster, the manager asks you to reveal what audiences really enjoy.

## The data

The `movie_box_office` table records box office information for each movie:

- `movie_id`: Movie ID.
- `movie_name`: Movie title.
- `genre`: Genre: `动作` (action), `喜剧` (comedy), `科幻` (science fiction), `爱情` (romance), `动画` (animation), or `悬疑` (mystery).
- `director`: Director.
- `release_date`: Release date.
- `ticket_price`: Average ticket price, in yuan.
- `audience_count`: Number of admissions.
- `rating`: Rating on a scale from 1 to 10.
- `duration`: Running time, in minutes.
- `production_cost`: Production cost, in units of 10,000 yuan.

## Your task

The manager wants to compare performance across movie genres. Write a SQL query that:

1. Calculates total box office revenue for each genre: the sum of average ticket price × admissions.
2. Counts the movies in each genre.
3. Calculates the average rating for each genre.
4. Calculates the average admissions per movie for each genre.
5. Sorts by total box office revenue from highest to lowest.

Return these columns in order:

- Genre (`genre`).
- Total box office revenue (`total_revenue`).
- Movie count (`movie_count`).
- Average rating (`avg_rating`), rounded to 1 decimal place.
- Average admissions (`avg_audience`), rounded to a whole number.

## Example result

These figures illustrate some of the output fields:

```text
Genre: 动作, total box office revenue: 50000000 yuan, movies: 3, average rating: 8.2
```

Discover which movie genres audiences love most! 🎬
