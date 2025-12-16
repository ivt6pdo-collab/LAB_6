from flask import Blueprint, jsonify, request
from app.db.sensors import sensors_all, get_all_measurements_by_sensor, get_measurement_by_sensor_from_to, sensors_by_location
from datetime import datetime
bp = Blueprint("sensors", __name__)

DATETIME_FORMAT = "%Y-%m-%d %H:%M:%S"

@bp.get("/all")
def all_sensors():
  sensors = sensors_all()
  return jsonify({f"data": sensors}), 200

@bp.get("/all/location/<int:location_id>")
def all_sensors_by_location(location_id):
    sensors = sensors_by_location(location_id)
    return jsonify({f"data": sensors}), 200


@bp.get("/sensor")
def measurement_by_sensor_from_to():
  sensor_id = request.args.get("sensor_id", type=int)
  time_from = request.args.get("time_from" )
  time_to = request.args.get("time_to")
  sensor_info = get_measurement_by_sensor_from_to(sensor_id, time_from, time_to)
  return jsonify({f"data": sensor_info}), 200



@bp.get("/sensor/<int:sensor_id>")
def measurements_by_sensor(sensor_id):
  measurements_sensor = get_all_measurements_by_sensor(sensor_id)
  if not measurements_sensor:
          return jsonify({"error": "No measurements for this sensor"}), 404

  return jsonify({f"data": measurements_sensor}), 200

