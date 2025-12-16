# import sqlite3
# from pathlib import Path

# USERS_DB = Path("backend/app/db/users.db")

# MEAS_DB = Path("backend/app/db/measurement.sqlite")

# def main():
#     conn = sqlite3.connect(USERS_DB)
#     cur = conn.cursor()

#     cur.execute("ATTACH DATABASE ? AS meas", (str(MEAS_DB),))

#     tables = cur.execute(
#         """
#         SELECT name, sql
#         FROM meas.sqlite_master
#         WHERE type = 'table'
#           AND name NOT LIKE 'sqlite_%';
#         """
#     ).fetchall()

#     for name, create_sql in tables:
#         print(f"Обробляю таблицю: {name!r}")

#         exists = cur.execute(
#             """
#             SELECT 1
#             FROM sqlite_master
#             WHERE type = 'table' AND name = ?;
#             """,
#             (name,),
#         ).fetchone()

#         if not exists:
#             if create_sql:
#                 print(f"  Створюю таблицю {name!r} в users.db")
#                 cur.execute(create_sql)
#         else:
#             print(f"  Таблиця {name!r} вже існує в users.db, пропускаю CREATE TABLE")

#         try:
#             print(f"  Копіюю дані з meas.{name} у {name}")
#             cur.execute(f"INSERT INTO {name} SELECT * FROM meas.{name};")
#         except sqlite3.Error as e:
#             print(f"  ПОМИЛКА при копіюванні таблиці {name}: {e}")

#     conn.commit()

#     cur.execute("DETACH DATABASE meas")
#     conn.close()


# if __name__ == "__main__":
#     main()
