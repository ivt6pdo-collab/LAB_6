from app.db.db import get_db
def location_all():
  database = get_db()
  cur = database.execute("SELECT * FROM 'locations'")
  res = cur.fetchall()
  return [dict(row) for row in res]