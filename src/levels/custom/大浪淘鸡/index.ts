import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "waveChicken",
  title: "大浪淘鸡",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from chicken_observation",
  answer:
    "SELECT \n" +
    "    observer_name,\n" +
    "    observation_date,\n" +
    "    wave_intensity\n" +
    "FROM \n" +
    "    chicken_observation\n" +
    "WHERE \n" +
    "    observation_location LIKE '%大浪淘鸡%' and wave_intensity > 5;",
  hint: "like 模糊查询",
  type: "custom",
} as LevelType;
