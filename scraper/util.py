import re
import math


#get generate slug from text
def get_slug(text):
    slug = text.lower()
    slug = re.sub(r'[^\w\s]', '', slug)
    slug = re.sub(r'\s+', '-', slug)
    return slug

#get variance of data
def variance(data, ddof=0):
    n = len(data)
    mean = sum(data) / n
    return sum((x - mean) ** 2 for x in data) / (n - ddof)

#get the standard deviation
def std(data):
    data = get_car_costs(data)
    var = variance(data)
    std_dev = math.sqrt(var)
    return std_dev

def get_car_costs(carList): 
    return list(map(get_unit_cost, carList))

def get_unit_cost(car):
    return car['price']