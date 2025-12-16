from app.db.db import get_db
def sensors_all():
  database = get_db()
  cur = database.execute("SELECT * FROM 'sensors'")
  res = cur.fetchall()
  return [dict(row) for row in res]

def get_all_measurements_by_sensor(sensor_id):
  database = get_db()
  cur = database.execute("SELECT * FROM 'readings' WHERE readings.sensor_id = ?", (sensor_id,))
  res = cur.fetchall()
  return [dict(row) for row in res]

def get_measurement_by_sensor_from_to(sensor_id, time_from, time_to):
  database = get_db()
  cur = database.execute("""SELECT * FROM readings
                         WHERE sensor_id = ?
                          AND ts BETWEEN ? AND ?
                         ORDER BY ts ASC""",(sensor_id, time_from, time_to,)
)
  res = cur.fetchall()
  return [dict(row) for row in res]

def sensors_by_location(location_id):
  database = get_db()
  cur = database.execute("""SELECT *
                        FROM 'sensors'
                        WHERE location_id = ?
                        ORDER BY code ASC""",(location_id,)
)
  res = cur.fetchall()
  return [dict(row) for row in res]
