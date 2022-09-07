#create repository class to handle all postgressql queries

import psycopg2
from psycopg2 import Error

class Repository:
    
    #init method to create connection to database traderdb
    def __init__(self, db):
        self.db = db
        self.conn = psycopg2.connect(dbname=db, user='admin', password='password', host='localhost', port='5432')
        self.cur = self.conn.cursor()
        self.create_table()

    #method to create table
    def create_table(self):
        #create make, model tables
        self.cur.execute("CREATE TABLE IF NOT EXISTS make (id SERIAL PRIMARY KEY, make VARCHAR(255))")
        self.cur.execute("CREATE TABLE IF NOT EXISTS model (id SERIAL PRIMARY KEY, model VARCHAR(255), make_id INTEGER REFERENCES make(id))")
        #create make_ids table from jumia, jiji, beforward
        self.cur.execute("CREATE TABLE IF NOT EXISTS make_ids (id SERIAL PRIMARY KEY, make_id INTEGER REFERENCES make(id), jumia_id INTEGER, jiji_id INTEGER, beforward_id INTEGER)")
        #create model_ids table from jumia, jiji, beforward
        self.cur.execute("CREATE TABLE IF NOT EXISTS model_ids (id SERIAL PRIMARY KEY, model_id INTEGER REFERENCES model(id), jumia_id INTEGER, jiji_id INTEGER, beforward_id INTEGER)")

        #create table cars and car prices if they don't exist
        self.cur.execute("CREATE TABLE IF NOT EXISTS cars (id SERIAL PRIMARY KEY, make_id INTEGER REFERENCES make(id), model_id INTEGER REFERENCES model(id), transmission VARCHAR(255), fuel VARCHAR(255), year VARCHAR(255), mileage VARCHAR(255))")
        self.cur.execute("CREATE TABLE IF NOT EXISTS car_prices (id SERIAL PRIMARY KEY, car_id INTEGER, price INTEGER, date DATE, FOREIGN KEY (car_id) REFERENCES cars(id))")
        self.conn.commit()
    
    #method to insert car into cars table
    def insert_car(self, car):
        self.cur.execute("INSERT INTO cars (make, model, transmission, fuel, year, mileage) VALUES (%s, %s, %s, %s, %s, %s)", (car['make'], car['model'], car['transmission'], car['fuel'], car['year'], car['mileage']))
        self.conn.commit()
        return self.cur.fetchone()
    
    #method to insert car price into car_prices table
    def insert_car_price(self, car_id, price, date):
        self.cur.execute("INSERT INTO car_prices (car_id, price, date) VALUES (%s, %s, %s)", (car_id, price, date))
        self.conn.commit()
        return self.cur.fetchone()
    
    #method to get car id from cars table
    def get_car_id(self, car):
        self.cur.execute("SELECT id FROM cars WHERE make = %s AND model = %s AND transmission = %s AND fuel = %s AND year = %s AND mileage = %s", (car['make'], car['model'], car['transmission'], car['fuel'], car['year'], car['mileage']))
        self.conn.commit()
        return self.cur.fetchone()
    
    #method to get car price from car_prices table
    def get_car_price(self, car_id):
        self.cur.execute("SELECT price FROM car_prices WHERE car_id = %s", (car_id,))
        self.conn.commit()
        return self.cur.fetchone()
    
    #method to get car price date from car_prices table
    def get_car_price_date(self, car_id):
        self.cur.execute("SELECT date FROM car_prices WHERE car_id = %s", (car_id,))
        self.conn.commit()
        return self.cur.fetchone()
    
    #method to get all cars from cars table
    def get_all_cars(self):
        self.cur.execute("SELECT * FROM cars")
        self.conn.commit()
        return self.cur.fetchall()
    
    #method to get all car prices from car_prices table
    def get_all_car_prices(self):
        self.cur.execute("SELECT * FROM car_prices")
        self.conn.commit()
        return self.cur.fetchall()
    
    #insert or update make id into make_ids table
    def insert_make_id(self, make_id, jumia_id, jiji_id, beforward_id):
        self.cur.execute("SELECT * FROM make_ids WHERE make_id = %s", (make_id,))
        self.conn.commit()
        if self.cur.fetchone() is None:
            self.cur.execute("INSERT INTO make_ids (make_id, jumia_id, jiji_id, beforward_id) VALUES (%s, %s, %s, %s)", (make_id, jumia_id, jiji_id, beforward_id))
            self.conn.commit()
        else:
            self.cur.execute("UPDATE make_ids SET jumia_id = %s, jiji_id = %s, beforward_id = %s WHERE make_id = %s", (jumia_id, jiji_id, beforward_id, make_id))
            self.conn.commit()
    #insert or update model id into model_ids table
    def insert_model_id(self, model_id, jumia_id, jiji_id, beforward_id):
        self.cur.execute("SELECT * FROM model_ids WHERE model_id = %s", (model_id,))
        self.conn.commit()
        if self.cur.fetchone() is None:
            self.cur.execute("INSERT INTO model_ids (model_id, jumia_id, jiji_id, beforward_id) VALUES (%s, %s, %s, %s)", (model_id, jumia_id, jiji_id, beforward_id))
            self.conn.commit()
        else:
            self.cur.execute("UPDATE model_ids SET jumia_id = %s, jiji_id = %s, beforward_id = %s WHERE model_id = %s", (jumia_id, jiji_id, beforward_id, model_id))
            self.conn.commit()
    
    #get make id from make_ids table
    def get_make_id(self, make_id):
        self.cur.execute("SELECT * FROM make_ids WHERE make_id = %s", (make_id,))
        self.conn.commit()
        return self.cur.fetchone()
    
    #get model id from model_ids table
    def get_model_id(self, model_id):
        self.cur.execute("SELECT * FROM model_ids WHERE model_id = %s", (model_id,))
        self.conn.commit()
        return self.cur.fetchone()
    
    