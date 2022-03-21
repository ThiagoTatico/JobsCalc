const Database = require('config')

Database()

Database.exec(`CREATE TABLE profile (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  avatar TEXT,
  monthly_budget INT,
  days_per_week INT,
  hours_per_day INT,
  vacation_per_year INT,
  value_hour INT
)`)

Database.exec(`CREATE TABLE jobs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  daily_hours INT,
  total_hours INT,
  created_at DATETIME
)`)

Database.close()