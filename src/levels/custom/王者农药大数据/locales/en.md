# Battle Arena Analytics

## The story

You are a data analyst at Penguin Games. Its mobile battle arena game is a worldwide hit and generates huge amounts of match data every day. The operations director wants to understand players' habits and spending behavior. Can you find insights that improve both the game experience and revenue?

## The data

The `game_matches` table records players' matches:

- `match_id`: Match ID.
- `player_id`: Player ID.
- `player_name`: Player nickname.
- `hero_name`: The hero played.
- `hero_role`: Hero role: `战士` (fighter), `法师` (mage), `射手` (marksman), `辅助` (support), `坦克` (tank), or `刺客` (assassin).
- `game_result`: Match result: `胜利` (victory) or `失败` (defeat).
- `kills`: Number of kills.
- `deaths`: Number of deaths.
- `assists`: Number of assists.
- `game_duration`: Match duration, in minutes.
- `match_date`: Match date.

Use the original Chinese values when filtering or comparing these text columns.

## Your task

The operations team wants to compare hero performance. Write a SQL query that:

1. Calculates the win rate for each hero role: wins / total matches × 100.
2. Calculates the average KDA for each role. First calculate `(kills + assists) / deaths` for each match, using 1 as the denominator when `deaths` is 0, then average those values.
3. Counts the total matches for each role.
4. Includes only roles with at least 5 matches.
5. Sorts by win rate from highest to lowest.
6. Returns the hero role (`hero_role`), win rate (`win_rate`, rounded to 1 decimal place with a `%` sign), average KDA (`avg_kda`, rounded to 2 decimal places), and total matches (`total_matches`), in that order.

## Hints

- Use `CASE WHEN` to count victories. The stored value for a victory is `胜利`.
- Use `HAVING` to filter aggregate results.
- Use the string concatenation operator `||` to add the `%` sign.
- Handle division by zero.

Find out which hero role dominates the arena! ⚔️
