from bs4 import BeautifulSoup
import requests

import pandas as pd
webpage = requests.get('https://deals.jumia.ug/cars')

sp = BeautifulSoup(webpage.content, 'html.parser')

#print(sp.text)

title = sp.find_all('a', 'title')
sellprice = sp.find_all('span', 'price')


titleloop = [titles.text for titles in title]
sellpriceloop = [sell.text for sell in sellprice]
 
print(titleloop)
print(sellpriceloop)

data = {
  'Name': titleloop, 
  'Price': sellpriceloop
}

#df = pd.DataFrame (data, columns = [
#    'Name',
#    'Price'
#])