from flask import Flask
from .api.sensors import bp as sensors
from .api.health_check import bp as health_check
from .api.locations import bp as locations
from .api.auth import bp as auth
from .db.db import init_db
from flask_cors import CORS

def create_app() -> Flask:
    app = Flask(__name__)
    CORS(app)

    with app.app_context():

        init_db()

    app.register_blueprint(health_check, url_prefix="/api")
    app.register_blueprint(auth, url_prefix="/api/auth")
    app.register_blueprint(sensors, url_prefix="/api/sensors")
    app.register_blueprint(locations, url_prefix="/api/locations")

    return app