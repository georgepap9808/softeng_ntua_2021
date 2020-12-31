from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow

from werkzeug.security import generate_password_hash, check_password_hash


db = SQLAlchemy()
migrate = Migrate()
ma = Marshmallow()

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(64), nullable=False, unique=True)

    is_admin = db.Column(db.Boolean, default=False, nullable=False)
    #is_owner = db.Column(db.Boolean, default=False, nullable=False) #na thimitho na kanw migrate

    password_hash = db.Column(db.String(256), nullable=False)
    token = db.Column(db.String(32), nullable=True, default=None, unique=True)

    
    first_name = db.Column(db.String(64), nullable=False )
    last_name = db.Column(db.String(64), nullable=False )
    country = db.Column(db.String(64), nullable=False )
    city = db.Column(db.String(64), nullable=False)
    street = db.Column(db.String(64), nullable=False )
    number = db.Column(db.Integer, nullable=False )
    zip_code =  db.Column(db.String(5), nullable=False )

    @property
    def password(self):
        raise AttributeError('Password not readable')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)