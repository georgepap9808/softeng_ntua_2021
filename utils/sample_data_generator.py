import sqlite3
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

#show_tables("../backend/app.db")



def create_admin_nikos(db_file):
    conn = create_connection(db_file)

    try:
        conn.execute("INSERT INTO user(username,is_admin,password_hash,first_name,last_name,country,city,street,number,zip_code) VALUES(?,?,?,?,?,?,?,?,?,?)",
        ("markakisn",1,generate_password_hash("yay123"),"nikolaos","markakis","greece","athens","kp",6,"12343"))
        conn.commit()
    except Exception as e: 
        print(e)
        
    
#create_admin_nikos("../backend/app.db")

        
    
    