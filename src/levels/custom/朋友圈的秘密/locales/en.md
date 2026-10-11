# Secrets of the Social Feed

## The story

You are a data analyst for a social platform. User activity surged during the Lunar New Year holiday, and the product manager wants to understand how people interact. She asks you to uncover patterns in the social data to help improve the product.

## The data

The `weibo_posts` table records the content users publish:

- `post_id`: Post ID.
- `user_id`: User ID.
- `username`: Username.
- `content_type`: Content type: `原创` (original post), `转发` (repost), or `评论` (comment).
- `topic_category`: Topic category: `科技` (technology), `娱乐` (entertainment), `体育` (sports), `时事` (current affairs), `生活` (lifestyle), or `教育` (education).
- `publish_time`: Publication time.
- `likes_count`: Number of likes.
- `comments_count`: Number of comments.
- `reposts_count`: Number of reposts.
- `followers_count`: The author's follower count.
- `has_image`: Whether the post contains an image: 1 for yes, 0 for no.
- `has_video`: Whether the post contains a video: 1 for yes, 0 for no.

## Your task

The product manager wants to compare how well different kinds of content engage users. Write a SQL query that:

1. Calculates total interactions for each topic category: likes + comments + reposts, summed across posts.
2. Calculates each category's average interaction rate using this exercise's formula: total interactions / the sum of `followers_count` across posts × 1000.
3. Calculates the percentage of posts in each category that contain an image.
4. Calculates the percentage of posts in each category that contain a video.
5. Calculates each category's average number of likes per post.
6. Includes only categories with at least 3 posts.
7. Sorts by total interactions from highest to lowest.

Return these columns in order:

- Topic category (`topic_category`).
- Total interactions (`total_interactions`).
- Average interaction rate (`avg_interaction_rate`), rounded to 3 decimal places.
- Percentage with images (`image_ratio`), rounded to 1 decimal place with a `%` sign.
- Percentage with videos (`video_ratio`), rounded to 1 decimal place with a `%` sign.
- Average likes (`avg_likes`), rounded to a whole number.
- Post count (`post_count`).

## Hints

- Use `SUM` and `AVG` for aggregate calculations.
- Use `CASE WHEN` to calculate percentages.
- Use `HAVING` to filter groups.
- Pay attention to numeric types so division keeps its fractional part.

Find out which topics get users talking! 📱
