import pandas as pd 
from faker import Faker
from faker_vehicle import VehicleProvider
from collections import defaultdict
from sqlalchemy import create_engine

fake = Faker()
fake_data = defaultdict(list)

for _ in range(1000):
    fake_data["car_make"].append( fake.vehicle_make() )
    fake_data["car_model"].append( fake.vehicle_model() )
    fake_data["car_price"].append( fake.vehicle_price() )