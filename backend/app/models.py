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
    #email = db.Column(db.String(64), nullable=False, unique=True)
    username = db.Column(db.String(64), nullable=False, unique=True)

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

    #Relationships
    vehicles = db.relationship('Vehicle',backref='owner',lazy = 'dynamic')
    cards = db.relationship('Card',backref='owner',lazy = 'dynamic')

    @property
    def password(self):
        raise AttributeError('Password not readable')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)


class Vehicle(db.Model):
    __tablename__ = 'vehicle'

    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    registration_plate = db.Column(db.String(10),primary_key = True , nullable = False,unique = True, autoincrement = False)
    manufacturer = db.Column(db.String(64),nullable = False)
    model = db.Column(db.String(64),nullable = False)


class Card(db.Model): 
    __tablename__ = 'card'

    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    card_number = db.Column(db.String(16),primary_key = True)
    card_expiration = db.Column(db.String(4),nullable = False)
    cvc_code = db.Column(db.Integer,nullable = False)

class Station(db.Model):
    __tablename__ = 'station'

    id = db.Column(db.Integer,primary_key = True,autoincrement = True)
    country = db.Column(db.String(64), nullable = False)
    city = db.Column(db.String(64), nullable = False)
    street = db.Column(db.String(64), nullable = False)
    number = db.Column(db.Integer, nullable = False)

    avg_rating = db.Column(db.Float, nullable = True)
    num_ratings = db.Column(db.Integer, nullable = False, default = 0)
    
    #add session relationship !!!!!!!


class Provider(db.Model):
    __tablename__ = 'provider'

    id = db.Column(db.Integer,primary_key = True,autoincrement = True)
    name = db.Column(db.String(64), nullable = False)
    kwh_cost = db.Column(db.Float, nullable = False)


class Session(db.Model):
    __tablename__ = 'session'

    id = db.Column(db.Integer,primary_key = True, autoincrement = True)
    user_id = db.Column(db.Integer,db.ForeignKey("user.id"))
    station_id = db.Column(db.Integer,db.ForeignKey("station.id") )
    registration_plate = db.Column(db.String(10),db.ForeignKey("vehicle.registration_plate"))
    starting_time = db.Column(db.DateTime, nullable = False)
    finishing_time = db.Column(db.DateTime, nullable = False)
    kwh_cost = db.Column(db.Float, nullable = False)
    provider_id = db.Column(db.Integer,db.ForeignKey("provider.id"))


