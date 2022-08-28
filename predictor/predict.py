from datetime import datetime 
from matplotlib import pyplot as plt
import pandas as pd
from sklearn.metrics import r2_score
from catboost import CatBoostRegressor
model = CatBoostRegressor()      # parameters not required.
model.load_model('car_model')


#sample price prediction
testCars = pd.DataFrame.from_records([ 
	{'mileage': 90000, 'make': 'Volkswagen', 'model': 'Gold', 
		'fuel': 'Gasoline', 'gear': 'Manual', 'offerType': 'Used', 
		'price': 12990, 'hp': 125, 'year': 2015}, 
	{'mileage': 230000, 'make': 'Opel', 'model': 'Zafira Tourer', 
		'fuel': 'CNG', 'gear': 'Manual', 'offerType': 'Used', 
		'price': 5200, 'hp': 150, 'year': 2012}, 
	{'mileage': 5, 'make': 'Mazda', 'model': '3', 'hp': 122, 
		'gear': 'Manual', 'offerType': 'Employee\'s car', 
		'fuel': 'Gasoline', 'price': 20900, 'year': 2020} 
]) 

cars = pd.read_csv('columns.csv')

testCars['age'] = datetime.now().year - testCars['year'] 
testCars = testCars.drop(columns='year') 
testCars = testCars.drop(columns='model') 

print(type(testCars))
#spreading out the categorical data and then dropping the columns
offerTypeDummies = pd.get_dummies(testCars.offerType) 
testCars = testCars.join(offerTypeDummies) 
testCars = testCars.drop(columns='offerType') 

gearDummies = pd.get_dummies(testCars.gear) 
testCars = testCars.join(gearDummies) 
testCars = testCars.drop(columns='gear')

fuelDummies = pd.get_dummies(testCars.fuel) 
testCars = testCars.join(fuelDummies) 
testCars = testCars.drop(columns='fuel')  
testCars = testCars.drop(columns ='price')

makeDummies = pd.get_dummies(testCars.make) 
testCars = testCars.join(makeDummies, lsuffix='_left', rsuffix='_right') 
testCars = testCars.drop(columns='make') 


cars = cars.loc[:, ~cars.columns.str.contains('^Unnamed')]

print(cars.columns)
fitModel = pd.DataFrame(columns=cars.columns) 
fitModel = fitModel.append(testCars, ignore_index=True) 
fitModel = fitModel.fillna(0) 

print("")
print(fitModel)
print("")


preds = model.predict(fitModel) 
y_true = [12990,5200,20900]
print(r2_score(y_true, preds))

print(preds) # 	"""

# add error handling