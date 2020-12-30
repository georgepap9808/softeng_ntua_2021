from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow


db = SQLAlchemy()
migrate = Migrate()

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(64), nullable=False, unique=True)
    is_admin = db.Column(db.Boolean, default=False, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    token = db.Column(db.String(32), nullable=True, default=None, unique=True)
