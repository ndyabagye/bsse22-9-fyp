import requests
import ast
from bs4 import BeautifulSoup


jumia_url = 'https://deals.jumia.ug'
jiji_url =  'https://jiji.ug/api_web/v1/listing?slug=cars&webp=false&page=2&lsmid=1659674217261'

#Fetch cars in a category
def get_jumia_cars():
    carsList = []
    counter = 1
    while True:
        try:
            r = requests.get(jumia_url +'/cars?page='+ str(counter))
            soup = BeautifulSoup(r.text, 'html.parser')
            cars = soup.select('article.post-holder.product-click')
            for car in cars:
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

                car_dict['price'] = price
                car_dict['brand'] = brand.text if brand != None else ''
                car_dict['model'] = model.text if model != None else ''
                car_dict['transmission'] = transmission.text if transmission != None else ''
                car_dict['fuel'] = fuel.text if fuel != None else ''
                car_dict['year'] = year.text if year != None else ''
                car_dict['mileage'] = mileage.text if mileage != None else ''
                
                print(car_dict['brand'] +' ' + car_dict['model'])
                carsList.append(car_dict) #add car to car list
    
            counter += 1
        except requests.exceptions.ConnectionError:
            print("Connection Error")
            break
        except requests.exceptions.TooManyRedirects:
            print("Too Many Redirects")
            break

    return carsList
def get_jiji_cars():
    pass

if __name__ == '__main__':
    cars = get_jumia_cars()
    print(cars)