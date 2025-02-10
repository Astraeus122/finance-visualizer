# backend/app/config.py
import os

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "mysecretkey")
    UPLOAD_FOLDER = os.getenv("UPLOAD_FOLDER", "./uploads")

# Use configuration in the Flask app
def configure_app(app):
    app.config.from_object(Config)
