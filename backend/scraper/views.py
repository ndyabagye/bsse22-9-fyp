import requests
import json
import asyncio
import time
import sqlite3
from bs4 import BeautifulSoup
from urllib import response
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt # import


jumia_url = 'https://deals.jumia.ug'
jiji_url =  'https://jiji.ug'
beforward_url = 'https://beforward.jp'

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
    return mean

#get the standard deviation
def std(data):
    data = get_car_costs(data)
    var = variance(data)
    return var

def get_car_costs(carList): 
    return list(map(get_unit_cost, carList))

def get_unit_cost(car):
    return car['price']


async def fetch_jumia_car(car):
    car_dict = {} #store car details
    product_link = car.select_one('a.post-link.post-vip')["href"]
    product_request = requests.get(jumia_url + product_link)
    product_soup = BeautifulSoup(product_request.text, 'html.parser')
    price = product_soup.select_one('#priceSection > span:nth-child(3) > span:nth-child(1)')['content']
    brand = product_soup.select_one('.new-attr-style > h3:nth-child(1) > span:nth-child(1) > a:nth-child(1)')
    model = product_soup.select_one('.new-attr-style > h3:nth-child(2) > span:nth-child(1)')
    transmission = product_soup.select_one('.new-attr-style > h3:nth-child(3) > span:nth-child(1)')
    fuel  = product_soup.select_one('.new-attr-style > h3:nth-child(4) > span:nth-child(1)')
    year = product_soup.select_one('.new-attr-style > h3:nth-child(5) > span:nth-child(1)')
    mileage = product_soup.select_one('.new-attr-style > h3:nth-child(6) > span:nth-child(1)')

    car_dict['price'] = float(price)
    car_dict['brand'] = brand.text if brand != None else '' #classes accessed via the dot
    car_dict['model'] = model.text if model != None else ''
    car_dict['transmission'] = transmission.text if transmission != None else ''
    car_dict['fuel'] = fuel.text if fuel != None else ''
    car_dict['year'] = year.text if year != None else ''
    car_dict['mileage'] = mileage.text if mileage != None else ''

    return car_dict

#Fetch all cars from jumia page by page
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

#fetch jumia cars by make, model and years of manufacture
async def fetch_jumia_cars_by_make_model(make, model, frm_year, to_year):
    try:
        url = 'https://deals.jumia.ug/cars/' + get_slug(make)
        r = requests.get(url)
        soup = BeautifulSoup(r.text, 'html.parser')
        make_id = soup.select_one('option[data-slug="{}"]'.format(get_slug(make)))['value']
        model_id = 0
        models = soup.select_one('select[name="attributes[cars][model]"]').find_all('option')
        for name in models:
            slug = get_slug(name.text)
            if slug == get_slug(model):
                model_id = name['value']
                break

        cars_url = 'https://deals.jumia.ug/posts/search?attributes[cars][make]={}&attributes[cars][model]={}&attributes[cars][yearMin]={}&attributes[cars][yearMax]={}'.format(make_id, model_id, frm_year, to_year)
        r = requests.get(cars_url)
        soup = BeautifulSoup(r.text, 'html.parser')
        cars = soup.select('article.post-holder.product-click')
        results = await asyncio.gather(*map(fetch_jumia_car,cars)) #run loop cocurrent to fetch jumia cars

        return results

    except requests.exceptions.ConnectionError:
        print("Connection Error")
    except requests.exceptions.TooManyRedirects:
        print("Too Many Redirects")


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

#fetch specific car model based on year of manufacture  from jiji
async def get_jiji_cars_by_make_model(make, model, frm_year, to_year):
    try:
        url = 'https://jiji.ug/api_web/v1/listing?slug=cars&filter_attr_1_make=' +make.capitalize()+ '&filter_attr_2_model='+ model.capitalize()+ '&filter_attr_119_year_of_manufacture__min=' +frm_year+ '&filter_attr_119_year_of_manufacture__max='+to_year+ '&webp=true'
        r = requests.get(url)
        cars = r.json()['adverts_list']['adverts']
        results = await asyncio.gather(*map(fetch_jiji_car,cars))
        return results
    except json.decoder.JSONDecodeError:
        print('JSONDecodeError:')

    except requests.exceptions.ConnectionError:
        print("Connection Error")
    except requests.exceptions.TooManyRedirects:
        print("Too Many Redirects")

#fetch all jiji cars mpage by page
async def get_jiji_cars():
    counter = 1
    car_list = []
    while True:
        try:
            r = requests.get(jiji_url +'/api_web/v1/listing?slug=cars&webp=false&page='+ str(counter))
            cars = r.json()['adverts_list']['adverts']
            results = await asyncio.gather(*map(fetch_jiji_car,cars))
            car_list += results
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


async def get_beforward_cars(make, model, frm_year, to_year):
    #get make id
    make_id = get_beforward_car_make(make)
    #fetch the car model id
    model_id = fetch_beforward_model(make_id, model)
    url = 'https://www.beforward.jp/stocklist/make='+ str(make_id)+'/model='+str(model_id)+'/mfg_year_from='+ frm_year +'/mfg_year_to='+to_year
    r = requests.get(url)
    soup = BeautifulSoup(r.text, 'html.parser')
    cars = soup.select('tr.stocklist-row')
    car_list = []

    #coonvert USD to UGX
    usd_to_ugx = 3700

    for car in cars:
        try:
            car_dict = {}
            car_dict['price'] = int(car.select_one('p.total-price > span:nth-child(2)').text.replace('$','').replace(',','')) * usd_to_ugx
            car_dict['make'] = make
            car_dict['model'] = model
            car_dict['year'] = car.select_one('td.year > p.val').text.split('/')[0].replace(" ",'').replace('\n','')
            car_dict['mileage'] = car.select_one('td.mileage > p.val').text.replace(" ",'').replace('\n','').replace('km','').replace(',','')
            car_dict['transmission'] = car.select_one('td.trans > p.val').text.replace(" ",'').replace('\n','').replace('CVT','Manual').replace('AT','Automatic')
            car_list.append(car_dict)
        except:
            pass
    return car_list

#scrape beforward car makes
def get_beforward_car_make(make_name):
    r = requests.get('https://www.beforward.jp')
    soup = BeautifulSoup(r.text, 'html.parser')
    makes = soup.select_one('select[name="make"]').find_all('option')
    for make in makes:
        raw  = make.text
        if raw == 'Select':
            continue
        #remove everything after last space
        name = raw[:raw.find('\xa0')]
        slug = get_slug(name)

        #compare slug with make
        if slug == make_name:
            return make['value']
        #models = self.fetch_beforward_models(make)
    return ""

#fetch beforward model given make_id
def fetch_beforward_model(make_id, model):
    r = requests.get('https://www.beforward.jp/ajax/maker_to_model_upper/'+ make_id)
    models = r.json()['model_list']
    results = list(map(return_model, models))

    #get model id which matches model
    for result in results:
        if result['model'] == get_slug(model):
            return result['id']

    return 0

def return_model(car):
    model = get_slug(car['name'])
    return {'id': car['id'], 'model': model}

@csrf_exempt
def scrape(request):
    if request.method == 'POST':
        car_vals = request.POST
        async def main(make,car_model,year):
            try:
                values = []
                beforward_model_cars = await get_beforward_cars(make,car_model,year,year) #pass in the mo, make and year
                beforward_number = len(beforward_model_cars)
                beforward_price = int(std(beforward_model_cars))
                car = {
                    'source':'Beforward',
                    'price': beforward_price,
                    'number_scraped':beforward_number,
                }
                values.append(car)

                jiji_model_cars = await get_jiji_cars_by_make_model(make,car_model,year,year)
                jiji_number = len(jiji_model_cars)
                jiji_price = int(std(jiji_model_cars))
                car = {
                    'source':'Jiji',
                    'price': jiji_price,
                    'number_scraped':jiji_number,
                }
                values.append(car)
                return values
            except:
                values = [{
                    'source':'No data',
                    'price': 0,
                    'number_scraped':0,
                }]
                return values
            

        price = {  "data": asyncio.run(
            main(car_vals['make'],car_vals['car_model'],car_vals['year'])
        )}
        
    return JsonResponse(price)
    