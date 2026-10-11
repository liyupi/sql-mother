# Angels in White

## The story

You are a data analyst at Renxin Hospital. Its appointment system has collected a large amount of data, and the hospital director wants to understand patterns in patient visits. Which departments are busiest, and which time slots attract the most patients? Your analysis will help the hospital plan staff schedules and allocate resources.

## The data

The `hospital_appointments` table records patient appointments:

- `appointment_id`: Appointment ID.
- `patient_id`: Patient ID.
- `patient_name`: Patient name.
- `patient_age`: Patient's age.
- `patient_gender`: Patient's gender: `M` for male or `F` for female.
- `department`: Department: `内科` (internal medicine), `外科` (surgery), `儿科` (pediatrics), `妇产科` (obstetrics and gynecology), `骨科` (orthopedics), or `眼科` (ophthalmology).
- `doctor_name`: Doctor's name.
- `appointment_date`: Appointment date.
- `appointment_time`: Appointment time slot: `上午` (morning) or `下午` (afternoon).
- `registration_fee`: Registration fee, in yuan.
- `is_emergency`: Whether the appointment is an emergency: 1 for yes, 0 for no.
- `visit_type`: Visit type: `初诊` (first visit) or `复诊` (follow-up visit).

## Your task

The director wants to compare patient visits across departments. Write a SQL query that:

1. Calculates each department's total registration fee revenue.
2. Counts the appointments in each department.
3. Calculates each department's average patient age.
4. Calculates the percentage of emergency appointments in each department.
5. Finds each department's most popular time slot by appointment count: `上午` or `下午`.
6. Calculates each department's percentages of male and female patients, based on appointment records.
7. Sorts by total registration fee revenue from highest to lowest.

Return these columns in order:

- Department (`department`).
- Total registration fees (`total_fee`).
- Appointment count (`total_visits`).
- Average age (`avg_age`), rounded to 1 decimal place.
- Emergency appointment percentage (`emergency_ratio`), rounded to 1 decimal place with a `%` sign.
- Most popular time slot (`popular_time`), using the stored Chinese value.
- Gender ratio (`gender_ratio`), formatted as male percentage:female percentage, for example `60.0%:40.0%`.

## Example result

These figures illustrate the output format:

```text
Department: 内科, total registration fees: 1200 yuan, appointments: 40, average age: 45.5 years, emergency percentage: 15.0%, popular time: 上午, gender ratio: 55.0%:45.0%
```

Discover which departments see the most patients! 🏥
