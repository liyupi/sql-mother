import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "hospital_appointment_analysis",
  title: "医院挂号分析",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from hospital_appointments",
  answer:
    "SELECT \n" +
    "    department,\n" +
    "    SUM(registration_fee) AS total_fee,\n" +
    "    COUNT(*) AS total_visits,\n" +
    "    ROUND(AVG(patient_age), 1) AS avg_age,\n" +
    "    ROUND(AVG(is_emergency) * 100, 1) || '%' AS emergency_ratio,\n" +
    "    (\n" +
    "        SELECT appointment_time \n" +
    "        FROM hospital_appointments h2 \n" +
    "        WHERE h2.department = hospital_appointments.department \n" +
    "        GROUP BY appointment_time \n" +
    "        ORDER BY COUNT(*) DESC \n" +
    "        LIMIT 1\n" +
    "    ) AS popular_time,\n" +
    "    ROUND(AVG(CASE WHEN patient_gender = 'M' THEN 100.0 ELSE 0 END), 1) || '%:' ||\n" +
    "    ROUND(AVG(CASE WHEN patient_gender = 'F' THEN 100.0 ELSE 0 END), 1) || '%' AS gender_ratio\n" +
    "FROM \n" +
    "    hospital_appointments\n" +
    "GROUP BY \n" +
    "    department\n" +
    "ORDER BY \n" +
    "    total_fee DESC;",
  hint: "使用GROUP BY分组，子查询找出热门时段，CASE WHEN计算男女比例",
  type: "custom",
} as LevelType;
