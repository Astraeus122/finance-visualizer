# backend/app/__init__.py
from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)  # Allow cross-origin requests

    # Register Blueprints (Routes)
    from app.routes.upload import upload_bp
    app.register_blueprint(upload_bp, url_prefix="/api/upload")

    return app
