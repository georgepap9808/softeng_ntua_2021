import sqlite3
import names as n
import random as r
import numpy as np
import strgen
from string import ascii_uppercase
from random import choice
from random_username.generate import generate_username
from werkzeug.security import generate_password_hash, check_password_hash

def create_connection(db_file):
    """ create a database connection to the SQLite database
        specified by db_file
    :param db_file: database file
    :return: Connection object or None
    """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
    except Exception as e:
        print(e)

    return conn

def show_tables(db_file):
    conn = create_connection(db_file)
    res = conn.execute("select name from sqlite_master where type = 'table' and name not like 'sqlite_%' ")
    print(res.fetchall())

def show_user(db_file):
    conn = create_connection(db_file)
    res = conn.execute("SELECT * FROM user")
    print(res.fetchall())

def show_vehicles(db_file):
    conn = create_connection(db_file)
    res = conn.execute("SELECT * FROM vehicle")
    print(res.fetchall())

def show_stations(db_file):
    conn = create_connection(db_file)
    res = conn.execute("SELECT * FROM station")
    print(res.fetchall())

def show_providers(db_file):
    conn = create_connection(db_file)
    res = conn.execute("SELECT * FROM provider")
    print(res.fetchall())


#test

def create_admin_nikos(db_file):
    conn = create_connection(db_file)

    try:
        conn.execute("INSERT INTO user(username,is_admin,password_hash,first_name,last_name,country,city,street,number,zip_code) VALUES(?,?,?,?,?,?,?,?,?,?)",
        ("markakisn",1,generate_password_hash("yay123"),"nikolaos","markakis","greece","athens","kp",6,"12343"))
        conn.commit()
    except Exception as e: 
        print(e)




    
        

def create_user(db_file):
    conn = create_connection(db_file)

    username = generate_username()
    is_admin = 0
    randomString = strgen.StringGenerator("[\w\d]{10}").render()
    password = generate_password_hash(randomString)
    first_name = n.get_full_name().split()[0]
    last_name = n.get_full_name().split()[1]
    country = 'Greece'
    city = r.choice(['Glyfada', 'Pireus', 'Kallithea', 'Alimos', 'Kifissia', 'Menidi'])
    street= n.get_last_name() + ' Ave.'
    number = r.randint(1,300)
    zip_code = r.randint(12345,98745)

    try:
        conn.execute("INSERT INTO user(username,is_admin,password_hash,first_name,last_name,country,city,street,number,zip_code) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        (username[0], is_admin, password, first_name, last_name, country, city, street, number, zip_code))
        conn.commit()
    except Exception as e: 
        print(e)


def create_vehicle(db_file, user_id):
    conn = create_connection(db_file) 

    car = {'mercedes': ['gla', 'glc', 'e-class'], 'audi': ['q8', 'rs7', 'q3'], 'opel': ['astra', 'corsa', 'grandland'], 'ford': ['mustang', 'focus', 'fiesta'],}
    plate = '{}{}'
    plate = plate.format("".join([choice(ascii_uppercase) for _ in range(3)]), r.randint(1234,9876))
    manufacturer = r.choice(list(car.keys()))
    model = r.choice(car.get(manufacturer))

    
    try:
        conn.execute("INSERT INTO vehicle(user_id, registration_plate, manufacturer, model) VALUES(?, ?, ?, ?)",
        (user_id, plate, manufacturer, model))
        conn.commit()
    except Exception as e: 
        print(e)


def create_station(db_file):
    conn = create_connection(db_file) 

    country = 'Greece'
    city = r.choice(['Glyfada', 'Pireus', 'Kallithea', 'Alimos', 'Kifissia', 'Menidi'])
    street= n.get_last_name() + ' Ave.'
    number = r.randint(1,300)
    avg_rating = 0
    num_ratings = 0

    try:
        conn.execute("INSERT INTO station(country, city, street, number, avg_rating, num_ratings) VALUES(?, ?, ?, ?, ?, ?)",
        (country, city, street, number, avg_rating, num_ratings))
        conn.commit()
    except Exception as e: 
        print(e)


def create_provider(db_file):
    conn = create_connection(db_file) 

    providers = {'voltera': 0.0899, 'protergia': 0.0851, 'dei': 0.0925, 'watt&volt': 0.0945}
    name = r.choice(list(providers.keys()))
    kwh_cost = providers.get(name)

    try:
        conn.execute("INSERT INTO provider(name, kwh_cost) VALUES(?, ?)",
        (name, kwh_cost))
        conn.commit()
    except Exception as e: 
        print(e)


def create_session(db_file):
    pass
  

file = "/mnt/c/Users/georg/Desktop/git/softeng_ntua_2021/backend/app.db"
create_connection(file)
# print("Db users are: ", end="")
# show_user(file)
# create_vehicle(file, 3)
# create_admin_nikos(file)    
#create_user(file)
# show_vehicles(file)
# create_station(file)
# show_stations(file)
# create_provider(file)
# show_providers(file)