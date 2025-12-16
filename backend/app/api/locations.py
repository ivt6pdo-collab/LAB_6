from flask import Blueprint, jsonify
from app.db.locations import location_all
bp = Blueprint("locations", __name__)

@bp.get("/all")
def health_check():
  locations = location_all()
  return  jsonify({f"data": locations}), 200