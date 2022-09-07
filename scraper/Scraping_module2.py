import imp
import requests
import json
import asyncio
import time
import sqlite3
import util
from bs4 import BeautifulSoup
from urllib import response



jumia_url = 'https://deals.jumia.ug'
jiji_url =  'https://jiji.ug'

#fetch jumia car
async def fetch_jumia_car(car):
    car_dict = {} #store car details
    product_link = car.select_one('a.post-link.post-vip')["href"]
    product_request = requests.get(jumia_url + product_link)
    product_soup = BeautifulSoup(product_request.text, 'html.parser')
    price = product_soup.select_one('#priceSection > span:nth-child(3) > span:nth-child(1)')['content'] #thing in brackets is a selector
    brand = product_soup.select_one('.new-attr-style > h3:nth-child(1) > span:nth-child(1) > a:nth-child(1)') 
    model = product_soup.select_one('.new-attr-style > h3:nth-child(2) > span:nth-child(1)')
    transmission = product_soup.select_one('.new-attr-style > h3:nth-child(3) > span:nth-child(1)')
    fuel  = product_soup.select_one('.new-attr-style > h3:nth-child(4) > span:nth-child(1)')
    year = product_soup.select_one('.new-attr-style > h3:nth-child(5) > span:nth-child(1)')
    mileage = product_soup.select_one('.new-attr-style > h3:nth-child(6) > span:nth-child(1)')

    car_dict['price'] = price
    car_dict['brand'] = brand.text if brand != None else '' #classes accessed via the dot
    car_dict['model'] = model.text if model != None else ''
    car_dict['transmission'] = transmission.text if transmission != None else ''
    car_dict['fuel'] = fuel.text if fuel != None else ''
    car_dict['year'] = year.text if year != None else ''
    car_dict['mileage'] = mileage.text if mileage != None else ''
    
    return car_dict

#Fetch cars in a category
async def get_jumia_cars():
    carsList = []
    counter = 1
    while True:
        try:
            r = requests.get(jumia_url +'/cars?page='+ str(counter))
            soup = BeautifulSoup(r.text, 'html.parser')
            cars = soup.select('article.post-holder.product-click')
            results = await asyncio.gather(*map(fetch_jumia_car,cars)) #run loop cocurrent to fetch jumia cars
            carsList += results
            print(carsList)
            counter += 1
        except requests.exceptions.ConnectionError:
            print("Connection Error")
            break
        except requests.exceptions.TooManyRedirects:
            print("Too Many Redirects")
            break

    return carsList

#fetch car from jiji
async def fetch_jiji_car(car):
    car_page = requests.get(jiji_url + '/api_web/v1/item/'+ car['guid'])
    r_car = car_page.json()
    brand, model,transmission, fuel, year, mileage = '','','','','',''
    car_dict = {}
    car_dict['price'] = r_car['advert']['price']['value']
    for attr in r_car['advert']['attrs']:
        value = attr['value']
        if attr['name'] == 'Make':
            car_dict['make'] = value
        elif attr['name'] == 'Model':
            car_dict['model'] = value
        elif attr['name'] == 'Transmission':
            car_dict['transmission'] = value
        elif attr['name'] == 'Fuel':
            car_dict['fuel'] = value
        elif attr['name'] == 'Year of Manufacture':
            car_dict['year'] = value
        elif attr['name'] == 'Mileage':
            car_dict['mileage'] = value
    
    return car_dict

async def get_jiji_cars():
    counter = 1
    car_list = []
    while True: 
        try:
            r = requests.get(jiji_url +'/api_web/v1/listing?slug=cars&webp=false&page='+ str(counter)) 
            cars = r.json()['adverts_list']['adverts']
            results = await asyncio.gather(*map(fetch_jiji_car,cars))
            car_list += results
            print(car_list)
            counter += 1
        except json.decoder.JSONDecodeError:
            print('JSONDecodeError:')

        except requests.exceptions.ConnectionError:
            print("Connection Error")
            break
        except requests.exceptions.TooManyRedirects:
            print("Too Many Redirects")
            break
    
    return car_list


async def main():
   cars = await asyncio.gather(get_jumia_cars(),
    get_jiji_cars())

asyncio.run(
    main()
)