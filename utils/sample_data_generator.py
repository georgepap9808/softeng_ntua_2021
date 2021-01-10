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
    randomString = "yay1234"#strgen.StringGenerator("[\w\d]{10}").render()
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


def create_all_providers(db_file):
    conn = create_connection(db_file) 

    providers = {'voltera': 0.0899, 'protergia': 0.0851, 'dei': 0.0925, 'watt&volt': 0.0945}
    #name = r.choice(list(providers.keys()))
    #kwh_cost = providers.get(name)
    records = []
    for key in providers.keys():
        records.append((key,providers[key]))

    print("provider records:")
    print(records)

    try:
        conn.executemany("INSERT INTO provider(name, kwh_cost) VALUES(?, ?)",records)
        conn.commit()
    except Exception as e: 
        print(e)

'''
def create_session(db_file):
    conn = create_connection(db_file) 
#----------------------------------------------------------------------------
    user = conn.cursor()
    user.execute('select * from user')
    uid = user.fetchall()
    user_list = []

    for u in list(uid):
        user_list.append(u[0])

    user_id = r.choice(user_list)
    # print('user id is: ', end='') # just for testing the user_id
    # print(user_id)
#----------------------------------------------------------------------------
    vehicle = conn.cursor()
    vehicle.execute("select * from vehicle where user_id = '%s'" % user_id)
    plate = vehicle.fetchall()

    # for v in list(plate):
    #     print(v)
#----------------------------------------------------------------------------
    station = conn.cursor()
    station.execute('select * from station')
    sid = station.fetchall()
    station_list = []

    for s in list(sid):
        station_list.append(s[0])   

    station_id = r.choice(station_list)
    # print('station id is: ', end='') # just for testing the user_id
    # print(station_id)
#----------------------------------------------------------------------------
    provider = conn.cursor()
    provider.execute('select name, kwh_cost from provider')
    pid = provider.fetchall()
    provider_list = []
    kwh_list = []

    for p in enumerate(pid):
        # provider_list.append(p)
        # kwh_list.append(k)
        print(p)

#----------------------------------------------------------------------------
"""
    user_id FK
    station_id FK
    registration_plate FK
    starting_time
    finishing_time
    kwh_cost FK
    provider_id FK
    """

    providers = {'voltera': 0.0899, 'protergia': 0.0851, 'dei': 0.0925, 'watt&volt': 0.0945}
    name = r.choice(list(providers.keys()))
    kwh_cost = providers.get(name)

    # try:
    #     conn.execute("INSERT INTO session(user_id, station_id, registration_plate, starting_time, finishing_time, kwh_cost, provider_id) VALUES(?, ?, ?, ?, ?, ?, ?)",
    #     (user_id, station_id, registration_plate, starting_time, finishing_time, kwh_cost, provider_id))
    #     conn.commit()
    # except Exception as e: 
    #     print(e)
  '''

file = "backend/app.db"
conn = create_connection(file)



num_users = 10 
"""
create_admin_nikos(file)    

for i in range(num_users):
    create_user(file)

show_user(file)

for i in range(num_users+1):
    create_vehicle(file, i+1)
    create_vehicle(file,i+1)

show_vehicles(file)

num_stations = 10
for i in range(num_stations):
    create_station(file)

show_stations(file)

create_all_providers(file)
show_providers(file)

"""

#create_session(file)
#show_sessions(file)


def create_session_2(db_file):
    conn = create_connection(db_file)

#----get user----------------------------------------
    user = conn.cursor()
    user.execute('select * from user')
    uid = user.fetchall()
    user_list = []

    for u in list(uid):
        user_list.append(u[0])

    user_id = r.choice(user_list)
#----get vehicle-------------------------------------
    vehicle = conn.cursor()
    vehicle.execute("select * from vehicle where user_id = '%s'" % user_id)
    plate = vehicle.fetchall()[0][1]
    #print(plate)

#----get station-------------------------------------
    station = conn.cursor()
    station.execute('select * from station')
    sid = station.fetchall()
    station_list = []

    for s in list(sid):
        station_list.append(s[0])   

    station_id = r.choice(station_list)
#----get provider------------------------------------

    provider = conn.cursor()
    provider.execute('select name, kwh_cost from provider')

    pid = r.randint(1,4)
    #print(pid)
    kwh_cost = provider.fetchall()[pid-1][1]
    #print(pid,kwh_cost)

#----create starting and finishing time--------------
    s=r.randint(1,20)
    s_hour = str(s).zfill(2)
    f = s+r.randint(1,3)
    f_hour = str(f).zfill(2)
    starting_time = '20'+str(r.randint(19,20))+'-'+str(r.randint(1,12)).zfill(2)+'-'+str(r.randint(1,29)).zfill(2)+' '+s_hour+':'+str(r.randint(0,59)).zfill(2)
    finishing_time = starting_time[:11]+f_hour+starting_time[13:]
    #print(starting_time)
    #print(finishing_time)
    
#----insert session----------------------------------
    try:
        #conn.execute("INSERT INTO session(user_id, station_id, registration_plate, starting_time, finishing_time, kwh_cost, provider_id) VALUES(?, ?, ?, ?, ?, ?, ?)",
        #(user_id, station_id,plate, starting_time, finishing_time, kwh_cost, pid))
        print(str(user_id)+","+str(station_id)+","+str(plate)+","+str(starting_time)+","+str(finishing_time)+","+str(kwh_cost)+","+str(pid))
        #conn.commit()
    except Exception as e: 
        print(e)    


for i in range(20):
    create_session_2(file)

