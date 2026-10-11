# The Wave Chicken

On a mysterious island lives the legendary Wave Chicken: a mighty bird whose feathers shimmer with an otherworldly light. The islanders believe it is an incarnation of the sea god, able to command the waves and make the ocean calm or stormy. To find out whether the legend is true, they begin observing the bird and recording their findings.

The `chicken_observation` table stores their observations. It has the following columns:

- `observation_id`: The ID that uniquely identifies each observation.
- `observer_name`: The observer's name.
- `observation_date`: The date of the observation.
- `observation_location`: The location of the observation.
- `wave_intensity`: The observed wave intensity, recorded as an integer. A larger number means rougher waves.

Write a SQL query to find observations whose location contains `大浪淘鸡` (the Wave Chicken's Chinese name) and whose wave intensity is greater than 5. Return the observer's name (`observer_name`), observation date (`observation_date`), and wave intensity (`wave_intensity`), in that order.

The location values are stored in Chinese. Use the exact text `大浪淘鸡` in your search pattern.
